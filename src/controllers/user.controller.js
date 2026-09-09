import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role createdAt").sort({
      createdAt: -1,
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
