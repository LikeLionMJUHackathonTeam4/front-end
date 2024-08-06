import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import "../styles/EditMyProfile.css";

const EditMyProfile = ({ user, setUser, token, setToken }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(user.nickname || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setNickname(user.nickname || '');
  }, [user.nickname]);

  const handleNicknameChange = (e) => {
    const input = e.target.value;
    const length = input.replace(/[^\x00-\xff]/g, '**').length;

    if (/^[a-zA-Z0-9가-힣]*$/.test(input) && length <= 20) {
      setNickname(input);
      setError('');
    } else {
      setError('닉네임은 20자 이하로 입력해야 합니다.');
    }
  };

  const handleSave = async () => {
    try {
      // Assuming `setUser` is async; handle it accordingly.
      const updatedUser = { ...user, nickname };
      await setUser(updatedUser);
      navigate('/mypage');
    } catch (error) {
      setError('프로필 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="EditMyProfile">
      <Header
        title='프로필 수정'
        leftChild={
          <CustomButton
            onClick={() => navigate(-1)}
            text={
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 13 24" fill="none">
                <path d="M10.752 23.994L0.87897 14.121C0.316556 13.5584 0.000610352 12.7955 0.000610352 12C0.000610352 11.2045 0.316556 10.4415 0.87897 9.87896L10.746 0.0119629L12.16 1.42596L2.29297 11.293C2.1055 11.4805 2.00018 11.7348 2.00018 12C2.00018 12.2651 2.1055 12.5194 2.29297 12.707L12.166 22.58L10.752 23.994Z" fill="black"/>
              </svg>
            }
          />
        }
        rightChild={<CustomButton text='저장' onClick={handleSave} />}
      />
      <UserProfile user={{ ...user, nickname }} />
      <hr className='bar' />
      <div className="edit-container">
        <div className="nicknameEdit">
          <strong>닉네임 변경</strong>
          <div className="input-container">
            <input
              className="Input"
              type="text"
              placeholder="공백 포함 한글 10자, 영문 20자 이내"
              value={nickname}
              onChange={handleNicknameChange}
            />
            {error && <p className="error">{error}</p>}
            <CustomButton text="중복확인" />
          </div>
        </div>
        <div className="imgEdit">
          <strong>프로필 사진 변경</strong>
          <div className="img-container">
            <CustomButton text="변경" />
            <CustomButton text="삭제" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMyProfile;
