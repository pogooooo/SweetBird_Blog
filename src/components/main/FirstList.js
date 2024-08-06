import {Link} from "react-router-dom";

function FirstList({id, bgImg, title, userImg, userName, date}) {
    const bgStyle = bgImg ? {backgroundImage: `url(${bgImg})`} : {};
    const profileStyle = userImg ? {backgroundImage: `url(${userImg})`} : null;
    return (
        <Link to={`posts/${id}`} style={bgStyle} className="Main_thumbnail_img">
            <div className="Main_thumbnail_background">
                <div className="Main_thumbnail_writer">
                    <div style={profileStyle} className="thumbnail_writerProfile"></div>
                    <div>{userName}</div>
                </div>
                <div className="Main_thumbnail_write">
                    <div>[Main] {title}</div>
                    <div className="Main_thumbnail_date">{date}</div>
                </div>
            </div>
        </Link>
    );
}

export default FirstList;