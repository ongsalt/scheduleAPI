import Icon from '../../components/icon';
import Layout from '../../components/layout';
import ConfigLayout from '../../components/configLayout';
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


function Config({ user }) {
  return (
    <Layout title="User" user={user} center>
      bruh
    </Layout>
  )
}

export default Config