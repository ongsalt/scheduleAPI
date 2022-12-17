import Link from 'next/link';
import Icon from '../../components/icon';
import Layout from '../../components/layout';
import { initPocketBase } from '../../lib/auth'
import { useAuth } from '../../lib/clientContext';
import style from '../../styles/utils.module.css';

const shortcuts = [
  { icon: 'event_note', title: 'Schedule', link: '/config/schedule' },
  { icon: 'database', title: 'Subject pool', link: '/config/pool' },
  { icon: 'folder_shared', title: 'Shared subject', link: '/config/shared' },
  { icon: 'person', title: 'User management', link: '/config/user' },
  { icon: 'schedule', title: 'Timing', link: '/config/timing' },
]

function Shortcut({ icon, title, link }) {
  return (
    <Link className={style.shortcut} href={link}>
      <Icon id={icon} size={84} />
      <p>
        {title}
      </p>
    </Link>
  )
}

function Config({  }) {
  const { pb } = useAuth()
  return (
    <Layout title="Config" >
      <div className={style.shortcutList}>
        {shortcuts.map(s => (<Shortcut key={s.title} {...s}/>))}
      </div>
    </Layout>
  )
}

export default Config