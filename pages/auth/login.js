import { useState } from 'react';
import { post } from '../../lib/post';

import style from '../../styles/styles.module.css'
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { initPocketBase, useAuth } from '../../lib/clientContext';

function Login({ }) {
  const { login, user } = useAuth()
  const router = useRouter()
  const [error, setError] = useState(null);

  const loginHandler2 = async (e) => {
    e.preventDefault()
    await login(e.target.username.value, e.target.password.value)
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/config')
    }
  }

  
  return (
    <Layout title="Login" hideTitle center >
        <form action="/api/auth/login" method="post" onSubmit={loginHandler2}>
          <div className={style.container}>
            <h1 className=''>
              Who are you?
            </h1>

            <input type="text" placeholder='Username' name='username' id='username' />
            <input type="password" placeholder='Password' name='password' id='password' />
            <button type='submit' className={style.left}> Login </button>
            <p className={style.error}> {error} </p>

          </div>
        </form>
    </Layout >
  )
}

export default Login