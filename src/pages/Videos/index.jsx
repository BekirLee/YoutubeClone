import React from 'react'
import Header from '../../components/Header'
import { useSearchParams } from 'react-router-dom';
import CurrentVideo from '../../components/CurrentVideo';

function Videos() {

    // console.log(videoId)

    return (
        <div className="container bg-[#0f0f0f] h-full">
            {
                <div className="">
                    <Header />
                    <CurrentVideo />
                </div>
            }

        </div >
    );
}
export default Videos
