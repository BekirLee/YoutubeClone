import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { AiOutlineLike, AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { IoCut } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiSolidLike } from "react-icons/bi";
// import 'dotenv/config';


// const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";


function CurrentVideo() {
    // let videoItems;

    const [videoData, setVideoData] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [channelSub, setSubs] = useState(null);
    const [views, setViews] = useState(null);
    const [likes, setLikes] = useState(null);
    const [channelInfos, setChannelInfos] = useState(null);
    const [searchParams] = useSearchParams();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [descBoxClicked, setDeskBoxClicked] = useState(false)
    const [description, setDescription] = useState(videoData?.snippet?.description.slice(0, 20) + '...');
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
        setViews(res.data.items[0].statistics.viewCount)
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

    const likeClick = () => {
        if (liked == 0) {
            setLiked(true)
        }
        else if (liked == 1) {
            setLiked(false)
        }
    }

    const dislikeClick = () => {
        if (disliked == 0) {
            setDisliked(true)
        }
        else if (disliked == 1) {
            setDisliked(false)
        }
    }

    const subscriber = () => {
        let subBtn = document.querySelector('.subBtn');
        let innerSubBtn = document.querySelector('.innerSubBtn');
        let btnSubParent = document.querySelector('.btnSubParent');
        // btnSubParent.style.
        // subBtn.classList.toggle('hidden');
        // innerSubBtn.classList.toggle('hidden');

        if (subscribed == false) {
            setSubscribed(true)
        }
    }

    const beforeUnsub = () => {
        if (subscribed == true) {
            setSubscribed(false)
        }
    }

    const publishedAt = (videoPublishedAt) => {
        const publishedDate = new Date(videoPublishedAt);
        const now = new Date();
        const elapsed = Math.floor((now - publishedDate) / 1000);

        if (elapsed < 60) {
            return `${elapsed} seconds ago`;
        } else if (elapsed < 3600) {
            return `${Math.floor(elapsed / 60)} minutes ago`;
        } else if (elapsed < 86400) {
            return `${Math.floor(elapsed / 3600)} hours ago`;
        } else if (elapsed < 2592000) {
            return `${Math.floor(elapsed / 86400)} days ago`;
        } else if (elapsed < 31536000) {
            return `${Math.floor(elapsed / 2592000)} months ago`;
        } else {
            return `${Math.floor(elapsed / 31536000)} years ago`;
        }
    };

    const commentsBox = () => {
        setDeskBoxClicked(prev => !prev)
    }
    const showLess = () => {
        setDeskBoxClicked(false);
    }

    useEffect(() => {
        console.log("DeskBocClicked Güncellendi:", descBoxClicked);
    }, [descBoxClicked]); //lifecycle

    useEffect(() => {
        showLess
    }, commentsBox)

    return (
        <div className='p-24 pr-8 pl-0'>

            <div className="w-[830px] max-w-4xl aspect-video rounded-lg overflow-hidden">
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
            <div className="w-[830px] text-white leading-8 mt-4 mb-3">
                <h3 className='font-bold text-[21px]'>{videoData?.snippet?.title}</h3>

                <div className="flex gap-2 items-center mt-3 h-14 justify-between">
                    <div className="flex gap-4">

                        <div className="w-11 h-11 object-cover">
                            {channelInfos?.snippet?.thumbnails?.medium?.url && (
                                <img src={channelInfos.snippet.thumbnails.medium.url ? channelInfos.snippet.thumbnails.default.url : "Error Avatar"} alt="Channel Avatar" className='rounded-full' />
                            )}
                        </div>

                        <div className=''>
                            <div className="text-[16px] h-6 font-bold whitespace-nowrap">
                                {channelInfos?.snippet?.title.length > 20 ? channelInfos?.snippet?.title.slice(0, 20) + '...' : channelInfos?.snippet?.title}
                            </div>
                            <div className='text-[13px] h-6 text-[#aaa]'>
                                {formatViewCount(channelSub) + " subs"}
                            </div>
                        </div>

                        <div className="btnSubParent  h-full rounded-full text-black font-roboto text-[14px font-medium">
                            <button className='subBtn'
                                onClick={subscriber}>
                                {
                                    !subscribed ? <div className='bg-white p-1 pl-[14px] pr-[14px] rounded-full hover:bg-[#ffffffe4] transition-all duration-300 ease-in-out'>Subscribe</div>
                                        :
                                        <div onClick={beforeUnsub} className="innerSubBtn w-[170px] h-full flex items-center p-1 rounded-full hover:bg-neutral-600 bg-[#ffffff35] transition-all duration-300 ease-in-out ">
                                            {
                                                // subscribed ? "hello" :
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="30" height="30" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="__lottie_element_160"><rect width="96" height="96" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_160)"><g transform="matrix(1,0.000002481389628883335,-0.000002481389628883335,1,47.99993133544922,48)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)"></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="currentcolor" fill-opacity="1" d=" M-6.5,26.410999298095703 C-6.5,26.410999298095703 6.5,26.410999298095703 6.5,26.410999298095703 C6.5,29.923999786376953 3.575000047683716,32.79899978637695 0,32.79899978637695 C-3.575000047683716,32.79899978637695 -6.5,29.923999786376953 -6.5,26.410999298095703z M22.75,19.290000915527344 C22.75,19.290000915527344 16.25,13.28600025177002 16.25,13.28600025177002 C16.25,13.28600025177002 16.25,-4.184000015258789 16.25,-4.184000015258789 C16.25,-12.071999549865723 12.381999969482422,-18.107999801635742 6.077000141143799,-20.47100067138672 C1.9819999933242798,-22.163999557495117 -2.502000093460083,-22.06800079345703 -6.4019999504089355,-20.375 C-12.51200008392334,-17.947999954223633 -16.25,-11.944000244140625 -16.25,-4.184000015258789 C-16.25,-4.184000015258789 -16.25,13.28600025177002 -16.25,13.28600025177002 C-16.25,13.28600025177002 -22.75,19.290000915527344 -22.75,19.290000915527344 C-22.75,19.290000915527344 -22.75,20.02400016784668 -22.75,20.02400016784668 C-22.75,20.02400016784668 22.75,20.02400016784668 22.75,20.02400016784668 C22.75,20.02400016784668 22.75,19.290000915527344 22.75,19.290000915527344z M26,17.947999954223633 C26,17.947999954223633 26,23.218000411987305 26,23.218000411987305 C26,23.218000411987305 -26,23.218000411987305 -26,23.218000411987305 C-26,23.218000411987305 -26,17.947999954223633 -26,17.947999954223633 C-26,17.947999954223633 -19.5,11.944000244140625 -19.5,11.944000244140625 C-19.5,11.944000244140625 -19.5,-4.502999782562256 -19.5,-4.502999782562256 C-19.5,-13.829000473022461 -14.430000305175781,-21.173999786376953 -6.5,-23.60099983215332 C-6.5,-23.60099983215332 -6.5,-24.81399917602539 -6.5,-24.81399917602539 C-6.5,-29.349000930786133 -1.6579999923706055,-32.79800033569336 3.2170000076293945,-30.434999465942383 C5.329999923706055,-29.413000106811523 6.5,-27.145000457763672 6.5,-24.81399917602539 C6.5,-24.81399917602539 6.5,-23.569000244140625 6.5,-23.569000244140625 C14.430000305175781,-21.173999786376953 19.5,-13.795999526977539 19.5,-4.4710001945495605 C19.5,-4.4710001945495605 19.5,11.97599983215332 19.5,11.97599983215332 C19.5,11.97599983215332 26,17.947999954223633 26,17.947999954223633z"></path><path fill='#fff' fill-opacity="1" d=" M-6.5,26.410999298095703 C-6.5,26.410999298095703 6.5,26.410999298095703 6.5,26.410999298095703 C6.5,29.923999786376953 3.575000047683716,32.79899978637695 0,32.79899978637695 C-3.575000047683716,32.79899978637695 -6.5,29.923999786376953 -6.5,26.410999298095703z M22.75,19.290000915527344 C22.75,19.290000915527344 16.25,13.28600025177002 16.25,13.28600025177002 C16.25,13.28600025177002 16.25,-4.184000015258789 16.25,-4.184000015258789 C16.25,-12.071999549865723 12.381999969482422,-18.107999801635742 6.077000141143799,-20.47100067138672 C1.9819999933242798,-22.163999557495117 -2.502000093460083,-22.06800079345703 -6.4019999504089355,-20.375 C-12.51200008392334,-17.947999954223633 -16.25,-11.944000244140625 -16.25,-4.184000015258789 C-16.25,-4.184000015258789 -16.25,13.28600025177002 -16.25,13.28600025177002 C-16.25,13.28600025177002 -22.75,19.290000915527344 -22.75,19.290000915527344 C-22.75,19.290000915527344 -22.75,20.02400016784668 -22.75,20.02400016784668 C-22.75,20.02400016784668 22.75,20.02400016784668 22.75,20.02400016784668 C22.75,20.02400016784668 22.75,19.290000915527344 22.75,19.290000915527344z M26,17.947999954223633 C26,17.947999954223633 26,23.218000411987305 26,23.218000411987305 C26,23.218000411987305 -26,23.218000411987305 -26,23.218000411987305 C-26,23.218000411987305 -26,17.947999954223633 -26,17.947999954223633 C-26,17.947999954223633 -19.5,11.944000244140625 -19.5,11.944000244140625 C-19.5,11.944000244140625 -19.5,-4.502999782562256 -19.5,-4.502999782562256 C-19.5,-13.829000473022461 -14.430000305175781,-21.173999786376953 -6.5,-23.60099983215332 C-6.5,-23.60099983215332 -6.5,-24.81399917602539 -6.5,-24.81399917602539 C-6.5,-29.349000930786133 -1.6579999923706055,-32.79800033569336 3.2170000076293945,-30.434999465942383 C5.329999923706055,-29.413000106811523 6.5,-27.145000457763672 6.5,-24.81399917602539 C6.5,-24.81399917602539 6.5,-23.569000244140625 6.5,-23.569000244140625 C14.430000305175781,-21.173999786376953 19.5,-13.795999526977539 19.5,-4.4710001945495605 C19.5,-4.4710001945495605 19.5,11.97599983215332 19.5,11.97599983215332 C19.5,11.97599983215332 26,17.947999954223633 26,17.947999954223633z"></path></g></g></g></svg>
                                                    <span className='text-white'>Subscribed!!!!!</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30" focusable="false" aria-hidden="true" fill='#fff' ><path d="m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z"></path></svg>
                                                </>
                                            }
                                        </div>
                                }
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3">

                        <div className="btns bg-[#ffffff35] rounded-full w-[150px] flex justify-around h-[40px]">
                            <button className='like hover:bg-[#fff3] w-full pl-5 pr-2 rounded-l-full flex items-center'
                                onClick={likeClick}>
                                {
                                    liked ? <AiOutlineLike style={{ width: "25px", height: "25px" }} /> : <BiSolidLike style={{ width: "25px", height: "25px" }} />
                                }

                                {formatViewCount(likes)}
                            </button>
                            <div className="h-[30px] w-[1px] bg-[#ffffff77] mt-1.5"></div>
                            <button className='dislike hover:bg-[#fff3] w-full pl-5 rounded-r-full'
                                onClick={dislikeClick}>
                                {
                                    disliked ? <AiOutlineDislike style={{ width: "25px", height: "25px" }} /> : <AiFillDislike style={{ width: "25px", height: "25px" }} />
                                }


                            </button>
                        </div>

                        <div className="share rounded-full bg-[#ffffff35] hover:bg-[#fff3] pl-4 pr-4">
                            <button className='flex items-center h-full'>
                                <PiShareFat style={{ color: "white", width: "25px", height: "25px" }} />
                                Share
                            </button>
                        </div>

                        <div className="dots flex items-center justify-center bg-[#ffffff35] hover:bg-[#fff3] rounded-full w-9 h-9 relative"
                            onClick={() => dotFunciton()}>
                            <HiOutlineDotsHorizontal />
                            <div className="absolute w-[120px] bottom-[40px] left-[10px] hiddenBox hidden bg-[#212121] z-[70] rounded-xl pt-2 pb-2">
                                <ul className='h-full'>
                                    <li className='flex justify-center gap-4 pl-2 pr-6 items-center hover:bg-[#fff3] h-9 '>
                                        <IoCut style={{ width: "24px", height: "24px" }} />
                                        Clip
                                    </li>
                                    <li className='flex justify-center gap-4 pl-2 pr-6  items-center hover:bg-[#fff3] h-9'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill='currentcolor' ><path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"></path></svg>
                                        Save
                                    </li>
                                    <li className='flex justify-center gap-4 pl-2 pr-6  items-center hover:bg-[#fff3] h-9'>
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill='currentcolor'><path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path></svg>
                                        Report
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="descriptionAndOthers bg-[#2a2929] rounded-xl font-roboto p-3 pb-0 mt-3"
                    onClick={commentsBox}>
                    <div className='flex gap-2'>
                        <div className="">
                            {formatViewCount(views)}
                        </div>
                        <div className="">
                            {publishedAt(videoData?.snippet?.publishedAt)}
                        </div>
                    </div>
                    <div className="commentbox text-sm/6">

                        {descBoxClicked ? (
                            videoData?.snippet?.description
                        ) : (
                            <>
                                {videoData?.snippet?.description.slice(0, 243)}
                                <span className="font-bold cursor-pointer">... more</span>
                            </>
                        )}
                    </div>

                    <button
                        className="backComment">
                        {
                            !descBoxClicked ? <div className="hidden"> Show less</div> : "Show less"
                        }
                    </button>
                </div>
            </div>

            <div className="comments ">
            </div>
        </div>
    )
}

export default CurrentVideo
