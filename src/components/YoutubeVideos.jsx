import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function YouTubeVideos() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";

    const fetchVideosAndChannels = async (pageToken = null) => {
        setLoading(true);
        try {
            const videoResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet,statistics",
                    chart: "mostPopular",
                    regionCode: "TR",
                    maxResults: 10,
                    pageToken: pageToken,
                    key: API_KEY,
                },
            });

            const videos = videoResponse.data.items;
            setNextPageToken(videoResponse.data.nextPageToken);

            const channelIds = videos.map((video) => video.snippet.channelId);

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

            const combinedData = videos.map((video) => ({
                ...video,
                channelAvatar: channels[video.snippet.channelId],
            }));

            setVideos((prev) => [...prev, ...combinedData]);
        } catch (error) {
            console.error("Error fetching videos or channels:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideosAndChannels();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextPageToken && !loading) {
                fetchVideosAndChannels(nextPageToken);
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [nextPageToken, loading]);

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

    const showBar = (event) => {
        const button = event.currentTarget;
        const btnBar = button.querySelector(".btnBar");
        console.log('object')


        if (btnBar.classList.contains("hidden")) {
            btnBar.classList.remove("hidden");
            btnBar.classList.add("block");
        } else {
            btnBar.classList.remove("block");
            btnBar.classList.add("hidden");
        }
    }

    return (
        <div className="relative top-[175px] left-[240px] bg-[#0f0f0f] z-[9] grid grid-cols-3 w-[1130px]">
            {videos.map((video) => (
                <div key={video.id} className="mb-14 mr-[35px]">
                    <Link to={`/videos?id=${video.id}`}>
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="rounded-lg w-full"
                        />
                    </Link>

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
                                <div className="">

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
                                            {formatViewCount(video.statistics.viewCount.toLocaleString())} Views
                                        </h5>
                                        <h5 className="text-sm text-gray-300 ">
                                            {(() => {
                                                const publishedDate = new Date(video.snippet.publishedAt);
                                                const today = new Date();
                                                const diffTime = Math.abs(today - publishedDate);
                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                return `${diffDays} days earlier`;
                                            })()}
                                        </h5>

                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={(event) => showBar(event)}
                                className="absolute w-10 h-10 right-0 top-0 m-auto">
                                <svg
                                    className="w-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#fff"
                                    enableBackground="new 0 0 24 24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    focusable="false"
                                    aria-hidden="true"
                                >
                                    <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-1.5-4.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                                </svg>
                                <div className="btnBar hidden bg-[#212121] top-9 left-0 absolute z-[10] w-[250px] rounded-lg pt-2 pb-2">
                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121] rounded-lg px-3 h-9 hover:bg-[#2121215b]">
                                        <div className="w-[40px] h-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full " fill="#fff" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><path d="M21 16h-7v-1h7v1zm0-5H9v1h12v-1zm0-4H3v1h18V7zm-11 8-7-4v8l7-4z"></path></svg>
                                        </div>
                                        <div className="text-white text-center font-sans text-[1.1rem] leading-[2rem] font-normal">Add List</div>
                                    </div>
                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121]  px-3 h-9">
                                        <div className="w-[40px]  h-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full" fill="#fff" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path></svg>   </div>
                                        <div className="text-white text-center font-sans text-[1.1rem] leading-[2rem] font-normal">Watch Later</div>
                                    </div>
                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121] px-3 h-9 ">
                                        <div className="w-[40px]  h-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full" fill="#fff" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"></path></svg>    </div>
                                        <div className="text-white text-center font-sans text-[1.1rem] leading-[2rem] font-normal">Save </div>
                                    </div>
                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121] px-3  h-9">
                                        <div className="w-[40px]  h-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full" fill="#fff" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path></svg>     </div>
                                        <div className="text-white text-center font-sans text-[1.1rem] leading-[2rem] font-normal">Download</div>
                                    </div>
                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121] rounded-lg px-3 h-9">
                                        <div className="w-[40px]  h-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full" fill="#fff" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path></svg>      </div>
                                        <div className="text-white text-center font-sans text-[1.1rem] leading-[2rem] font-normal">Share</div>
                                    </div>
                                    <div className="w-full h-[1px] bg-[#ffffff3b] my-3"></div>

                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121] rounded-lg px-3 h-9">
                                        <div className="w-[40px]  h-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full" fill="#fff" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM3 12c0 2.31.87 4.41 2.29 6L18 5.29C16.41 3.87 14.31 3 12 3c-4.97 0-9 4.03-9 9zm15.71-6L6 18.71C7.59 20.13 9.69 21 12 21c4.97 0 9-4.03 9-9 0-2.31-.87-4.41-2.29-6z" fill-rule="evenodd"></path></svg>
                                        </div>
                                        <div className="text-white text-center font-sans text-[1.1rem] leading-[2rem] font-normal">Not Interested</div>
                                    </div>
                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121] rounded-lg px-3 h-9">
                                        <div className="w-[40px]  h-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full" enable-background="new 0 0 24 24" fill="#fff" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><g><path d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm7 11H5v-2h14v2z"></path></g></svg></div>
                                        <div className="text-white text-center font-sans text-[1.1rem] leading-[2rem] font-normal">Dont Suggest Channel</div>
                                    </div>
                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121] rounded-lg px-3 h-9">
                                        <div className="w-[40px]  h-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full" enable-background="new 0 0 24 24" fill="#fff" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path></svg> </div>
                                        <div className="text-white text-center font-sans text-[1.1rem] leading-[2rem] font-normal">Report</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                </div>
            ))
            }

            {/* Observer için boş bir div */}
            <div ref={observerRef} style={{ height: "50px" }}></div>

            {loading && <p className="text-white text-center">Yükleniyor...</p>}
        </div >
    );
}

export default YouTubeVideos;
