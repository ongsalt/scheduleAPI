import PocketBase from 'pocketbase';

const connection = {}

function connect() {
    if (!connection.client) {
        connection.client = new PocketBase('http://127.0.0.1:8090');
    }
    return connection.client
}

async function getOrder(time, target) {
    const client = connect();
    const filter = `(order=${time.order}&&day=${time.day}&&grade=${target.grade}&&class=${target.class})`;
    console.log({ filter })
    const resultList = await client.records.getList('order', 1, 50, {
        filter,
        expand: 'subject,subject.subjectData'
    });    
    if (resultList.items && resultList.items[0]) {
        return resultList.items[0];
    }
    return null;
}

export { getOrder };