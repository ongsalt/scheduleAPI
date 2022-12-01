import PocketBase, { LocalAuthStore } from 'pocketbase';
import { useState, useEffect } from 'react'
import { initPocketBase } from '../../lib/auth';
import { post } from '../../lib/post';

export async function getServerSideProps({ req, res }) {
  const pb = await initPocketBase(req, res);
  const user = { ...pb.authStore.model }
  return {
    props: {
      user 
    }
  };
}

async function loginHandler(e) {
  e.preventDefault();
  console.log(e.target.username.value);
  await post('/api/auth/login', {
    username: e.target.username.value,
    password: e.target.password.value
  })
  location.reload() // should get to somewhere
}

async function logoutHandler(e) {
  await fetch('/api/auth/logout')
  location.reload()
}

function Auth({ user }) {
  console.log(user)
  const [state, setstate] = useState('');
  return (
    <div>
      <h2>
        Auth
      </h2>
      <div>
        {user.name ?? "Not login"}
      </div>
      <form action="/api/auth/login" method="post" onSubmit={loginHandler}>
        <input type="text" name="username" id="username" />
        <input type="password" name="password" id="password" />
        <button type='submit'> bruh </button>
      </form>
      <button onClick={logoutHandler}> logout </button>
    </div>
  )
}

export default Auth