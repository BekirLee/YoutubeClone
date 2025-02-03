import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { IoCut } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import 'dotenv/config';


// const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";


function CurrentVideo() {
    // let videoItems;

    const [videoData, setVideoData] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [channelSub, setSubs] = useState(null);
    const [likes, setLikes] = useState(null);
    const [channelInfos, setChannelInfos] = useState(null);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('id'); // Query parametresinden videoId'yi al
    const apikey = import.meta.env.VITE_API_KEY;
    const currentVideoFetch = async () => {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apikey}`);
        console.log(res)
        setVideoData(res.data.items[0])
        setChannelId(res.data.items[0].snippet.channelId)
    }
    const channelAvatar = async () => {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apikey}`)
        setChannelInfos(res.data.items[0])
        console.log(res.data.items[0])
    }
    const channelSubs = async () => {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apikey}`)
        setSubs(res.data.items[0].statistics.subscriberCount)
        setLikes(res.data.items[0].statistics.videoCount)
        // console.log(res.data.items[0].statistics)
    }
    useEffect(
        () => {
            currentVideoFetch();
        }, [])

    useEffect(() => {

        channelAvatar();
        channelSubs();
    }, [channelId])
    // console.log(videoItems)

    const formatViewCount = (number) => {
        if (number >= 1_000_000_000) {
            return (number / 1_000_000_000).toFixed(1) + "B";
        }
        if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1) + "M";
        }
        if (number >= 1_000) {
            return (number / 1_000).toFixed(1) + "K";
        }
        return number;
    };

    const dotFunciton = () => {
        const hiddenBox = document.querySelector('.hiddenBox');
        hiddenBox.classList.toggle('hidden')
        // hiddenBox.classList.add('hidden')
        hiddenBox.classList.toggle('block')
    }

    return (
        <div className='p-24 pr-8 pl-0'>

            <div className="w-[800px] max-w-4xl aspect-video rounded-lg overflow-hidden">
                {/* YouTube Embed Oynatıcı */}
                < iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`
                    }
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe >
            </div>
            <div className=" text-white leading-8 mt-3 mb-3">
                <h3 className='font-bold text-[21px]'>{videoData?.snippet?.title}</h3>

                <div className="flex gap-2 items-center h-14 justify-between">
                    <div className="flex gap-4">

                        <div className="w-11 h-11 object-cover">
                            {channelInfos?.snippet?.thumbnails?.medium?.url && (
                                <img src={channelInfos.snippet.thumbnails.medium.url ? channelInfos.snippet.thumbnails.default.url : "Error Avatar"} alt="Channel Avatar" className='rounded-full' />
                            )}
                        </div>

                        <div className=''>
                            <div className="text-[16px] h-6 font-bold">
                                {channelInfos?.snippet?.title.length > 20 ? channelInfos?.snippet?.title.slice(0, 20) + '...' : channelInfos?.snippet?.title}
                            </div>
                            <div className='text-[13px] h-6 text-[#aaa]'>
                                {formatViewCount(channelSub) + " subs"}
                            </div>
                        </div>

                        <div className="btn">
                            <button className='bg-white hover:bg-[#ffffffd8] rounded-full w-[60px] text-black font-bold pt-1 pb-1'>
                                Join
                            </button>
                        </div>

                        <div className="btn bg-grey hover:bg-[#ffffffd8] rounded-full w-[60px] text-black font-bold pt-1 pb-1">
                            <button className>
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3">

                        <div className="btns bg-[#ffffff35] rounded-full w-[140px] flex justify-around h-[40px]">
                            <button className='like hover:bg-[#ffffff2a] w-full pl-5 pr-2 rounded-l-full flex items-center'>
                                <AiOutlineLike style={{ width: "25px", height: "25px" }} />
                                {formatViewCount(likes)}
                            </button>
                            <div className="h-[30px] w-[1px] bg-[#ffffff77] mt-1.5"></div>
                            <button className='dislike hover:bg-[#ffffff2a] w-full pl-5 rounded-r-full'>
                                <AiOutlineDislike style={{ width: "25px", height: "25px" }} />
                            </button>
                        </div>

                        <div className="share rounded-full bg-[#ffffff35] hover:bg-[#ffffff4d] pl-4 pr-4">
                            <button className='flex items-center h-full'>
                                <PiShareFat style={{ color: "white", width: "25px", height: "25px" }} />
                                Share
                            </button>
                        </div>

                        <div className="download rounded-full  bg-[#ffffff35] hover:bg-[#ffffff4d] pl-4 pr-4">
                            <button className='flex items-center h-full'>
                                <LiaDownloadSolid />
                                Download
                            </button>
                        </div>

                        <div className="dots flex items-center justify-center bg-[#ffffff35] hover:bg-[#ffffff4d] rounded-full w-9 h-9 relative"
                            onClick={() => dotFunciton()}>
                            <HiOutlineDotsHorizontal />
                            <div className="absolute w-[120px] bottom-[40px] left-[10px] hiddenBox hidden bg-[#212121] z-[70] rounded-xl pt-2 pb-2">
                                <ul className='h-full'>
                                    <li className='flex justify-center gap-4 pl-2 pr-6 items-center hover:bg-[#ffffff4d] h-9 '>
                                        <IoCut style={{ width: "24px", height: "24px" }} />
                                        Clip
                                    </li>
                                    <li className='flex justify-center gap-4 pl-2 pr-6  items-center hover:bg-[#ffffff4d] h-9'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill='currentcolor' ><path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"></path></svg>
                                        Save
                                    </li>
                                    <li className='flex justify-center gap-4 pl-2 pr-6  items-center hover:bg-[#ffffff4d] h-9'>
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill='currentcolor'><path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path></svg>
                                        Report
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="descriptionAndOthers ">
                </div>

                <div className="comments"></div>
            </div>
        </div>
    )
}

export default CurrentVideo
