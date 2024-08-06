import {Link} from "react-router-dom";

function OtherList({id, bgImg, title, userImg, userName, date}) {
    const bgStyle = bgImg ? {backgroundImage: `url(${bgImg})`} : {};
    const profileStyle = userImg ? {backgroundImage: `url(${userImg})`} : {backgroundImage: `url(/default-profile.png)`}; // 기본 이미지 경로로 변경

    return (
        <Link to={`posts/${id}`} style={bgStyle} className="Main_border_img">
            <div className="Main_border_background">
                <div className="Main_border_writer">
                    <div style={profileStyle} className="border_writerProfile"></div>
                    <div className="border_writerName">{userName}</div>
                </div>
                <div>
                    <div className="Main_border_title">{title}</div>
                    <div className="Main_border_date">{date}</div>
                </div>
            </div>
        </Link>
    );
}

export default OtherList;