import Icon from '../../components/icon';
import Layout from '../../components/layout';
import ConfigLayout from '../../components/configLayout';

function User({ }) {
  return (
    <Layout title="User">
      <ConfigLayout>
        <div>
          <h1> User </h1>
          Not implement yet
          <button
            onClick={(event) => {
              window.location.href = 'http://127.0.0.1:8090/_/#/collections?collectionId=_pb_users_auth_'
            }}
            style={{ marginTop: '12px', display: 'block' }}
          >
            Configure manually
          </button>
        </div>
      </ConfigLayout>
    </Layout>
  )
}

export default User