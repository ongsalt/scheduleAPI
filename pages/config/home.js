import { NextAuthStore } from '../../lib/auth'
import PocketBase from 'pocketbase';

async function getData() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  pb.authStore = new NextAuthStore(req, res);

  // fetch example records...
  const result = await pb.collection('example').getList(1, 30);

  return {
    props: {
      // ...
    },
  }

}

async function Config() {
  return (
    <div>Config</div>
  )
}

export default Config