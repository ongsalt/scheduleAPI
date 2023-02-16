const PocketBase = require("pocketbase/cjs")

const client = new PocketBase('http://127.0.0.1:8090');

async function main() {
    const resultList = await client.collection('order').getList(1, 100);
    for (let item of resultList.items) {
        if (item.order >= 5) {
            console.log({ item })
            const record = await client.collection('order').update(item.id, { order: item.order + 1 });
        }
    }
}

main()