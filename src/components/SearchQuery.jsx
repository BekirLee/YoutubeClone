import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";

function SearchQuery() {
    const [videos, setVideos] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("query");

    const fetchVideos = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchTerm}&type=video&key=${API_KEY}`
            );
            const videos = response.data.items;
            const videoIds = videos.map((video) => video.id.videoId);
            const channelIds = videos.map((video) => video.snippet.channelId);

            // Fetch channel details
            const channelResponse = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
                params: {
                    part: "snippet",
                    id: channelIds.join(","),
                    key: API_KEY,
                },
            });

            const channels = channelResponse.data.items.reduce((acc, channel) => {
                acc[channel.id] = channel.snippet.thumbnails.default.url;
                return acc;
            }, {});

            // Fetch video details
            const videoDetails = await fetchVideoDetails(videoIds);
            const combinedData = videos.map((video) => ({
                ...video,
                channelAvatar: channels[video.snippet.channelId],
                details: videoDetails[video.id.videoId] || {}, // Add video details
            }));

            setVideos(combinedData);

        } catch (error) {
            console.error("API fetch error:", error);
        }
    };

    const fetchVideoDetails = async (videoIds) => {
        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet,contentDetails,statistics",
                    id: videoIds.join(","),
                    key: API_KEY,
                },
            });
            const videoDetails = {};
            response.data.items.forEach(videoDetail => {
                videoDetails[videoDetail.id] = videoDetail; // Store video details by ID
                // console.log(object)
                console.log(videoDetail)
                // videos.filter((founded) => { 
                //     if (founded.id.videoId === video.id) {
                //         founded.details = video;
                //         console.log(video)
                //     }
                //     else{
                //         console.log(video)
                //     }
                // })
            });

            // console.log(videoDetails)
            return videoDetails;
        } catch (error) {
            console.error("Error fetching video details:", error);
            return {};
        }
    };

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

    const parseDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (match[1] || "").replace("H", "") || "0";
        const minutes = (match[2] || "").replace("M", "") || "0";
        const seconds = (match[3] || "").replace("S", "") || "0";

        return `${hours !== "0" ? hours + ":" : ""}${minutes.padStart(2, "0")
            }:${seconds.padStart(2, "0")}`;
    };


    useEffect(() => {
        fetchVideos();
    }, [searchTerm]);

    return (
        <div className="relative top-[175px] left-[110px] bg-[#0f0f0f] z-[9] grid grid-cols-1 w-[1130px]">
            {videos.map((video, index) => (
                <div key={index} className="mb-5 mr-[35px] relative group flex">
                    <div className="absolute text-white bg-black rounded-lg p-0.5 bottom-2.5 right-[600px]">
                        {parseDuration(video.details.contentDetails.duration)}
                    </div>

                    <div className='w-[500px] h-[280px]'>

                        <Link to={`/videos?id=${video.id.videoId}`} >
                            <img
                                src={video.snippet.thumbnails.high.url}
                                alt={video.snippet.title}
                                className="rounded-lg w-full h-full"
                            />
                        </Link>
                    </div>
                    <div className="content flex items-center mt-2 h-24 ml-4">
                        <div className="contentInfo flex w-full justify-between relative">
                            <Link to={`/videos?id=${video.id.videoId}`}>
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
                                            {video.details.statistics ? formatViewCount(video.details.statistics.viewCount) + " Views" : "Loading..."}
                                        </h5>
                                    </div>
                                    <div className="text-white">
                                        {
                                            video.snippet.description.length > 100 ? video.snippet.description.slice(0, 100) + '...' : video.snippet.description
                                        }
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchQuery;