import React, { useState } from 'react';
import '../styles/MyPlaceSmoking.css';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const MyPlaceSmoking = ({ smokings, onDeleteSmoking }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSmokingId, setSelectedSmokingId] = useState(null);
    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/editmyplacesmoking/${id}`);
    };

    const handleDeleteClick = (id) => {
        setSelectedSmokingId(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSmokingId(null);
    };

    const handleConfirmDelete = () => {
        onDeleteSmoking(selectedSmokingId);
        handleCloseModal();
    };

    return (
        <div className="MyPlaceSmoking">
            <Header
                title='내 장소 목록'
                leftChild={
                    <CustomButton
                        onClick={() => navigate('/')}
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
                    />
                }
                rightChild={<CustomButton onClick={() => navigate('/newmyplacesmoking')} text='추가' />}
            />

            <div className='choosePlace'>
                <p
                    className='myToilet'
                    onClick={() => navigate('/myplace')}
                >
                    화장실
                </p>
                <p
                    className='mySmoking'
                    onClick={() => navigate('/myplacesmoking')}
                >
                    흡연구역
                </p>
            </div>
            <div className='nav-bar'>
                <svg width="478" height="3" viewBox="0 0 478 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="1" x2="478.004" y2="1" stroke="#E9E9EB" strokeWidth="2"/>
                    <path d="M342 2L374 2" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>

            <div className='sort-bar'>
                <select>
                    <option>등록순</option>
                    <option>이름순</option>
                    <option>가까운순</option>
                </select>
            </div>

            <hr className='bar'/>

            {smokings.length === 0 ? (
                <p>저장된 흡연구역이 없습니다.</p>
            ) : (
                smokings.map(smoking => (
                    <div key={smoking.id} className='place'>
                        <p>{smoking.name}</p>
                        <p>{smoking.location}</p>
                        <p>{smoking.detailedLocation}</p>
                        <div className='buttons'>
                            <CustomButton 
                                text='수정' 
                                onClick={() => handleEditClick(smoking.id)} 
                            />
                            <CustomButton 
                                text='삭제' 
                                onClick={() => handleDeleteClick(smoking.id)} 
                            />
                        </div>
                    </div>
                ))
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirmDelete} 
            />
        </div>
    );
};

export default MyPlaceSmoking;
