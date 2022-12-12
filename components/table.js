import RCTable from 'rc-table';
import IconButton from './iconButton';
import style from './table.module.css'

function Table({ data, header, setSelected }) {
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
        <RCTable data={data} columns={columns} className={style.table}/>
    )
}

export default Table