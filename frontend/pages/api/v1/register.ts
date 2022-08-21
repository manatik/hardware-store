import type { NextApiRequest, NextApiResponse } from 'next'
import authService from 'services/auth/auth.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { data, headers } = await authService.external.register(req.body)

      if (headers['set-cookie']) res.setHeader('Set-Cookie', headers['set-cookie'])

      res.status(200).json(data)
    }
  } catch (e: any) {
    if (e.code) {
      res.status(e.code).json(e)
    } else {
      res.status(400).json(e)
    }
  }
}
