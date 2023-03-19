const User = require("../models/user");

module.exports.addAvailability = async (req, res, next) => {
  const { user, shift, date } = req.body;
  if (!user) {
    return res.json({ message: "You need to be logged in." });
  }
  if (
    !shift ||
    (shift.toLowerCase() !== "d" && shift !== "e" && shift !== "n")
  ) {
    console.log(shift);
    return res.json({ message: "Invalid shift entry!" });
  }

  const userAvailability = await User.findOne({ _id: user._id });
  if (!userAvailability) {
    return res.json({ message: "User not found!" });
  }

  userAvailability.availabilities.push({
    date: date,
    availability: shift,
  });
  await userAvailability.save();
};

module.exports.getAvailability = async (req, res, next) => {
  const { user } = req.body;
  if (!user) {
    return res.json({ message: "You need to be logged in." });
  }
  const userAvailabilities = await User.findById(user._id);

  return res.json(userAvailabilities.availabilities);
};

module.exports.updateAvailability = async (req, res, next) => {
  const { user, shift, eventId } = req.body;
  if (!user) {
    return res.json({ message: "You need to be logged in." });
  }
  if (
    !shift ||
    (shift.toLowerCase() !== "d" && shift !== "e" && shift !== "n")
  ) {
    return res.json({ message: "Invalid shift entry!" });
  }
  User.findOneAndUpdate(
    {
      _id: user._id,
      availabilities: {
        $elemMatch: {
          _id: eventId,
        },
      },
    },
    {
      $set: {
        "availabilities.$.availability": shift.toUpperCase(),
      },
    },
    { new: true },
    function (err, updatedUser) {
      if (err) {
        console.log("error var agam");
        return res.json({ message: "Error updating availability." });
      } else {
        console.log("Availability updated successfully!");
        return res.json({ message: "Availability updated successfully!" });
      }
    }
  );
};
