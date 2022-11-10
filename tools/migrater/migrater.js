const schedule = require("./newSchedule.json")
const pool = require("./scheduleList.json")

const PocketBase = require("pocketbase/cjs")

const client = new PocketBase('http://127.0.0.1:8090');

console.log(client.records.create)

const poolRecordId = [];

// poolRecordId.push({ id: poolRecord.id, name: poolRecord.name })
async function doPool() {
    for (let item of pool) {
        const { subject, subjectId, room, teacher, link } = item;
        console.log(item)
        const data = { subject, subjectID: subjectId };
        try {
            const sharedRecord = await client.records.create('shared', data, { '$autoCancel': false });
            console.log("Here")
            const pool = { room, teacher, link, subjectData: sharedRecord.id };
            try {
                const poolRecord = await client.records.create('pool', pool, { '$autoCancel': false });
                poolRecordId.push({ id: poolRecord.id, subjectId: poolRecord.subjectID });
            } catch (e) { }  
        } catch (e) { }
    }
}

async function doSc() {
    schedule.forEach((dayData, day) => {
        dayData.forEach( async (periodData, period) => {
            const data = {
                grade: 5,
                class: 5,
                order: period + 1,
                day: day + 1,
                subject: poolRecordId.find(record => periodData.includes(record.name))
            }
            const record = await client.records.create('order', data);
            
        })
    })
}

async function doOrder() {
    let day = 1;
    for (let perday of schedule) {
        let period = 1;
        for (teacher of perday) {
            const resultList = await client.records.getList('pool', 1, 50, {
                filter: `teacher = "${teacher}"`,
            });            
            console.log(resultList)
            const result = resultList.items ? resultList.items[0] : false; 
            if (!result) {
                period++;
                continue;
            }
            const localSubject = pool.find(each => schedule[day-1][period-1].includes(each.teacher))
            const data = {
                grade: 5,
                class: 5,
                subject: result.id,
                order: period,
                day,
                room: localSubject.room || null
            }
            await client.records.create('order', data);
            period++;
        }
        day++;
    }
}

async function main() {
    await doOrder();
}

main()