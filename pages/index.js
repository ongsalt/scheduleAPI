import Link from 'next/link';
import styles from './styles.module.css';

function Page() {
  return (
    <div className={styles.centerBox}>
      <h2>
        API test
      </h2>
      <Link href="/api/current/m5-5"> Current </Link>
      <Link href="/auth"> Auth </Link>
      <Link href="/config"> Config </Link>
    </div>
  )
}

export default Page