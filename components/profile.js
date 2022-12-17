import React from 'react'
import { useAuth } from '../lib/clientContext'

import style from '../styles/styles.module.css'

function Profile({ }) {
  const { user, logout, router } = useAuth()
  
  return (
    <div className={style.flex}> 
      {user?.name ?? "Not logged in"} 
      <button className={style.outline} onClick={() => {
        if (user?.name) {
          logout()
        } else {
          router.push('/auth/login')
        }
      }}> { user?.name ? 'Log out' : 'Log in'} </button>
    </div>
  )
}

export default Profile