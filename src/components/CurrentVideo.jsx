import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
// import 'dotenv/config';


// const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";


function CurrentVideo() {
    // let videoItems;

    const [videoData, setVideoData] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [channelSub, setSubs] = useState(null);
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
        // console.log(res.data.items[0].statistics.subscriberCount)
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
        return number.toString();
    };

    return (
        <div className='p-24 pr-8 pl-4'>

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

                <div className="flex gap-2 items-center h-14">

                    <div className="w-11 h-11 object-cover">
                        {channelInfos?.snippet?.thumbnails?.medium?.url && (
                            <img src={channelInfos.snippet.thumbnails.medium.url} alt="Channel Avatar" className='rounded-full' />
                        )}
                    </div>

                    <div className=''>
                        <div className="text-[16px] h-6 font-bold">
                            {channelInfos?.snippet?.title.length > 5 ? channelInfos?.snippet?.title.slice(0, 5) + '...' : channelInfos?.snippet?.title}
                        </div>
                        <div className='text-[13px] h-6 text-[#aaa]'>
                            {formatViewCount(channelSub)}
                        </div>
                    </div>

                    <div className="btn">
                        <button>
                            Join
                        </button>
                    </div>

                    <div className="btn">
                        <button>
                            Subscribe
                        </button>
                    </div>

                    <div className="btnLike">
                        <button className='like'></button>
                        <button className='dislike'></button>
                    </div>

                    <div className="share">
                        <button></button>
                    </div>

                    <div className="bars"></div>
                </div>

                <div className="descriptionAndOthers"></div>

                <div className="comments"></div>
            </div>
        </div>
    )
}

export default CurrentVideo
