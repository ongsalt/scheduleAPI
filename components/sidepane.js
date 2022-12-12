import { useMemo, useRef, useState } from 'react';
import style from './sidepane.module.css'
import globalStyle from '../styles/styles.module.css'

const reservedKey = ['collectionId', 'collectionName', 'created', 'id', 'updated', 'expand']

function Sidepane({ updateHandler, data, title, show, cancelHandler, model }) {
    const formRef = useRef();
    const fields = useMemo(() => Object.keys(model).filter(e => !reservedKey.includes(e)), [model]);
    useMemo(() => formRef.current?.reset(), [show])
    // console.log(fields)
    return (
        <div className={`${style.bg} ${show ? '' : style.bgAnimation}`}>
            <div className={style.hotspot} onClick={cancelHandler}></div>
            <form className={`${style.sidepane} ${show ? '' : style.sidepaneAnimation}`} ref={formRef} onSubmit={(e) => {
                e.preventDefault()
                const newData = {}
                for (let key in fields) {
                    newData[e.target[key].name] = e.target[key].value;
                }
                updateHandler(newData)
            }}>
                <h1>{title}</h1>
                <h4> ID: {data?.id || 'waiting'}</h4>
                <div className={style.inputWrapper}>
                    {
                        fields.map((key) => {
                            return (
                                <div className={style.inputBox} key={key}>
                                    <label htmlFor={key}> {key} </label>
                                    <input type="text" id={key} defaultValue={data ? data[key] : ''} name={key} />
                                </div>
                            )
                        })
                    }

                </div>
                <p> {JSON.stringify(data)} </p>
                <div className={style.buttonWrapper}>
                    <button type='reset' className={globalStyle.outline}> Reset </button>
                    <button type='submit'> Done </button>
                </div>
            </form>
        </div>
    )
}

export default Sidepane