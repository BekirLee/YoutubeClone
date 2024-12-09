import React from 'react'

function Chip({ item }) {

    return (
        <div className='flex'>
            {item.map((chip) => (
                <div className="bg-[#f1f1f121] text-[#f1f1f1] px-1. py-1.5 pr-2 rounded-lg transition m-3 ml-0" key={chip.id}>
                    {chip.chip}
                </div>
            )
            )}
        </div>
    )
}

export default Chip
