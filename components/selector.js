import { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import style from './selector.module.css'

function Selector({ data, setSelectedID, key, defaultValue }) {
    const items = data.map(e => ({ name: e.subject, ...e }))

    const handleOnSearch = (string, results) => {
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        setSelectedID(item.id)
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
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
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                placeholder={defaultValue}
                formatResult={formatResult}
                key={key}
            />
        </div>
    )
}

export default Selector