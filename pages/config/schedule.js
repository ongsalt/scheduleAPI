import { useState, useMemo, useEffect } from 'react';
import { initPocketBase } from '../../lib/auth'
import PocketBase, { LocalAuthStore } from 'pocketbase';

import style from '../../styles/utils.module.css';
import Icon from '../../components/icon';
import Layout from '../../components/layout';
import ConfigLayout from '../../components/configLayout';
import Table from '../../components/table';
import Sidepane from '../../components/sidepane';
import { order as model } from '../../lib/model';

const header = [
    {
        title: 'Day',
        key: 'day'
    },
    {
        title: 'Order',
        key: 'order'
    },
    {
        title: 'Subject',
        key: 'subject',
    },
]

function Pool({ }) {
    const [filter, setFilter] = useState('');

    const [order, setOrder] = useState([]);
    const [options, setOption] = useState([]);
    const [availableClass, setAvailableClass] = useState([]);
    const [selectedClass, setSelectedClass] = useState({ grade: 5, class: 5 });

    const formattedOrder = useMemo(() => {
        console.log(order)
        return order
    }, [order]);

    // Init pocketbase
    const pb = useMemo(() => {
        if (typeof window !== 'undefined') {
            const pb = new PocketBase('http://127.0.0.1:8090', LocalAuthStore)
            // console.log(pb)
            console.log(pb.authStore())
            return pb
        }
    }, [])

    // Init fetch
    useMemo(async () => {

        const temp = await pb.collection("class").getFullList()
        const e = temp.map(e => ({ class: e.class, grade: e.grade }))
        console.log({ temp, e })
        setAvailableClass(state => e)
        setSelectedClass(e[0])
        console.log({ availableClass, selectedClass })

        const fetchedOrders = await pb.collection("order").getFullList(undefined, {
            filter: `grade=${selectedClass.grade} && class=${selectedClass.class}`,
            expand: 'subject,subject.subjectData'
        })
        const formatted = fetchedOrders.map(fetchedOrder => {
            console.log(fetchedOrder)
            return {
                order: fetchedOrder.order,
                class: fetchedOrder.class,
                grade: fetchedOrder.grade,
                day: fetchedOrder.day,
                subject: fetchedOrder?.expand?.subject?.expand.subjectData?.subject
            }
        })
        setOrder(formatted)
        const gettedOptions = await pb.collection("pool").getFullList(undefined, {
            expand: 'subjectData'
        })
        const formattedOption = gettedOptions.map(it => {
            return {
                subject: it?.expand?.subjectData?.subject,
                subjectID: it?.expand?.subjectData?.subjectID,
                ...it
            }
        })
        setOption(formattedOption)

    }, [pb])

    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(false);
    const [newMode, setNewMode] = useState(false);
    const [updateHandler, cancelHandler] = useMemo(() => {
        if (!!selected) {
            setShow(true)
        }
        return [
            async (newData, newMode) => {
                console.log(newData)
                // submit data somehow
                try {

                    if (newMode) {
                        await pb.collection("pool").create(newData)
                    } else {
                        console.log(selected.id, newData)
                        await pb.collection("pool").update(selected.id, newData);
                    }

                    setOrder(await pb.collection("pool").getFullList(undefined, {
                        expand: 'subjectData'
                    }))

                    setShow(false)
                    setNewMode(false)
                    setTimeout(() => setSelected(null), 500) // actually 400ms but why not
                } catch (e) {
                    console.log(e.data)
                }
            },
            () => {
                setShow(false)
                setNewMode(false)
                setTimeout(() => setSelected(null), 500) // actually 400ms but why not
            }
        ]
    }, [selected])
    const optionFetcher = useMemo(() => {
        return () => pb.collection('shared').getFullList()
    }, [pb])


    useEffect(() => {
        const handler = (e) => {
            if (e.key == 'Escape') {
                cancelHandler()
            }
        }
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        }
    }, [])

    return (
        <Layout title="Schedule">
            <ConfigLayout>
                <div className={style.body}>
                    <div className={style.flex}>
                        <div className={style.flex}>
                            <h1> Schedule </h1>
                            {/* <p> Class </p> */}
                            <select name="class" id="class" title='Class'>
                                {availableClass.map(element => (
                                    <option value={element} key={element}> {`${element.grade}/${element.class}`} </option>))}
                            </select>
                        </div>
                        <div className={style.flex}>
                            <button onClick={() => {
                                setNewMode(true)
                                setShow(true)
                            }}><Icon id='add' size={18} /> New
                            </button>
                            <input type="text" value={filter} placeholder='Search' onInput={e => {
                                setFilter(e.target.value)
                            }} />
                        </div>
                    </div>
                    {order.length != 0 ?
                        <Table data={formattedOrder} header={header} filter={filter} setSelected={setSelected} />
                        : null
                    }

                </div>
                <Sidepane
                    show={show}
                    updateHandler={updateHandler}
                    cancelHandler={cancelHandler}
                    options={options}
                    title='Edit'
                    data={selected}
                    model={model}
                    newMode={newMode}
                />
            </ConfigLayout>
        </Layout>
    )
}

export default Pool