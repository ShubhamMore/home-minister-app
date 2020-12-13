const User = require('../../models/user.model');
const newUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    const token = await user.generateAuthToken();
    const data = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      token,
      expiresIn: 1800,
    };
    res.status(201).send(data);
  } catch (e) {
    let err = 'Something bad happend' + e;
    if (e.code == 11000) {
      err = 'User alredy register, Please login';
    }
    res.status(400).send(err);
  }
};

module.exports = newUser;
