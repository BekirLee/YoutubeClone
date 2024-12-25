import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/SearchContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
// import {API_KEY} from '../components/YoutubeVideos';
const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";


function SearchQuery() {
    // const { searchQuery } = useContext(SearchContext);
    // const { videosSearch } = useContext(SearchContext);
    const [videos, setVideos] = useState([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("query");

    // if (!searchQuery) return;
    const fetchVideos = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchTerm}&type=video&key=AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4`
            );
            const videos = response.data.items;
            // console.log(videos.id?.videoId)
            const videoIds = videos.map((video) => video.id.videoId);
            console.log(videoIds)  
            const channelIds = videos.map((video) => video.snippet.channelId);
            console.log(channelIds)

            const channelResponse = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
                params: {
                    part: "snippet",
                    id: channelIds.join(","),
                    key: API_KEY,
                },
            });
            //
            // const fetching = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videos.id.videoId}`)
            // const items=fetching.data.items;
            // console.log(items)
            console.log(channelResponse)
            // setVideos(data.items || []); // Gelen videoları güncelle
            const channels = channelResponse.data.items.reduce((acc, channel) => {
                // console.log(acc)
                acc[channel.id] = channel.snippet.thumbnails.default.url;
                return acc;
            }, {});

            const combinedData = videos.map((video) => ({
                ...video,
                channelAvatar: channels[video.snippet.channelId],
            }));

            setVideos((prev) => [...prev, ...combinedData]);

        } catch (error) {
            console.error("API fetch error:", error);
        }
    };
    useEffect(() => {

        fetchVideos();
    }, []);
    // console.log(combinedData)
    return (
        <div className="relative top-[175px] left-[110px] bg-[#0f0f0f] z-[9] grid grid-cols-1 w-[1130px]">

            {videos.map((video, index) => (

                < div
                    key={index}
                    className="mb-5 mr-[35px] relative group flex"
                >
                    {console.log(video)}
                    <div className="absolute text-white bg-black rounded-lg p-0.5 bottom-28 right-2">
                        {/* {parseDuration(video.contentDetails.duration)} */}
                    </div>

                    <Link
                        to={`/videos?id=${video.id.videoId}`}
                        className='w-[500px] h-[280px]'>
                        <img
                            src={video.snippet.thumbnails.high.url}
                            alt={video.snippet.title}
                            className="rounded-lg w-full h-full"
                        />
                    </Link>

                    {/* {hover olanda videolara preview video} cox RAM yeyir yolun tap*/}
                    {/* <div
                                    className="absolute top-0 left-0 w-full h-full hidden group-hover:block"
                                    style={{ zIndex: 10 }}
                                >
                                    <iframe
                                        className="rounded-lg"
                                        width="100%"
                                        height="68%"
                                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0`}
                                        title={video.snippet.title}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    ></iframe>
                                </div> */}

                    < div className="content flex items-center mt-2 h-24 ml-4">

                        <div className="contentInfo flex w-full justify-between relative">
                            <Link to={`/videos?id=${video.id}`}>
                                <div>
                                    <h3 className="text-white h-11">
                                        <span className="font-roboto overflow-hidden block">
                                            {video.snippet.title.length > 50
                                                ? video.snippet.title.slice(0, 50) + "..."
                                                : video.snippet.title}
                                        </span>
                                    </h3>
                                    <div className="text-sm text-gray-300 pt-1.5 flex items-center">
                                        <div className="avatar w-[40px] h-[40px] mr-2 ">
                                            {video.channelAvatar ? (
                                                <Link to={`/channel?id=${video.snippet.channelId}`}>
                                                    <img
                                                        src={video.channelAvatar}
                                                        alt={video.snippet.channelTitle}
                                                        className="rounded-full w-full"
                                                    />
                                                </Link>
                                            ) : (
                                                <p className="text-white">Loading...</p>
                                            )}
                                        </div>
                                        <Link to={`/channel?id=${video.snippet.channelId}`}>
                                            {video.snippet.channelTitle}
                                        </Link>
                                    </div>
                                    <div className="flex gap-2 pt-1.5">
                                        <h5 className="text-sm text-gray-300 ">
                                            {/* {formatViewCount(video.statistics.viewCount.toLocaleString())} Views */}
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div >

            ))
            }
        </div >
    )
}

export default SearchQuery
