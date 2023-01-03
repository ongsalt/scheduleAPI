import Link from 'next/link';
import Layout from '../components/layout';
import { initPocketBase } from '../lib/auth'

export async function getServerSideProps({ req, res }) {
  const pb = await initPocketBase(req, res);
  const user = { ...pb.authStore.model }

  return {
    props: {
      user
    }
  };
}

function Config({ user }) {
  return (
    <Layout title="Home" user={user} center>
      <p>
        API Tester
      </p>
      <Link href="/api/current/m5-5">
        <button>
          M.5/5 - Current
        </button>
      </Link>
    </Layout>
  )
}

export default Config