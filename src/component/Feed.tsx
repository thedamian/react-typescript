import React, { useEffect, useState,SetStateAction } from 'react';
import './Feed.css';

interface Photo {
    _id?: string;
    photoUrl: string;
    likes?: number;
    comments?: string[];
    description?: string;
  }

  

function Feed() {
    const [feed,setFeed] = useState<Photo[]>([])
    

    useEffect(()=> {
        fetch("http://localhost:5001/photos")
        .then(res => res.json())
        .then(photos => {
            setFeed(photos)
        })
    },[])

    const likeClick = (id: string | undefined)=> {
        console.log("http://localhost:5001/photos/"+id)
        fetch("http://localhost:5001/photos/"+id,
        {method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            },
          body: JSON.stringify({likes: 1})
        })
        .then(res => res.json())
        .then(results => {
            console.log(results)
            setFeed(feed.map((photo:Photo) => {
               return  photo._id==id ? 
                {...photo,likes: (photo.likes ? photo.likes+1 : 1)}
                : 
                photo
            }) )
        })
    }

  return (
    <>
        <h1>Instagram</h1>
        {feed.map((photo : Photo) => {
            return (<>
                <div className='div-feed'>
                    <div style={{padding:'10px 5px',fontWeight:'bold'}}>Description{photo.description || ""}</div> 
                    <div style={{width:'100%',height:'auto'}}>
                        <img src={photo.photoUrl} alt=''/>
                        <div>{photo.description || "" }</div>
                        <div onClick={()=> likeClick(photo._id)}>👍 {photo.likes || ""}</div>
                    </div>
                </div>
            </>)
        })}
    </>
  )
}

export default Feed