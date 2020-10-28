// -------------------------------------------------
// In real life this would connect to a SQL database
// -------------------------------------------------

class UserRepository {
  constructor() {
    this.id = 0;
    this.users = [];
  }

  getId() {
    return this.id++;
  }

  createUser(data) {
    let id = this.getId();
    let input = {
      id: id,
      email: data.email,
      password: data.password,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      typeOfUser: data.typeOfUser,
      profession: data.profession,
      longitude: data.longitude,
      latitude: data.latitude,
    };
    let missingInputs = [];
    for (const [key, value] of Object.entries(input)) {
      if (key !== "profession" && value === undefined) {
        missingInputs.push(key);
      }
    }
    if (missingInputs.length !== 0) {
      return { success: false, data: missingInputs };
    }
    this.users.push(input);
    return { success: true, data: { ...input } };
  }

  selectUserById(id) {
    for (let user of this.users) {
      if (user.id == id) {
        return user;
      }
    }
  }

  getUsers() {
    return this.users;
  }

  validateLogin(body) {
    for (let user of this.users) {
      if (user.email == body.email && user.password == body.password) {
        return true;
      }
    }
    return false;
  }

  sellerExists(id) {
    let out = [];
    for (let user of this.users) {
      if (user.id == id && user.profession !== null) {
        return true;
      }
    }
    return false;
  }

  getAllSellers() {
    let out = [];
    for (let user of this.users) {
      console.log(user.profession);
      if (user.profession !== undefined) {
        out.push(user);
      }
    }
    return out;
  }

  haversineDistance(coords1, coords2) {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }

    var lon1 = coords1[0];
    var lat1 = coords1[1];

    var lon2 = coords2[0];
    var lat2 = coords2[1];

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
  }

  coordToNum(c) {
    let out = [];
    for (let num of c) {
      out.push(parseFloat(num.replace(",", ".")));
    }
    return out;
  }

  getNearestSeller(lat, long, maxDistance) {
    let closest = {};
    let maxDistNum = parseFloat(maxDistance);

    for (let user of this.users) {
      if (closest.latitude === undefined) {
        console.log(
          this.haversineDistance(
            this.coordToNum([lat, long]),
            this.coordToNum([user.latitude, user.longitude])
          ) < maxDistNum
        );
        if (
          this.haversineDistance(
            this.coordToNum([lat, long]),
            this.coordToNum([user.latitude, user.longitude])
          ) < maxDistNum
        ) {
          closest = user;
        }
      } else if (
        this.haversineDistance(
          this.coordToNum([closest.latitude, closest.longitude]),
          this.coordToNum([user.latitude, user.longitude])
        ) >
        this.haversineDistance(
          this.coordToNum([lat, long]),
          this.coordToNum([user.latitude, user.longitude])
        )
      ) {
        closest = user;
      }
    }
    return closest;
  }
}

module.exports = UserRepository;
