import React from 'react'

export const InputText = ({onChange,inputText}) => {
    return (
        <div>
            <input type='text' className="main-input" onChange={onChange} value={inputText}></input>
        </div>
    )
}

export default InputText
