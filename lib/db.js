import PocketBase from 'pocketbase';

const connection = {}

function connect() {
    if (!connection.client) {
        connection.client = new PocketBase('http://127.0.0.1:8090');
    }
    return connection.client
}

async function getOrder(time, target) {
    if (time.order == 5) {
        return {
            subject: 'พักเที่ยง'
        }
    }
    if (!time.isInSchoolTime) {
        return {
            message: 'ไม่ได้อยู่ในเวลาเรียน'
        }
    }
    const client = connect();
    const filter = `(order=${time.order}&&day=${time.day}&&grade=${target.grade}&&class=${target.class})`;
    // console.log({ filter })
    const resultList = await client.collection('order').getList(1, 50, {
        filter,
        expand: 'subject,subject.subjectData'
    });    
    if (resultList.items && resultList.items[0]) {
        return resultList.items[0];
    }
    return null;
}

// format and null handler
function format(schedule) {
    let link = schedule?.expand?.subject?.link
    let room = schedule?.expand?.subject?.room
    if (link === "https://undefined") {
        link = undefined
    }
    if (room === '') {
        room = undefined
    }
    const out = {
        subject: schedule?.expand?.subject?.expand?.subjectData?.subject ?? schedule.subject,
        subjectID: schedule?.expand?.subject?.expand?.subjectData?.subjectID,
        link,
        room,
        teacher: schedule?.expand?.subject?.teacher ?? undefined,
        message: schedule?.message,
    }

    return out
}

export { getOrder, format };