import React from 'react'
import { useAuth } from '../lib/clientContext'

import style from './header.module.css'
import Menu from './menu'
import Profile from './profile'

function Header({ pageTitle, disableBlur = false }) {
  return (
    <div className={style.headerContainer}>
      { disableBlur ? null :
        <div className={style.gradientBlur}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      }
      <div className={style.header}>
        <div>
          <h2>
            Schedule API
          </h2>
        </div>
        <Menu pageTitle={pageTitle} />
        <Profile/>
      </div>
    </div>
  )
}

export default Header