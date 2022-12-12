import Link from 'next/link'
import Icon from './icon'
import style from './sidebar.module.css'
import { useRouter } from 'next/router'

function Shortcut({ icon, title, link, highlight }) {

    return (
        <Link className={`${style.child} ${highlight ? style.highlight : null}`} href={link}>
            <Icon id={icon} size={24} />
            {title}
        </Link>
    )
}

function Sidebar({ }) {
    const shortcuts = [
        { icon: 'event_note', title: 'Schedule', link: '/config/schedule' },
        { icon: 'database', title: 'Subject pool', link: '/config/pool' },
        { icon: 'folder_shared', title: 'Shared subject', link: '/config/shared' },
        { icon: 'person', title: 'User management', link: '/config/user' },
        { icon: 'schedule', title: 'Timing', link: '/config/timing' },
    ]
    const router = useRouter();
    const path = router.pathname.split('/').pop();
    console.log(path)
    const current = shortcuts.find(s => s.link.includes(path));
    if (current) {
        current.highlight = true;
    }
    return (
        <div className={style.sidebar}>
            {shortcuts.map(each => (<Shortcut key={each.title} {...each} />))}
        </div>
    )
}

export default Sidebar