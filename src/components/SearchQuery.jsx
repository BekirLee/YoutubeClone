import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/SearchContext';
import { Link, useLocation } from 'react-router-dom';
// import {API_KEY} from '../components/YoutubeVideos';
// const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";


function SearchQuery() {
    // const { searchQuery } = useContext(SearchContext);
    // const { videosSearch } = useContext(SearchContext);
    const [videos, setVideos] = useState([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("query");

    useEffect(() => {
        // if (!searchQuery) return;
        const fetchVideos = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchTerm}&type=video&key=AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4`
                );
                const data = await response.json();
                setVideos(data.items || []); // Gelen videoları güncelle
            } catch (error) {
                console.error("API fetch error:", error);
            }
        };

        fetchVideos();
    }, []);
    console.log(videos)
    return (
        <div className="relative top-[175px] left-[240px] bg-[#0f0f0f] z-[9] grid grid-cols-1 w-[1130px]">

            {videos.map((video, index) => (
                <div
                    key={index}
                    className="mb-14 mr-[35px] relative group"
                >
                    <div className="absolute text-white bg-black rounded-lg p-0.5 bottom-28 right-2">
                        {/* {parseDuration(video.contentDetails.duration)} */}
                    </div>

                    <Link to={`/videos?id=${video.id}`}>
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="rounded-lg w-full"
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

                    <div className="content flex items-center mt-2 h-24">
                        <div className="avatar w-[40px] h-[40px] mr-2 mb-[50px]">
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
                                    <h5 className="text-sm text-gray-300 pt-1.5">
                                        <Link to={`/channel?id=${video.snippet.channelId}`}>
                                            {video.snippet.channelTitle}
                                        </Link>
                                    </h5>
                                    <div className="flex gap-2 pt-1.5">
                                        <h5 className="text-sm text-gray-300 ">
                                            {/* {formatViewCount(video.statistics.viewCount.toLocaleString())} Views */}
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default SearchQuery
