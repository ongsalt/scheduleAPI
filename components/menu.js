// import React from 'react'

import Link from 'next/link'

import style from './menu.module.css'


function Badge({ link, title, highlight }) {
  return (
    <Link href={link} className={highlight ? style.highlight : null}>
      {title}
    </Link>
  )
}

function Menu({ pageTitle }) {
  const links = [{ link: '/home', title: 'Home' }, { link: '/config', title: 'Config' }, { link: '/disclaimer', title: 'Disclaimer' }]
  const current = links.find(link => link.title === pageTitle);

  if (current) {
    current.highlight = true;
  }


  return (
    <div>

      <div className={style.menu}>
        {links.map(link => <Badge key={link.title} {...link} />)}
      </div>
    </div>
  )
}

export default Menu