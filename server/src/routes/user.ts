import express from "express";
import { User} from "../models/UserModel";

const userRoutes = express.Router();

userRoutes.post('/user', async (req, res) => {
  const { address } = req.body;

  if (!address) return res.status(400).send('Address is required');

  let user = await User.findOne({ address });

  if (!user) {
    user = new User({ address });
    await user.save();
  }

  res.json(user);
});

export default userRoutes;