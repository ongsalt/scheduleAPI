import React from 'react'

import style from './header.module.css'
import Menu from './menu'
import Profile from './profile'

function Header({ pageTitle }) {
  return (
    <div className={style.header}>
      <h2>
        Header
      </h2>
      <Menu pageTitle={pageTitle}/>
      <Profile/>
    </div>
  )
}

export default Header