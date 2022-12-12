import { initPocketBase } from '../../lib/auth';
import { useState } from 'react';
import { post } from '../../lib/post';

import scopedStyle from './login.module.css'
import style from '../../styles/styles.module.css'
import Layout from '../../components/layout';
import { useRouter } from 'next/router';

export async function getServerSideProps({ req, res }) {

  const pb = await initPocketBase(req, res);
  const user = { ...pb.authStore.model }

  if (user.isValid) {
    return {
      redirect: {
        target: '/config',
        permanent: false
      }
    }
  }
  return {
    props: {
      user
    }
  };
}



function Login({ user }) {
  const router = useRouter()
  const [error, setError] = useState(null);
  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await post('/api/auth/login', {
      username: e.target.username.value,
      password: e.target.password.value
    })
    if (res.success) {
      router.push('/config')
    } else {
      setError(res.message)
    }
  }
  return (
    <Layout title="Login" hideTitle user={user} center >
        <form action="/api/auth/login" method="post" onSubmit={loginHandler}>
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