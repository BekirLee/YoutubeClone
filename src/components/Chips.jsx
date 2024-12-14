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
        <div className="chips !fixed pl-[230px] top-[60px] flex w-full ml-9 whitespace-nowrap bg-[#0f0f0f] z-10">
            {!isStart && (
                <div className="flex w-[40px] h-full absolute top-1/2 transform -translate-y-1/2 bg-[#0f0f0f] group"
                    style={{ boxShadow: "rgb(15, 15, 15) 20px -9px 12px 6px" }}>
                    <HiChevronLeft
                        className="hidden md:block text-3xl cursor-pointer text-white mt-4 group-hover:rounded-full group-hover:bg-[#fff3]"
                        onClick={sliderLeft}
                        size={30}
                    />
                </div>
            )}

            {/* Chips Container */}
            <div
                ref={elementRef}
                className="flex gap-4 overflow-x-scroll scroll-smooth whitespace-nowrap py-4 no-scrollbar scrollbar-hide"
                onScroll={checkScrollPosition}
            >
                {chips.map((chip) => (
                    <div
                        key={chip.id}
                        className={`bg-[#ffffff1a] text-white px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-[#fff3] transition w-[1310px] ${chip.chip === "All" ? "bg-white !text-black hover:bg-white " : ""}`}
                    >

                        {chip.chip}
                    </div>
                ))}
            </div>

            {!isEnd && (
                <div className="w-[40px]  h-full absolute top-1/2 transform -translate-y-1/2 right-[30px] bg-[#0f0f0f] transition-shadow group"
                    style={{ boxShadow: "rgb(15, 15, 15) -20px 1px 12px 6px" }}>

                    <HiChevronRight
                        className="hidden md:block text-3xl cursor-pointer text-white mt-4 group-hover:rounded-full group-hover:bg-[#fff3]"
                        onClick={sliderRight}
                        size={30}
                    />
                </div>
            )}
        </div>
    );
}

export default Chips;
