import React, {useEffect, useState, useContext} from "react";
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()

     useEffect(()=>{
         fetch(`/user/${userid}`,{
         headers:{
             "Authorization":"Bearer " + localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
        setProfile(result)
    })
     },[])


    return (
        <>
        {userProfile? <div style={{maxWidth:"550px", margin:"0px auto"}}>
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
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {
                    userProfile.posts.map(item=>{
                        return(
                            <img key={item._id} className="item" src="https://www.zocalopublicsquare.org/wp-content/uploads/2016/04/Mathews-on-Trump-LEAD.jpg" alt={item.title}/>
                        )
                    })
                }
            </div>
        </div> : <h2>loading ...</h2>}
        </>
    )
}

export default Profile