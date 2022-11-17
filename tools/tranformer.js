const PocketBase = require("pocketbase/cjs")

const client = new PocketBase('http://127.0.0.1:8090');

// fetch a paginated records list



async function main() {
    const resultList = await client.records.getList('order', 1, 100);
    for (let item of resultList.items) {
        console.log({item})
        const record = await client.records.update('order', item.id, { class: parseInt(item.classT) });
    }
}

main()