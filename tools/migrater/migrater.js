const schedule = require("./newSchedule.json")
const pool = require("./scheduleList.json")

const PocketBase = require("pocketbase/cjs")


const poolRecordId = [];

// poolRecordId.push({ id: poolRecord.id, name: poolRecord.name })
async function doPool(client) {

    for (let item of pool) {
        const { subject, subjectId, room, teacher, link } = item;
        console.log(item)
        const data = { subject, subjectID: subjectId };
        try {
            const sharedRecord = await client.collection('shared').create(data, { '$autoCancel': false });
            console.log("Here", sharedRecord.id)
            const pool = { room, teacher, link: `https://${link}`, subjectData: sharedRecord.id };
            // console.log(pool)
            try {
                const poolRecord = await client.collection('pool').create(pool, { '$autoCancel': false });
                poolRecordId.push({ id: poolRecord.id, subjectId: poolRecord.subjectID });
            } catch (e) { 
                console.log(e)
                console.log(`Failed to do ${pool}`)
            }  
        } catch (e) { 
            console.log(`Failed to do ${item}`)
         }
    }
}

async function doOrder(client) {

    let day = 1;
    for (let perday of schedule) {
        let period = 1;
        for (teacher of perday) {
            const resultList = await client.collection('pool').getList(1, 50, {
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
            await client.collection('order').create(data);
            period++;
        }
        day++;
    }
}

async function main() {
    const client = new PocketBase('http://127.0.0.1:8090');
    const authData = await client.admins.authWithPassword('ongsa.srp.mkm@gmail.com', 'pohparis1519');


    await doPool(client);

    await doOrder(client);
}

main()