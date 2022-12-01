import PocketBase, { LocalAuthStore } from 'pocketbase';
import { useState, useEffect } from 'react'
import { initPocketBase } from '../../lib/auth';
import { post } from '../../lib/post';

import scopedStyle from './login.module.css'
import style from '../../styles/styles.module.css'
import Layout from '../../components/layout';

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

function Login({ user }) {
  console.log(user)
  return (
    <Layout title="Login" hideTitle>
        <form action="/api/auth/login" method="post" onSubmit={loginHandler}>
          <div className={style.container}>
            <h1 className=''>
              Who are you?
            </h1>

            <input type="text" placeholder='Username' name='username' id='username' />
            <input type="password" placeholder='Password' name='password' id='password' />
            <button type='submit' className={style.left}> Login </button>

          </div>
        </form>
    </Layout >
  )
}

export default Login