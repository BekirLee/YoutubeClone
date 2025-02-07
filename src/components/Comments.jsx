import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';



function Comments() {
    const apikey = import.meta.env.VITE_API_KEY;

    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('id'); // Query parametresinden videoId'yi al
    const [comments, setComments] = useState(null)

    const fetchComments = async () => {

        const res = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apikey}&maxResults=10`);
        console.log('mezelemme', res)
        setComments(res?.data?.items);
        // setVideoData(res.data.items[0])
        // setChannelId(res.data.items[0].snippet.channelId)
    }

    const channelAndUserFetch = () => {

    }

    useEffect(
        () => {
            fetchComments();
        }, [])

    return (

        <div className="comments">
            {
                comments && comments.map((comment, index) => (
                    // {console.log(object)}
                    <div className='flex'>
                        <img
                            src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
                            width={40} height={40}
                            alt="Profil Resmi"
                            className="rounded-full"
                        />
                        <div className=" bg-transparent">


                            <div className="text-white">
                                {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                            </div>
                            <p className='text-white'>{comment?.snippet?.topLevelComment?.snippet?.textOriginal}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Comments
