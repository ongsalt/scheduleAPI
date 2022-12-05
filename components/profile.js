import React from 'react'
import { post } from '../lib/post'

import style from '../styles/styles.module.css'

async function handleLogout() {
  await post('/api/auth/logout')
  location.reload()
}

function Profile({ user }) {
    // console.log(user)
  return (
    <div className={style.flex}> 
      {user?.name ?? "Not logged in"} 
      <button className={style.outline} onClick={handleLogout}> Logout </button>
    </div>
  )
}

export default Profile