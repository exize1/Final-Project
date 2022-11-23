import "./avatar.css"

const Avatar = ({src}) => {
    return(
        <div className="profile-picture-container">
            <img  className="img-thumbnail" src={src} alt="" />
        {/* <Image cloudName="diggwedxe" publicId={user.avatar.public_id} className="img-thumbnail"/> */}
            {/* <div className="profile-picture-editor-container">
                <div className="profile-picture-editor">
                    <FontAwesomeIcon icon="fa-pen" />
                </div>
            </div> */}
        </div>
    )
}

export default Avatar