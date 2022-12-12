import { useState } from 'react';
import style from './sidepane.module.css'
import globalStyle from '../styles/styles.module.css'

const duration = .4;
const reserveKey = ['collectionId', 'collectionName', 'created', 'id', 'updated', 'expand']

function Sidepane({ updateHandler, data, title, show, cancelHandler, model }) {

    return (
        <div className={`${style.bg} ${show ? '' : style.bgAnimation}`}>
            <div className={style.hotspot} onClick={cancelHandler}></div>
            <form className={`${style.sidepane} ${show ? '' : style.sidepaneAnimation}`}>
                <h1>{title}</h1>
                <h4>{data?.id}</h4>
                <div className={style.inputWrapper}>
                    {
                        Object.keys(data || model || {}).filter(e => !reserveKey.includes(e)).map((key) => {
                            return (
                                <div className={style.inputBox} key={key}>
                                    <label htmlFor={key}> {key} </label>
                                    <input type="text" id={key} defaultValue={data[key]} name={key} />
                                </div>
                            )
                        })
                    }

                </div>
                <p> {JSON.stringify(data)} </p>
                <p> {JSON.stringify(model)} </p>
                <div className={style.buttonWrapper}>
                    <button type='reset' className={globalStyle.outline}> Reset </button>
                    <button type='submit' onClick={() => {
                        updateHandler()
                    }}> Done </button>
                </div>
            </form>
        </div>
    )
}

export default Sidepane