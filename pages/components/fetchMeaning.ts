const fetchMeaning = (word: string): any => {
    let output;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => {
        return res.json()
    }).then((data) => {
        output = data;
        console.log(data);
    })
    return output
}

export default fetchMeaning;