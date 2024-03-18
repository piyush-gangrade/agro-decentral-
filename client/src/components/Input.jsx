import React from "react"

export default function Input(props) {
    return (
        <div>
            <label htmlFor={props.id} >{props.text} </label>
            <input 
                type={props.type} 
                id={props.id} 
                name={props.name} 
                value={props.value} 
                onChange={props.change}
            />
        </div>
    )
}