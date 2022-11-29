import { NextAuthStore, initPocketBase } from '../../lib/auth'
import PocketBase from 'pocketbase';

async function getServerSideProps({ req, res }) {
    const pb = initPocketBase(req, res);

    pb.authStore = new NextAuthStore(req, res);
  
    if (pb.authStore.isValid) {
      return {
        props: {
          authState: pb.authStore.isValid
        }
      }
    }
  
  }

function Config({ authState }) {
  return (
    <div>
      Config <br/>
      {authState ? "a" : "b"}
    </div>
  )
}

export default Config