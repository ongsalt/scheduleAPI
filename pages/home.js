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
    <Layout title="Home" user={user}>
      <div>
        Bruh
      </div>
    </Layout>
  )
}

export default Config