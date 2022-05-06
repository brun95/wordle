import { useCallback, useContext, useEffect } from "react";
import Key from "./Key";
import { AppContext } from '../App'

const Keyboard = () => {
  const { currAttempt, onSelectLetter, onDelete, onEnter, disabledLetters } = useContext(AppContext)

  const keysLine1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const keysLine2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const keysLine3 = ["Z", "X", "C", "V", "B", "N", "M"]

  const handleKeyboard = useCallback( 
    (event) => {
      if(event.key === "Enter"){
        onEnter()
      } else if(event.key === "Backspace"){
        onDelete()
      } else {
        
        keysLine1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key)
          }
        })
        keysLine2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key)
          }
        })
        keysLine3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key)
          }
        })
      }
  }, [currAttempt])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  }, [handleKeyboard])


  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>

      <div className='line1'>
        {keysLine1.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>
        })}
      </div>

      <div className='line2'>
        {keysLine2.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>
        })}
      </div>

      <div className='line3'>
        <Key keyVal={'ENTER'} bigKey />

        {keysLine3.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>
        })}

        <Key keyVal={'DELETE'} bigKey />
      </div>

    </div>
  )
}

export default Keyboard