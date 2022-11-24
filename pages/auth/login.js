import { NextAuthStore } from '../../../lib/auth'
import PocketBase from 'pocketbase';

async function auth(username, password) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  pb.authStore = new NextAuthStore(req, res);
  const authData = await pb.collection('users').authWithPassword(username, password);

  if (pb.authStore.isValid) {

  }

  
}

async function Auth() {
  return (
    <div>Auth</div>
  )
}

export default Auth