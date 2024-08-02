import React, { useRef } from 'react';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import '../styles/NewMyPlaceToilet.css';
import InputToilet from '../components/InputToilet';
import { useNavigate } from 'react-router-dom';


const NewMyPlaceToilet = ({ addToilet }) => {
    const nav = useNavigate();

    const inputToiletRef = useRef();

    const handleSubmit = () => {
        if (inputToiletRef.current) {
            inputToiletRef.current.handleSubmit();
        }
    };

    return (
        <div className="NewMyPlaceToilet">
            <Header
                title={'내 장소 등록'}
                leftChild={<CustomButton onClick={() => nav(-1)} text={'취소'} />}
                rightChild={<CustomButton onClick={handleSubmit} text={'등록'} />}
            />
            <hr className='bar'/>
            <InputToilet ref={inputToiletRef} onRegister={addToilet} />
        </div>
    );
};

export default NewMyPlaceToilet;
