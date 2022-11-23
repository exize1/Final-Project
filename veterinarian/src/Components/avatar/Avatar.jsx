import "./avatar.css"

const Avatar = ({src}) => {
    return(
        <div className="profile-picture-container">
            <img  className="img-thumbnail" src={src} alt="" />
        </div>
    )
}

export default Avatar