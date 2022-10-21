const frequentlyUsed = (words: string[], bannedWords: {[key: string]: boolean}): [string, number][] => {
    const frequency: {[key: string]: number} = {};
    const mostFrequency: [string, number][] = [];
    let maxCount: number = 0;
    if(words.length > 0){
        words.map(word => {
            if(word.length > 1){
                const lowercase: string = word.toLocaleLowerCase();
                frequency[lowercase] ? frequency[lowercase]++ : frequency[lowercase] = 1;
                maxCount = Math.max(maxCount, frequency[lowercase]);
            }
        });
        const setOfFrequency: [string,number][] = Object.entries(frequency).sort((a, b) => a[1] - b[1]);
        for(let i = setOfFrequency.length-1; i >= 0; i--) {
            const current: [string, number] = setOfFrequency[i];
            if(current !== undefined && bannedWords[current[0]] === undefined){
                mostFrequency.push(current)
            }
            if(mostFrequency.length === 10) break;
        }
    }
    return mostFrequency;
}



export default frequentlyUsed;