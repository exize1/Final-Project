import "./avatar.css"

const Avatar = () => {
    return(
        <div className="profile-picture-container">
            <img  className="img-thumbnail" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
        {/* <Image cloudName="diggwedxe" publicId={user.avatar.public_id} className="img-thumbnail"/> */}
            <div className="profile-picture-editor-container">
                <div className="profile-picture-editor">
                    {/* <FontAwesomeIcon icon="fa-pen" /> */}
                </div>
            </div>
        </div>
    )
}

export default Avatar