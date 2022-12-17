import { useMemo, useRef, useState, useEffect } from 'react';
import style from './sidepane.module.css'
import globalStyle from '../styles/styles.module.css'
import Selector from './selector';

const reservedKey = ['collectionId', 'collectionName', 'created', 'id', 'updated', 'expand']

function Sidepane({ updateHandler, data, title, show, cancelHandler, model, newMode, options }) {
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
                updateHandler(newData, newMode)
            }}>
                <h1>{title}</h1>
                <h4> ID: {data?.id || 'waiting'}</h4>
                <div className={style.inputWrapper}>
                    {
                        fields.map((key) => {
                            const type = model[key] == URL ? 'url' : 'text'
                            if (model[key] === 'shared') {

                                return (
                                    <div className={style.inputBox} key={key}>
                                        <label htmlFor={key}> {key} </label>
                                        <Selector data={options || []}/>
                                    </div>
                                )
                            }
                            return (
                                <div className={style.inputBox} key={key}>
                                    <label htmlFor={key}> {key} </label>
                                    <input type={type} id={key} defaultValue={data ? data[key] : ''} name={key} />
                                </div>
                            )
                        })
                    }

                </div>
                <div className={style.buttonWrapper}>
                    <button type='reset' className={globalStyle.outline}> Reset </button>
                    <button type='submit'> Done </button>
                </div>
            </form>
        </div>
    )
}

export default Sidepane