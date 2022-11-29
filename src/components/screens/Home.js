import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../../App'

const Home = () => {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.posts)
            })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item=>{
                    if(item._id == result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            })
    }

    const dislikePost = (id) => {
        fetch('/dislike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item=>{
                    if(item._id == result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            })
    }

    return (
        <div className="home">
            {
                data.map((item) => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src="https://images.unsplash.com/photo-1626836014893-37663794dca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1146&q=80" />
                            </div>
                            <div className="card-content">
                                {item.likes.includes(state._id)
                                ?
                                [
                                <i className="material-icons" style={{ color: "red", }}>favorite</i>,
                                <i className="material-icons" onClick={()=>{dislikePost(item._id)}}>thumb_down</i>
                                ]
                                :                  
                                <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                                }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add comment" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home