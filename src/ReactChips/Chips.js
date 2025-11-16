import React, { useState } from 'react';
import './styles.css'

function ChipsInput() {
    const [inputText, setInputText] = useState("")
    const [chips, setChips] = useState([])

    const handleKeydown = (e) => {
        if (e.key === "Enter" && inputText.trim() !== "") {
            setChips(prev => [...prev, inputText])
            setInputText("")// CLEAR THE input
        }
    }

    const handleDeleteChip = (index) => {
        const copyChips = [...chips]
        copyChips.splice(index, 1)//splice change origin arr
        setChips(copyChips)
    }
    return (
        <div className='main-container'>
            <h2>Chips Input</h2>
            <input
                type="text"
                placeholder="Type a chip and press tag"
                className="input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => handleKeydown(e)}
            />
            <div style={{ display: "flex" }}>{
                chips.map((chip, index) => <div style={{ backgroundColor: "gray", margin: "10px", padding: "5px", color: "white" }}>
                    {chip}
                    <button onClick={() => handleDeleteChip(index)} style={{ color: "red" }}>X</button>
                </div>)
            }

            </div>
        </div>
    );
}

export default ChipsInput;