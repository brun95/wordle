import { useContext, useEffect } from 'react'
import { AppContext } from '../App'

const Letter = ({letterPos, attemptValue}) => {
  const { board, guessWord, currAttempt, setDisabledLetters } = useContext(AppContext)
  
  const letter = board[attemptValue][letterPos]
  
  //correct - green || almost  - yellow || error   - grey
  const correct = guessWord.toUpperCase()[letterPos] === letter
  const almost = !correct && letter !== '' && guessWord.toUpperCase().includes(letter)

  const letterState  = currAttempt.attempt > attemptValue && (correct ? 'correct' : almost ? 'almost' : 'error')
  
  //set incorrect letters as disabled
  useEffect(() => {
    if (letter !== '' && !correct && !almost){
      setDisabledLetters((prev) => [...prev, letter])
    }
  }, [currAttempt.attempt])

  return (
    <div className='letter' id={letterState}>
      {letter}
    </div>
  )
}

export default Letter