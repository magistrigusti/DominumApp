import { Router, Request, Response } from 'express'
import { UserModel } from '../models/UserModel'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
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
        prestige: '0',
      })
    }

    return res.status(200).json(user)
  } catch (err) {
    console.error('[user.ts] Ошибка:', err)
    return res.status(500).json({ error: 'Server error' })
  }
})

export const userRoutes = router // ☑️ Только именованный экспорт
