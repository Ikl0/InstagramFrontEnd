import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)

    const { userId } = useParams()
    const [showfollow, setShowFollow] = useState(state ? !state.following.includes(userId) : true)

    useEffect(() => {
        fetch(`/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setProfile(result)
            })
    }, [])


    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userId
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followes: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                //setProfile({
                //        ...userProfile,
                //        followers:Response.data.following,
                //        following:Response.data.followers
                // })
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id] //анекдот нумар 1
                        }
                    }
                })
                setShowFollow(false)
            })
    }

    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userId
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followes: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                //setProfile({
                //        ...userProfile,
                //        followers:Response.data.following,
                //        following:Response.data.followers
                // })
                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item != data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower //анекдот нумар 2
                        }
                    }
                })
                setShowFollow(true)
            })
    }


    return (
        <>
            {userProfile ? <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    borderBottom: "1px solid grey"
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src="https://www.zocalopublicsquare.org/wp-content/uploads/2016/04/Mathews-on-Trump-LEAD.jpg"></img>
                    </div>
                    <div>
                        <h4>{userProfile.user.name}</h4>
                        <h4>{userProfile.user.email}</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h6>{userProfile.posts.length} posts</h6>
                            <h6>{userProfile.user.followers.length} followers</h6>
                            <h6>{userProfile.user.following.length} following</h6>
                        </div>
                        {
                            showfollow ?
                                <button style={{ margin: "10px" }} className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => followUser()}>Follow</button>
                                :
                                <button style={{ margin: "10px" }} className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => unfollowUser()}>UnFollow</button>
                        }

                    </div>
                </div>

                <div className="gallery">
                    {
                        userProfile.posts.map(item => {
                            return (
                                <img key={item._id} className="item" src="https://www.zocalopublicsquare.org/wp-content/uploads/2016/04/Mathews-on-Trump-LEAD.jpg" alt={item.title} />
                            )
                        })
                    }
                </div>
            </div> : <h2>loading ...</h2>}
        </>
    )
}

export default Profile