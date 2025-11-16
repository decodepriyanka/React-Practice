import React, { useEffect, useRef, useState } from 'react';
import "./styles.css";

function OTPInput() {
  const OTP_DIGIT_COUNT = 5
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""))
  const refArr = useRef([])
  useEffect(() => {
    refArr.current[0]?.focus()
  }, [])
  const handleOnChange = (value, index) => {
    if (isNaN(value)) return
    console.log(value)
    const newValue = value.trim()
    const newArray = [...inputArr]
    newArray[index] = newValue.slice(-1)
    console.log(value)
    setInputArr(newArray)
    newValue && refArr.current[index + 1]?.focus()

  }
  const handleOnKeyDown = (e, index) => {
    console.log(e)
    if (!e.target.value && e.key == "Backspace") {
      refArr.current[index - 1]?.focus()

    }
  }
  return (
    <div className="parent" >
      {
        inputArr.map((input, index) => {
          return (
            <input className="opt-input" key={index}
              ref={(input) => (refArr.current[index] = input)}

              type="text" value={inputArr[index]}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              onChange={(e) => handleOnChange(e.target.value, index)}

            />
          )
        })
      }
    </div>
  );
}

export default OTPInput;
