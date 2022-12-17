import RCTable from 'rc-table';
import IconButton from './iconButton';
import style from './table.module.css'

function Table({ data, header, setSelected }) {
    const keyyedData = data.map(d => ({ ...d, key: d.id }))
    const columns = header.map(e => ({
        title: e.title,
        dataIndex: e.key,
        key: e.key,
    }))

    columns.push({
        title: ' ',
        dataIndex: '',
        key: 'operations',
        render: (value) => <IconButton id="arrow_forward" action={() => {setSelected(value)}}/>,
    },)


    return (
        <RCTable data={keyyedData} columns={columns} className={style.table}/>
    )
}

export default Table