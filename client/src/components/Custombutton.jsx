import React from 'react'
import state from '../store';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';


const Custombutton = ({type, title, customStyles, handleClick}) => {
    const snap = useSnapshot(state)
    const generateStyle = (type) => {
        if(type === 'filled') {
            return (
                {
                    backgroundColor: snap.color,
                    color: getContrastingColor(snap.color)
                }
            )
        }
        else {
            return ( {
                border: `1px solid ${snap.color}`,
                color: getContrastingColor(snap.color)
            })
        }
    }
  return (
    <button onClick={handleClick} className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
    style = {generateStyle(type)}>{title}</button>
  )
}

export default Custombutton