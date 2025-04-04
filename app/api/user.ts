import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../server/lib/dbConnect";
import { UserModel } from "../../server/models/UserModel";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  let user = await UserModel.findOne({ address });

  if (!user) {
    user = await UserModel.create({
      address,
      avatar: "/icons/user-icon.png",
      prestige: "0",
      // ❗ Все остальные поля получат default из схемы
    });
  }

  res.status(200).json(user); // ✅ возвращаем всего пользователя, а не только ресурсы
}
