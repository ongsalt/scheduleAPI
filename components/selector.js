import { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import style from './selector.module.css'

function Selector({ data, setSelectedID, key, defaultValue }) {
    const items = data.map(e => ({ name: e.subject, ...e }))
    console.log(data)
    const handleOnHover = (result) => {
        // the item hovered
    }

    const handleOnSelect = (item) => {
        // the item selected
        setSelectedID(item.id)
        console.log(item)
    }

    const formatResult = (item) => {
        return (
            <span className={style.result}>
                {item.subject}
                <span> {item.subjectID} </span>
            </span>
        )
    }

    return (
        <div className={style.wrapper}>
            <ReactSearchAutocomplete
                items={items}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                placeholder={defaultValue}
                formatResult={formatResult}
                key={key}
            />
        </div>
    )
}

export default Selector