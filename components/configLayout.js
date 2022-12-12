import style from './configLayout.module.css'
import Sidebar from './sidebar'

function ConfigLayout({ children }) {
  return (
    <div className={style.grid}>
      <Sidebar />
      {children}
    </div>
  )
}

export default ConfigLayout