import wordDictionary from './wordle-dictionary.txt'

export const boardDefault = [
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
]

export const generateWordSet = async () => {
    let wordSet
    let todaysWord

    await fetch(wordDictionary)
    .then((response) => response.text()
    .then((result) => {
        const wordArr = result.split('\r\n')
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
        wordSet = new Set(wordArr)
    }))

    return { wordSet, todaysWord }
}