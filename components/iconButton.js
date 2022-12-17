import style from './iconButton.module.css'
import Icon from './icon'

function IconButton({ action, id, size=24, color='inherit' }) {
  return (
    <div onClick={action} className={style.wrapper}>
        <Icon id={id} size={size} color={color}/>
    </div>
  )
}

export default IconButton