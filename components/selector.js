import { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import style from './selector.module.css'

function Selector({ data, set }) {
    console.log(data)
    const items = data.map(e => ({ name: e.subject, ...e }))
    const [selected, setSelected] = useState(null);

    const handleOnSearch = (string, results) => {
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
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
                autoFocus
                formatResult={formatResult}
            />
        </div>
    )
}

export default Selector