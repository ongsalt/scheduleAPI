import Link from 'next/link';
import styles from './styles.module.css';

function Page() {
  return (
    <div className={styles.centerBox}>
      <h2>
        API test
      </h2>
      <Link href="/api/current/m5-5"> Current </Link>
    </div>
  )
}

export default Page