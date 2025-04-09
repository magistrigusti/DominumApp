import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({error: 'Method Not Allowed'});
  }

  const {address, name, avatar} = req.body;

  if (!address) {
    return res.status(400).json({error: 'Address is required'});
  }

  try {
    await dbConnect();

    const user = await UserModel.findOneAndUpdate(
      { address },
      { ...(name && { name }), ...(avatar && { avatar })},
      { new: true}
    );

    if (!user) {
      return res.status(404).json({ error: "User not found"});
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('[api/user/update] Ошибка:', err);
    
    return res.status(500).json({ error: "Server error", details: err});
  }
}