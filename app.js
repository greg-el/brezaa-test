const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const UserRepository = require("./repositories/user_repository");
const ReviewRepository = require("./repositories/review_repository");

const userRepository = new UserRepository();
const reviewRepository = new ReviewRepository();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", (req, res) => {
  let users = userRepository.getUsers();
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  let user = userRepository.selectUserById(req.params.id);
  res.json(user);
});

app.post("/users/signup", (req, res) => {
  let query = userRepository.createUser(req.body);
  if (query.success == false) {
    res
      .status(404)
      .json(
        "Error creating user, you are missing one of the following: " +
          query.data
      );
  } else {
    res.json(query.data);
  }
});

app.post("/users/login", (req, res) => {
  let user = userRepository.validateLogin(req.body);
  if (user === false) {
    res.status(401).json("Incorrect username or password.");
  } else {
    let cookie = req.cookies.session;
    if (cookie === undefined) {
      let randomNumber = Math.random().toString();
      randomNumber = randomNumber.substring(2, randomNumber.length);
      res.cookie("session", randomNumber, { httpOnly: true });
    }
    res.json("Signed in successfully.");
  }
});

app.post("/review/", (req, res) => {
  let id = req.query.sellerId;
  if (id === undefined) {
    res.status(404).json("Malformed request.");
    return;
  }
  let cookie = req.cookies.session;
  if (cookie === undefined) {
    res.status(401).json("You need to sign in before submitting a review.");
    return;
  }
  if (!userRepository.sellerExists(id)) {
    res.status(401).json("Seller does not exist.");
    return;
  }
  let reviewData = reviewRepository.createReview(req.body, id);
  res.json(reviewData);
});

app.post("/getAllSellers/", (req, res) => {
  let sellers = userRepository.getAllSellers();
  res.json(sellers);
});

app.post("/getSellerReviews/", (req, res) => {
  let id = req.query.sellerId;
  if (id === undefined) {
    res.status(404).status("Malformed request.");
  } else {
    let data = reviewRepository.getReviewsBySellerId(id);
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
