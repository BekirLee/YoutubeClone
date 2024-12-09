import React from 'react'
import Chip from './Chip'

function Chips() {
    const chips = [
        {
            id: 1,
            chip: "All"
        },
        {
            id: 2,
            chip: "Movie"
        },
        {
            id: 3,
            chip: "Sport video games"
        },
        {
            id: 4,
            chip: "Documentary"
        },
        {
            id: 5,
            chip: "Animation"
        },
        {
            id: 6,
            chip: "Drama"
        },
        {
            id: 7,
            chip: "Game"
        },
        {
            id: 8,
            chip: "Comedy scetches"
        },
        {
            id: 9,
            chip: "Football"
        },
        {
            id: 10,
            chip: "Music"
        },
        {
            id: 11,
            chip: "mix'es"
        },
        {
            id: 12,
            chip: "Tourism"
        },
        {
            id: 13,
            chip: "Last updates"
        }

    ]
    return (
        <div className='chips relative pl-[260px] top-[-720px] flex w-full ml-[10px] mt-[20px] whitespace-nowrap'>
            <Chip item={chips} />
        </div>
    )
}

export default Chips
