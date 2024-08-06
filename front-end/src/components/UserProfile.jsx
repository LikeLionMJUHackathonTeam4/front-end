// UserProfile.js
import React from 'react';
import '../styles/UserProfile.css'; // UserProfile 스타일 파일

const UserProfile = ({ user }) => {
    console.log(user); // user 값 확인
    if (!user) {
        return <div>사용자 정보를 불러오는 중...</div>;
    }

    return (
        <div className="UserProfile">
            <img src={user.profileImageUrl} alt={user.nickname} />
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
        </div>
    );
}

export default UserProfile;
