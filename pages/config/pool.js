import { useState, useMemo, useEffect } from 'react';
import { initPocketBase } from '../../lib/auth'
import PocketBase, { LocalAuthStore } from 'pocketbase';

import style from '../../styles/utils.module.css';
import Icon from '../../components/icon';
import Layout from '../../components/layout';
import ConfigLayout from '../../components/configLayout';
import Table from '../../components/table';
import Sidepane from '../../components/sidepane';
import { pool as model } from '../../lib/model';

const header = [
  {
    title: 'Subject',
    key: 'subject',
  },
  {
    title: 'Room',
    key: 'room'
  },
  {
    title: 'Teacher',
    key: 'teacher',
  },
  {
    title: 'Link',
    key: 'link',
  },
]


function Pool({ }) {
  const [filter, setFilter] = useState('');

  const [data, setData] = useState([]);
  const [options, setOption] = useState([]);
  const formattedData = useMemo(() => {
    const formatted = data.map(e => ({ ...e, subject: e?.expand?.subjectData?.subject }))
    const filtered = formatted.filter(
      e => e.subject?.includes(filter) || e.room?.includes(filter) || e.teacher?.includes(filter) || filter === ''
    )
    console.log({ data, filtered })
    return filtered
  }, [data, filter])

  const pb = useMemo(() => {
    if (typeof window !== 'undefined') {
      const pb = new PocketBase('http://127.0.0.1:8090', LocalAuthStore)
      // console.log(pb)  
      console.log(pb.authStore())
      return pb
    }    
  }, [])

  useMemo(async () => {
    setData(await pb.collection("pool").getFullList(undefined, {
      expand: 'subjectData'
    }))
    setOption(await pb.collection("shared").getFullList())
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
          
          setData(await pb.collection("pool").getFullList(undefined, {
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
    <Layout title="Subject pool">
      <ConfigLayout>
        <div className={style.body}>
          <div className={style.flex}>
            <h1> Subject pool </h1>
            <div className={style.flex}>
              <button onClick={() => {
                setNewMode(true)
                setShow(true)
              }}> <Icon id='add' size={18} /> New </button>
              <input type="text" value={filter} placeholder='Search' onInput={e => {
                setFilter(e.target.value)
              }} />
            </div>
          </div>
          <Table data={formattedData} header={header} filter={filter} setSelected={setSelected} />
        </div>
        <Sidepane
          show={show}
          updateHandler={updateHandler}
          cancelHandler={cancelHandler}
          options={options}
          title={
            selected?.teacher ? 
              `Edit ${selected.teacher}'s ${selected.subject}`
              : `Edit ${selected?.subject || 'subject'}`
          }
          data={selected}
          model={model}
          newMode={newMode}
        />
      </ConfigLayout>
    </Layout>
  )
}

export default Pool