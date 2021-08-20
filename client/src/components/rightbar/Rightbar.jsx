import "./rightbar.css";
import {User} from "../../Dummy";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user:currentUser, dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))

    useEffect(()=>{
        setFollowed(currentUser.followings.includes(user?.id))
                        
        },[currentUser])
    useEffect(() => {
        const getFriends = async () =>{
            try{
                const friendList = await axios.get("/users/friends/"+user._id)
                setFriends(friendList.data);
            }catch(err){
                console.log(err)
            }
        };
        getFriends();
        
        },[user])
    
    const handleClick = async() =>{
        try{
            if(followed){
                await axios.put("/users/"+user._id+"/unfollow", {userId:currentUser._id});
                dispatch({type:"UNFOLLOW",payload:user._id})
            }else{
                await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
                dispatch({type:"FOLLOW",payload:user._id})
            }
        }catch(err){
            console.log(err)
        }
        setFollowed(!followed)
    }
    

    const HomeRightBar = () => {
        const PF = process.env.REACT_APP_PUBLIC_FOLDER;
        return(
        <>
       
        <div className="bdayContainer">
                    <img src={`${PF}gift.png`} alt="" className="bdayImg" />
                    <span className="bdayText">
                        <b>Dahani Mishana</b> and <b>49 other friends</b> have their birthday today
                    </span>
                </div>
                <img src="assets/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {User.map(u =>(
                        <Online key={u.id} user={u}/>
                    ))}     
                </ul>
        </>
        )}
    const ProfileRightbar = () =>{
        const PF = process.env.REACT_APP_PUBLIC_FOLDER;
        return(
            <>
             {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow" }
                    {followed ? <Remove/> : <Add/>}
                    Follow
                </button>
            )}
            
            <h5 className="rightbarTitle">User Information</h5>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfokey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfokey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfokey">Relationship:</span>
                    <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
                </div>
            </div>
            <h5 className="rightbarTitle">User Friends</h5>
            <div className="rightBarFollowings">
                {friends.map((friend) => (
                    <Link to = {"/profile/"+friend.username} style = {{textDecoration:"none"}}>
                    <div className="rightBarFollowing">
                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
                     alt="" className="rightBarFollowingImg" />
                    <span className="rightBarFollowingName">{friend.username}</span>
                </div>
                </Link>
                ))}
                
            </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightBar />}
            </div>
        </div>
    )
}
