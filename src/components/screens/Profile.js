import React, {useEffect, useState, useContext} from "react";
import {UserContext} from '../../App'

const Profile = () => {
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch('/mypost',{
        headers:{
            "Authorization":"Bearer " + localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        setPics(result.mypost)
    })
    },[])

    
    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
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
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:"loading"} followers</h6>
                        <h6>{state?state.following.length:"loading"} following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src="https://www.zocalopublicsquare.org/wp-content/uploads/2016/04/Mathews-on-Trump-LEAD.jpg" alt={item.title}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile