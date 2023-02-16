import { useMemo, useRef, useState, useEffect } from 'react';
import style from './sidepane.module.css'
import globalStyle from '../styles/styles.module.css'
import Selector from './selector';


function Sidepane({ updateHandler, data, title, show, cancelHandler, model, newMode, options }) {
    const [selectedID, setSelectedID] = useState(null);
    const formRef = useRef();
    useEffect(() => {
        setSelectedID(data?.expand?.subjectData?.id)
    }, [data]);
    useMemo(() => formRef.current?.reset(), [show])

    // console.log(fields)
    return (
        <div className={`${style.bg} ${show ? '' : style.bgAnimation}`}>
            <div className={style.hotspot} onClick={cancelHandler}></div>
            <form className={`${style.sidepane} ${show ? '' : style.sidepaneAnimation}`} ref={formRef} onSubmit={(e) => {
                e.preventDefault()
                const newData = {}
                console.log(e.target.elements)

                for (let key in model) {
                    if (e.target.elements[key]) {

                        if (e.target.elements[key].tagName.toLowerCase() == 'input') {
                            newData[key] = e.target.elements[key].value;
                        }
                    } else {
                        console.log(key)
                        newData[key] = selectedID
                    }
                }
                console.log(newData)
                updateHandler(newData, newMode)
            }}>
                <h1>{title}</h1>
                <h4> ID: {data?.id || 'waiting'}</h4>
                <div className={style.inputWrapper}>
                    {
                        Object.keys(model).map((key) => {
                            const type = model[key] == URL ? 'url' : 'text'
                            if (key === 'subjectData') {
                                return (
                                    <div className={style.inputBox} key={key}>
                                        <label htmlFor={key}> Subject data </label>
                                        <Selector
                                            data={options || []} 
                                            setSelectedID={setSelectedID} 
                                            key={data?.id} 
                                            defaultValue={data?.subject}
                                        />
                                    </div>
                                )
                            } else if (key === 'subject') {
                                console.log(options)
                                return (
                                    <div className={style.inputBox} key={key}>
                                        <label htmlFor={key}> Subject </label>
                                        <Selector
                                            data={options} 
                                            setSelectedID={setSelectedID} 
                                            key={data?.id} 
                                            defaultValue={data?.subject}
                                        />
                                    </div>
                                )
                            }
                            return (
                                <div className={style.inputBox} key={key}>
                                    <label htmlFor={key}> {key} </label>
                                    <input type={type} defaultValue={data ? data[key] : ''} name={key} />
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