import './closeFriend.css'

const CloseFriend = ({user}) => {
    return (
        <li className="sidebarFriend">
        <img className="sidebarFriendImg" alt="" src={user.profilePicture}/>
           <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default CloseFriend
