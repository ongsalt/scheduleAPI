import { initPocketBase } from "../../../lib/auth"

export default async function handler(req, res) {
  const body = req.body

  console.log('body: ', body)

  const pb = await initPocketBase(req, res);
  pb.authStore.clear()
  res.status(200).json({ data: `${body.username} ${body.password}` })
}

