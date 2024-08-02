import React, { useRef } from 'react';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import '../styles/NewMyPlaceSmoking.css';
import InputSmoking from '../components/InputSmoking';

const NewMyPlaceSmoking = ({ addSmoking }) => {
    const inputSmokingRef = useRef();

    const handleSubmit = () => {
        if (inputSmokingRef.current) {
            inputSmokingRef.current.handleSubmit();
        }
    };

    return (
        <div className="NewMyPlaceSmoking">
            <Header
                title={'내 장소 등록'}
                leftChild={<CustomButton onClick={() => window.history.back()} text={'취소'} />}
                rightChild={<CustomButton onClick={handleSubmit} text={'등록'} />}
            />
            <hr className='bar'/>
            <InputSmoking ref={inputSmokingRef} onRegister={addSmoking} />
        </div>
    );
};

export default NewMyPlaceSmoking;
