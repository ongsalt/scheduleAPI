import { useState, useMemo, useEffect } from 'react';
import { initPocketBase } from '../../lib/auth'
import PocketBase, { LocalAuthStore } from 'pocketbase';

import style from '../../styles/utils.module.css';
import Icon from '../../components/icon';
import Layout from '../../components/layout';
import ConfigLayout from '../../components/configLayout';
import Table from '../../components/table';
import Sidepane from '../../components/sidepane';
import { shared as model  } from '../../lib/model';

export async function getServerSideProps({ req, res }) {
  const pb = await initPocketBase(req, res);
  const user = { ...pb.authStore.model }

  return {
    props: {
      user
    }
  };
}


// const header = ["Subject" , "Subject ID"]
const header = [
  {
    title: 'Subject',
    key: 'subject',
  },
  {
    title: 'Subject ID',
    key: 'subjectID'
  }
]


function Config({ user }) {
  const [filter, setFilter] = useState('');

  const [data, setData] = useState([]);
  const formattedData = useMemo(() => {
    const filtered = data.filter(
      e => e.subject.includes(filter) || e.subjectID.includes(filter) || filter === ''
    )
    console.log({ data, filtered })
    return filtered
  }, [data, filter])

  const pb = useMemo(() => {
    const pb = new PocketBase('http://127.0.0.1:8090', LocalAuthStore)
    return pb
  }, [])

  useMemo(async () => setData(await pb.collection("shared").getFullList()), [pb])

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
            await pb.collection("shared").create(newData)
          } else {
            console.log(selected.id, newData)
            await pb.collection("shared").update(selected.id, newData);
          }
          setData(await pb.collection("shared").getFullList())
          
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
    <Layout title="Shared subject" user={user}>
      <ConfigLayout>
        <div className={style.body}>
          <div className={style.flex}>
            <h1> Bruh </h1>
            <div className={style.flex}>
              <button onClick={() => {
                setNewMode(true)
                setShow(true)
              }}> <Icon id='add' size={18}/> New </button>
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
          title="Edit subject"
          data={selected}
          model={model}
          newMode={newMode}
        />
      </ConfigLayout>
    </Layout>
  )
}

export default Config