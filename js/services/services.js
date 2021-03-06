const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'content-type': 'application/json'
        }
    });

    return await res.json();
};

const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fatch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getData};