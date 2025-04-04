// server/src/routes/user.ts

import express from 'express'
import { UserModel } from '../models/UserModel'

const router = express.Router()

// POST /api/user — создать пользователя или вернуть, если уже есть
router.post('/', async (req, res) => {
  const { address } = req.body

  if (!address) {
    return res.status(400).json({ error: 'Address is required' })
  }

  try {
    let user = await UserModel.findOne({ address })

    if (!user) {
      user = await UserModel.create({
        address,
        avatar: '/icons/user-icon.png',
        prestige: '0'
        // Остальные поля — по умолчанию в схеме
      })
    }

    res.status(200).json(user)
  } catch (err) {
    console.error('[user.ts] Ошибка:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
