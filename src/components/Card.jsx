import React from "react";

function Card({card, onClick, flipped}){
    return (
        <div onClick={onClick} className={`card ${flipped ? "flipped": ""}`}>
           <img className='front' src={card.image} alt="" />
           <img className='back' src='/images/whatTheFlip.png' alt="" />
        </div>
    )
}

export default Card