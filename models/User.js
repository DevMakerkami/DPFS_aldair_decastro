const users = [];

class User {
  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static create({ name, email, password }) {
    const newUser = { id: users.length + 1, name, email, password };
    users.push(newUser);
    return newUser;
  }
}

module.exports = User;