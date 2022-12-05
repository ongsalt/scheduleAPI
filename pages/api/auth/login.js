import { login } from "../../../lib/auth"

export default async function handler(req, res) {
  const body = req.body

  console.log('body: ', body)

  if (!body.username || !body.password) {
    return res.status(400).json({ data: 'First or last name not found' })
  }
  
  if (await login(req, res, body.username, body.password)) {
    res.redirect('/config');
  } else {
    res.redirect('/auth/login?error=1')
  }
}

