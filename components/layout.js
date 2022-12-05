import Head from 'next/head'
import style from '../styles/utils.module.css'
import Footer from './footer'
import Header from './header'

function Layout({ children, title, hideTitle, user, center }) {
  return (
    <>
      <Head>
        <title> {title} </title>
      </Head>
      <Header pageTitle={title} user={user} disableBlur />
      { center ?
        <div className={style.main}>
          <div className={style.content}>
            {hideTitle ? null :
              <h1> {title} </h1>
            }
            {children}
          </div>
        </div>
        :
        children
      }

      {/* <Footer /> */}
    </>
  )
}

export default Layout