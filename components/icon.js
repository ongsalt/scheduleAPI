import style from "./icon.module.css"

function Icon({ id, size, color }) {
    return (
        <span className={style.icon} style={{ fontSize: size+'px', color: color || 'inherit' }}> 
            {id}
        </span>
    );
}

export default Icon