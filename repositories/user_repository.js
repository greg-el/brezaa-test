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
      if (user.profession !== null) {
        out.push(user);
      }
    }
    return out;
  }

  getClosestSeller() {}
}

module.exports = UserRepository;
