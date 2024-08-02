import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import '../styles/EditMyPlaceToilet.css';

const EditMyPlaceToilet = ({ toilets, onUpdateToilet }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [toilet, setToilet] = useState({
        name: '',
        location: '',
        detailedLocation: '',
        description: '',
        password: '',
        opentime: '',
        toiletpaper: '',
        memo: '',
    });

    useEffect(() => {
        const selectedToilet = toilets.find(toilet => toilet.id === id);
        if (selectedToilet) {
            setToilet(selectedToilet);
        } else {
            navigate('/myplace');
        }
    }, [id, toilets, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setToilet(prevToilet => ({
            ...prevToilet,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateToilet(toilet);
        navigate('/myplace');
    };

    return (
        <div className="EditMyPlaceToilet">
            <Header
                title='내 장소 수정'
                leftChild={
                    <CustomButton
                        text={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="20"
                                viewBox="0 0 13 24"
                                fill="none"
                            >
                                <path
                                    d="M10.752 23.994L0.87897 14.121C0.316556 13.5584 0.000610352 12.7955 0.000610352 12C0.000610352 11.2045 0.316556 10.4415 0.87897 9.87896L10.746 0.0119629L12.16 1.42596L2.29297 11.293C2.1055 11.4805 2.00018 11.7348 2.00018 12C2.00018 12.2651 2.1055 12.5194 2.29297 12.707L12.166 22.58L10.752 23.994Z"
                                    fill="black"
                                />
                            </svg>
                        }
                        onClick={() => navigate(-1)}
                    />
                }
                rightChild={
                    <CustomButton
                        text='완료'
                        onClick={handleSubmit}
                    />
                }
            />

            <hr className='bar'/>

            <form className='forms' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>화장실명</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={toilet.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>위치</label>
                    <input
                        type='text'
                        id='location'
                        name='location'
                        value={toilet.location}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='detailedLocation'>상세 위치</label>
                    <input
                        type='text'
                        id='detailedLocation'
                        name='detailedLocation'
                        value={toilet.detailedLocation}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>비밀번호</label>
                    <input
                        type='text'
                        id='password'
                        name='password'
                        value={toilet.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='opentime'>개방시간</label>
                    <input
                        type='text'
                        id='opentime'
                        name='opentime'
                        value={toilet.opentime}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='toiletpaper'>휴지 유무</label>
                    <input
                        type='text'
                        id='toiletpaper'
                        name='toiletpaper'
                        value={toilet.toiletpaper}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='memo'>메모</label>
                    <textarea
                        id='memo'
                        name='memo'
                        value={toilet.memo}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditMyPlaceToilet;
