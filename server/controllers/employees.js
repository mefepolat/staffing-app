const User = require("../models/user");

const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/gm;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;

module.exports.getEmployees = async (req, res, next) => {
  const employees = await User.find({});
  if (!employees) {
    return res.json({ message: "There is an issue with the database." });
  } else {
    return res.json({ employees });
  }
};

module.exports.updateEmployee = async (req, res, next) => {
  const { id, phoneNumber, email } = req.body;
  const employee = await User.findById(id);
  const mail = emailRegex.test(email);
  const number = phoneRegex.test(phoneNumber);
  if (!employee) {
    return res.json({ message: "No such user found." });
  }

  if (!mail) {
    return res.json({ message: "Invalid email" });
  }
  if (!number) {
    return res.json({ message: "Invalid phone number!" });
  }

  employee.phoneNumber = phoneNumber;
  employee.email = email;
  employee.save();
  return res.json({message: 'User updated successfully!'});
};
