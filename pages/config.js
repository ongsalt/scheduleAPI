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
    <Layout title="Config" user={user}>
      <div>
        <div>
          
        </div>
       </div>
    </Layout>
  )
}

export default Config