import axios from 'axios';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
// import 'dotenv/config';


// import API_KEY from '../../.env';c

function CurrentVideo() {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('id'); // Query parametresinden videoId'yi al
    const apikey = import.meta.env.VITE_API_KEY;
    const currentVideoFetch = async () => {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apikey}`);
        console.log(res)
    }
    currentVideoFetch();
    return (
        <div className='p-24 pr-8 pl-4'>

            < div className="w-[800px] max-w-4xl aspect-video rounded-lg overflow-hidden">
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
        </div>
    )
}

export default CurrentVideo
