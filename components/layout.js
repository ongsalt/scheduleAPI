import style from '../styles/utils.module.css'
import Footer from './footer'
import Header from './header'

function Layout({ children, title, hideTitle }) {
  return (
    <>
      <Header pageTitle={title} />
      <div className={style.main}>
        <div className={style.content}>
          {hideTitle ? null :
            <h1> {title} </h1>
          }
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout