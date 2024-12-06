import React from 'react'
import { IoMdHome, IoIosHelpCircleOutline } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { SiYoutubeshorts, SiTrendmicro } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import { LuListVideo } from "react-icons/lu";
import { MdOutlineVideoStable, MdOutlineWatchLater, MdOutlinedFlag } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { IoMusicalNotesOutline, IoSettingsOutline, IoGameControllerOutline } from "react-icons/io5";
import { TfiCup } from "react-icons/tfi";
import { GoReport } from "react-icons/go";


function Guide() {
    return (
        <div className='sections w-[240px] h-full py-3 '>
            <div className="items h-screen overflow-y-auto overflow-hidden scrollbar-thin scrollbar-track-transparent group relative">
                <div className="absolute top-0 right-0 w-2 bg-transparent group-hover:bg-gray-500 transition-all duration-300">
                    {/* <!-- Kaydırma çubuğu görselleştirme --> */}
                </div>
                <div className="mainBtns pb-3">
                    <div className="item flex w-[200px] h-[40px] bg-[#ffffff1a] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <IoMdHome style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Home</span>
                    </div>
                    <div className="flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <SiYoutubeshorts style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Shorts</span>
                    </div>

                    <div className="flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <BiSolidVideos style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Subscribers</span>
                    </div>

                </div>

                <div className="forUs  border-t-2 border-solid border-[#fff3] py-3">
                    <div className="flex items-center w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d] gap-[10px]">
                        <span className='text-white font-bold'>For You</span>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="16" viewBox="0 0 16 16" width="16" focusable="false" aria-hidden="true"><path d="M4.97 12.65 9.62 8 4.97 3.35l.71-.71L11.03 8l-5.35 5.35-.71-.7z"></path></svg>
                        </div>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <FaHistory style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>History</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <LuListVideo style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Play List</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <MdOutlineVideoStable style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Ur Videos</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <MdOutlineWatchLater style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Later Videos</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <AiOutlineLike style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Liked Ones</span>
                    </div>

                </div>

                <div className="subscribers border-t-2 border-solid border-[#fff3] pt-3 pb-3">

                    <div className="flex items-center w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d] gap-[10px]">
                        <span className='text-white font-bold'>Subscribers</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <AiOutlineLike style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Liked Ones</span>
                    </div>
                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <AiOutlineLike style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Liked Ones</span>
                    </div>
                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <AiOutlineLike style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Liked Ones</span>
                    </div>
                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <AiOutlineLike style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Liked Ones</span>
                    </div>
                </div>

                <div className="explore border-t-2 border-solid border-[#fff3]  pt-3 pb-3 ">

                    <div className="flex items-center w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d] gap-[10px]">
                        <span className='text-white font-bold'>Explore</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <SiTrendmicro style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Trends</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <IoMusicalNotesOutline style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Music</span>

                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <span className="yt-icon-shape style-scope yt-icon yt-spec-icon-shape"><div bis_skin_checked="1"><svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><path clipRule="evenodd" d="M5.636 5.636c.293-.293.293-.768 0-1.06-.293-.294-.768-.294-1.06 0-.976.974-1.75 2.132-2.277 3.406C1.772 9.256 1.5 10.622 1.5 12c0 1.379.272 2.744.8 4.018.527 1.274 1.3 2.432 2.275 3.407.293.293.768.293 1.061 0 .293-.293.293-.768 0-1.061-.836-.836-1.499-1.828-1.95-2.92C3.232 14.352 3 13.182 3 12s.233-2.352.685-3.444c.452-1.092 1.115-2.084 1.951-2.92Zm2.828 1.768c.293.292.293.767 0 1.06-.464.464-.832 1.016-1.083 1.622C7.129 10.693 7 11.343 7 12c0 .656.13 1.306.38 1.913.252.607.62 1.158 1.084 1.622.293.293.293.768 0 1.06-.292.294-.767.294-1.06 0-.604-.603-1.083-1.32-1.41-2.108C5.669 13.7 5.5 12.853 5.5 12c0-.854.168-1.7.495-2.488.326-.788.805-1.505 1.409-2.108.293-.293.768-.293 1.06 0Zm7.072 0c.292-.293.767-.293 1.06 0C17.816 8.623 18.5 10.276 18.5 12c0 1.724-.685 3.377-1.904 4.596-.293.293-.768.293-1.06 0-.293-.293-.293-.768 0-1.06C16.473 14.597 17 13.325 17 12s-.527-2.598-1.464-3.536c-.293-.293-.293-.768 0-1.06Zm2.828-2.829c.293-.293.768-.293 1.06 0C21.395 6.545 22.5 9.215 22.5 12s-1.106 5.456-3.075 7.425c-.293.293-.768.293-1.061 0-.293-.293-.293-.768 0-1.061C20.052 16.676 21 14.387 21 12s-.948-4.676-2.636-6.364c-.293-.293-.293-.768 0-1.06ZM12 14c1.105 0 2-.895 2-2 0-1.104-.895-2-2-2s-2 .896-2 2c0 1.105.895 2 2 2Z" fillRule="evenodd"></path></svg></div></span>
                        <span className='text-white ml-3'>Live</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <IoGameControllerOutline style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Game</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <TfiCup style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Sport</span>
                    </div>
                </div>

                <div className="moreYoutube border-t-2 border-solid border-[#fff3]  pt-3 pb-3 ">
                    <div className="flex items-center w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d] gap-[10px]">
                        <span className='text-white font-bold'>More in Youtube</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        {/*yt premium icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlSpace="preserve" focusable="false" aria-hidden="true" >
                            <g>
                                <path fill="#FF0033" d="M21.58,7.19c-0.23-0.86-0.91-1.54-1.77-1.77C18.25,5,12,5,12,5S5.75,5,4.19,5.42   C3.33,5.65,2.65,6.33,2.42,7.19C2,8.75,2,12,2,12s0,3.25,0.42,4.81c0.23,0.86,0.91,1.54,1.77,1.77C5.75,19,12,19,12,19   s6.25,0,7.81-0.42c0.86-0.23,1.54-0.91,1.77-1.77C22,15.25,22,12,22,12S22,8.75,21.58,7.19z"></path>
                                <polygon fill="#FFFFFF" points="10,15 15,12 10,9  "></polygon>
                            </g>
                        </svg>
                        <span className='text-white ml-3'>Youtube Premium</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        {/* yt studio */}
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlSpace="preserve" focusable="false" aria-hidden="true" >
                            <g>
                                <path fill="#FF0033" d="M11.13,1.21c0.48-0.28,1.26-0.28,1.74,0l8.01,4.64c0.48,0.28,0.87,0.97,0.87,1.53v9.24   c0,0.56-0.39,1.25-0.87,1.53l-8.01,4.64c-0.48,0.28-1.26,0.28-1.74,0l-8.01-4.64c-0.48-0.28-0.87-0.97-0.87-1.53V7.38   c0-0.56,0.39-1.25,0.87-1.53L11.13,1.21z"></path>
                                <polygon fill="#FFFFFF" points="10,15 15,12 10,9  "></polygon>
                                <path fill="#FFFFFF" d="M12,6c0.11,0,0.19,0.03,0.21,0.04l4.89,2.82c0.05,0.03,0.14,0.2,0.14,0.37v5.67c0,0.17-0.09,0.34-0.14,0.37   l-4.9,2.83c-0.03,0.01-0.1,0.04-0.21,0.04c-0.11,0-0.19-0.03-0.21-0.04l-4.9-2.83c-0.05-0.03-0.15-0.2-0.15-0.37V9.24   c0-0.17,0.1-0.34,0.14-0.37l4.9-2.83C11.82,6.03,11.89,6,12,6 M12,5c-0.25,0-0.51,0.06-0.71,0.18L6.39,8   C5.99,8.23,5.75,8.77,5.75,9.24v5.67c0,0.47,0.24,1,0.64,1.24l4.9,2.83c0.2,0.12,0.46,0.18,0.71,0.18c0.25,0,0.51-0.06,0.71-0.18   l4.9-2.83c0.41-0.24,0.64-0.77,0.64-1.24V9.24c0-0.47-0.23-1-0.64-1.24l-4.9-2.82C12.51,5.06,12.26,5,12,5L12,5z"></path>
                            </g>
                        </svg>
                        <span className='text-white ml-3'>Youtube Studio</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">  {/* yt kids */}
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlSpace="preserve" focusable="false" aria-hidden="true" >
                            <g>
                                <circle id="XMLID_4814__yt123" fill="#FF0033" cx="12" cy="12" r="11"></circle>
                                <path fill="#FFFFFF" d="M12,6.25c3.17,0,5.75,2.58,5.75,5.75s-2.58,5.75-5.75,5.75S6.25,15.17,6.25,12S8.83,6.25,12,6.25 M12,5.25   c-3.73,0-6.75,3.02-6.75,6.75s3.02,6.75,6.75,6.75s6.75-3.02,6.75-6.75S15.73,5.25,12,5.25L12,5.25z"></path>
                                <polygon fill="#FFFFFF" points="10,15 15,12 10,9  "></polygon>
                            </g>
                        </svg>
                        <span className='text-white ml-3'>Youtube kids</span>
                    </div>

                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">   {/* yt music */}
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlSpace="preserve" focusable="false" aria-hidden="true" >
                            <g>
                                <g>
                                    <path fill="#FF0033" d="M22.64,13.2c-0.01-1.04-0.62-5.98-0.9-6.74c-0.19-0.5-0.58-1.4-1.31-1.95c-0.94-0.7-1.7-0.83-2.68-0.85    C17.06,3.64,6.12,5.03,4.79,5.51C3.8,5.88,3.03,6.35,2.42,6.95c-0.99,0.98-1.18,1.93-1.02,3.6c0.14,1.52,0.85,6.55,1.21,7.59    c0.39,1.15,1.11,2.03,2.3,2.16c3.62,0.39,4.48-1.6,12.9-1.58c2.55,0.01,3.82-1.11,4.35-2.08C22.77,15.49,22.65,13.99,22.64,13.2z"></path>
                                    <path fill="#212121" d="M17.47,4.04C17.47,4.04,17.48,4.04,17.47,4.04c0.94,0.02,1.67,0.14,2.56,0.81    c0.7,0.53,1.08,1.39,1.25,1.86c0.28,0.73,0.85,5.44,0.86,6.43c0.01,0.76,0.12,2.19-0.47,3.28c-0.5,0.92-1.71,1.98-4.13,1.98    c-0.01,0-0.01,0-0.02,0c-0.04,0-0.07,0-0.11,0c-7.23,0-8.55,1.56-11.33,1.56c-0.27,0-0.56-0.02-0.87-0.05    c-1.13-0.12-1.82-0.96-2.19-2.06c-0.34-0.99-1.01-5.79-1.15-7.24c-0.15-1.6,0.03-2.51,0.98-3.44c0.58-0.57,1.32-1.02,2.27-1.37    C6.38,5.35,16.73,4.04,17.47,4.04 M17.47,3.2c-0.47,0-3.53,0.37-6.09,0.72C8.82,4.27,5.6,4.75,4.84,5.03    c-1.06,0.39-1.9,0.9-2.56,1.56C1.05,7.8,0.9,9.06,1.05,10.7c0.12,1.27,0.8,6.28,1.19,7.43c0.53,1.55,1.55,2.48,2.89,2.62    c0.33,0.04,0.64,0.05,0.96,0.05c1.17,0,2.1-0.25,3.18-0.54c1.69-0.45,3.8-1.02,8.15-1.02l0.11,0l0.02,0    c1.07,0,3.68-0.24,4.86-2.42c0.63-1.17,0.6-2.59,0.58-3.43c0-0.09,0-0.18-0.01-0.26c-0.01-1.01-0.59-5.85-0.92-6.72    c-0.38-1-0.89-1.75-1.53-2.23c-1.05-0.79-1.94-0.96-3.04-0.98l-0.01,0L17.47,3.2L17.47,3.2z"></path>
                                </g>
                                <g>
                                    <path fill="#FFFFFF" d="M15.28,11.85c-0.03,0.02-0.05,0.03-0.08,0.05c-0.21,0.14-0.42,0.28-0.63,0.43    c-0.49,0.33-3.33,2.26-3.33,2.26c-0.24,0.18-0.7,0.47-0.87,0.38c-0.17-0.09-0.23-0.72-0.27-1.02l-0.01-0.07    c-0.05-0.36-0.46-3.83-0.51-4.21C9.56,9.56,9.5,9.17,9.62,9.08c0.13-0.1,0.47,0.01,0.58,0.05c0.66,0.21,3.93,1.35,4.95,1.86    c0.03,0.02,0.06,0.03,0.1,0.04c0.15,0.06,0.35,0.15,0.35,0.39C15.6,11.65,15.42,11.76,15.28,11.85z"></path>
                                    <path fill="#212121" d="M10.04,9.59c1.14,0.38,3.77,1.32,5.01,1.87c-0.15,0.1-0.3,0.2-0.45,0.3c-0.58,0.39-3.94,2.68-3.94,2.68    l-0.02,0.01l-0.02,0.01c0,0,0,0,0,0c0-0.03-0.01-0.05-0.01-0.07l-0.02-0.13l-0.01-0.08c-0.04-0.31-0.31-2.58-0.48-3.94    C10.08,9.98,10.06,9.76,10.04,9.59 M9.4,8.56c-0.07,0-0.14,0.01-0.18,0.05c-0.15,0.11-0.07,0.58-0.05,0.7    c0.05,0.45,0.54,4.56,0.6,4.99l0.01,0.08c0.05,0.36,0.12,1.1,0.33,1.21c0.03,0.01,0.06,0.02,0.1,0.02c0.25,0,0.68-0.28,0.93-0.47    c0,0,3.36-2.29,3.94-2.68c0.25-0.17,0.5-0.34,0.75-0.51c0.03-0.02,0.06-0.04,0.1-0.06c0.17-0.1,0.38-0.23,0.38-0.5    c-0.01-0.29-0.24-0.39-0.41-0.46c-0.04-0.02-0.08-0.03-0.11-0.05c-1.21-0.61-5.09-1.96-5.87-2.21C9.8,8.63,9.58,8.56,9.4,8.56    L9.4,8.56z"></path>
                                </g>
                            </g>
                        </svg>
                        <span className='text-white ml-3'>Youtube Music</span>
                    </div>
                </div>

                <div className="settings border-t-2 border-solid border-[#fff3]  pt-3 pb-3 ">
                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <IoSettingsOutline style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Settings</span>

                    </div>
                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <IoIosHelpCircleOutline style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3 truncate'>Notification report history</span>
                    </div>
                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <MdOutlinedFlag style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Help</span>
                    </div>
                    <div className="item flex w-[200px] h-[40px] ml-2 rounded-lg py-2 pl-2 hover:bg-[#3d3d3d]">
                        <GoReport style={{ color: "white", fontSize: "24px" }} />
                        <span className='text-white ml-3'>Report</span>
                    </div>
                </div>

                <div className="help">
                    <div className="guide px-[16px] pt-[24px]">
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>About</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Copywrite</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Press</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Creators</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Ads</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Contact us</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Youtube</a>
                    </div>
                    <div className="guide2 px-[16px] pt-[24px]">
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Terms</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Policy</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>Policies</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>How Youtube Works?</a>
                        <a href="#" className='text-[#fff] no-underline mr-[8px] text-5 leading-5 inline-block'>New</a>
                    </div>
                    <div className="px-[16px] pt-[24px] copywrite text-[#717171] text-5 font-normal leading-relaxed">
                        © 2024 Google LLC
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Guide
