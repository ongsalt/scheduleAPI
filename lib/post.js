
async function post(target, body) {
    const rawResponse = await fetch(target, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const content = await rawResponse.json();
    return content;
}

export { post }