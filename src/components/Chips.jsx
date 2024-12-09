import React, { useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function Chips() {
    const chips = [
        { id: 1, chip: "All" },
        { id: 2, chip: "Movie" },
        { id: 3, chip: "Sport video games" },
        { id: 4, chip: "Documentary" },
        { id: 5, chip: "Animation" },
        { id: 6, chip: "Drama" },
        { id: 7, chip: "Game" },
        { id: 8, chip: "Comedy sketches" },
        { id: 9, chip: "Football" },
        { id: 10, chip: "Music" },
        { id: 11, chip: "Mix'es" },
        { id: 12, chip: "Tourism" },
        { id: 13, chip: "Last updates" },
    ];

    const elementRef = useRef(null);
    const [isStart, setIsStart] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const checkScrollPosition = () => {
        if (elementRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = elementRef.current;
            setIsStart(scrollLeft === 0);
            setIsEnd(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    const sliderLeft = () => {
        if (elementRef.current) {
            elementRef.current.scrollLeft -= 200;
        }
    };

    const sliderRight = () => {
        if (elementRef.current) {
            elementRef.current.scrollLeft += 200;
        }
    };

    return (
        <div className="chips relative pl-[230px] top-[-720px] flex w-full ml-[10px] mt-[20px] whitespace-nowrap">
            {!isStart && (
                <div className="w-[55px] shadow-custom h-full absolute top-1/2 transform -translate-y-1/2  bg-[#0f0f0f]">

                    <HiChevronLeft
                        className="hidden md:block text-3xl cursor-pointer text-gray-700 "
                        onClick={sliderLeft}
                        size={30}
                    />
                </div>
            )}

            {/* Chips Container */}
            <div
                ref={elementRef}
                className="flex gap-4 overflow-x-scroll scroll-smooth whitespace-nowrap py-4 no-scrollbar"
                onScroll={checkScrollPosition}
            >
                {chips.map((chip) => (
                    <div
                        key={chip.id}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-300 transition w-[1310px]"
                    >
                        {chip.chip}
                    </div>
                ))}
            </div>

            {!isEnd && (
                <div className="w-[55px] shadow-custom h-full absolute top-1/2 transform -translate-y-1/2 right-1 bg-[#0f0f0f]">
                    <HiChevronRight
                        className="hidden md:block text-3xl cursor-pointer text-gray-700 "
                        onClick={sliderRight}
                    />
                </div>
            )}
        </div>
    );
}

export default Chips;
