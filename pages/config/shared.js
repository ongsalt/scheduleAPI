import { useState, useMemo, useEffect } from 'react';
import { initPocketBase } from '../../lib/auth'
import PocketBase, { LocalAuthStore } from 'pocketbase';

import style from '../../styles/utils.module.css';
import Icon from '../../components/icon';
import Layout from '../../components/layout';
import ConfigLayout from '../../components/configLayout';
import Table from '../../components/table';
import Sidepane from '../../components/sidepane';



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

  const pb = useMemo(async () => {
    const pb = new PocketBase('http://127.0.0.1:8090', LocalAuthStore)
    const res = await pb.collection("shared").getFullList()
    setData(res)
    return pb
  }, [])

  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [updateHandler, cancelHandler] = useMemo(() => {
    if (!!selected) {
      setShow(true)
    }
    return [
      (newData) => {

        // submit data somehow
        setShow(false)
        setTimeout(() => setSelected(null), 500) // actually 400ms but why not
      },
      () => {
        setShow(false)
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
    <Layout title="Share" user={user}>
      <ConfigLayout>
        <div className={style.body}>
          <div className={style.flex}>
            <h1> Bruh </h1>
            <input type="text" value={filter} placeholder='Search' onInput={e => {
              setFilter(e.target.value)
            }} />
          </div>
          <Table data={formattedData} header={header} filter={filter} setSelected={setSelected} />
        </div>
        <Sidepane
          show={show}
          updateHandler={updateHandler}
          cancelHandler={cancelHandler}
          title="Edit subject"
          data={selected}
        />
      </ConfigLayout>
    </Layout>
  )
}

export default Config