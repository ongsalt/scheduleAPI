import Link from 'next/link';
import Icon from '../../components/icon';
import Layout from '../../components/layout';
import { initPocketBase } from '../../lib/auth'
import style from '../../styles/utils.module.css';

export async function getServerSideProps({ req, res }) {
  const pb = await initPocketBase(req, res);
  const user = { ...pb.authStore.model }

  return {
    props: {
      user
    }
  };
}

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

function Config({ user }) {
  return (
    <Layout title="Config" user={user}>
      <div className={style.shortcutList}>
        {shortcuts.map(s => (<Shortcut key={s.title} {...s}/>))}
      </div>
    </Layout>
  )
}

export default Config