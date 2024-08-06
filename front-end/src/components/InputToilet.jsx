import React, { useState, forwardRef, useImperativeHandle } from 'react';
import AddressSearch from '../components/AddressSearch';
import '../styles/InputToilet.css';

const InputToilet = forwardRef(({ onRegister }, ref) => {
    const [values, setValues] = useState({
        name: '',
        location: '',
        detailedLocation: '',
        password: '',
        opentime: '',
        toiletpaper: '',
        memo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleAddressSelect = (address) => {
        setValues(prevValues => ({
            ...prevValues,
            location: address
        }));
    };

    useImperativeHandle(ref, () => ({
        handleSubmit: () => {
            if (!values.name.trim() || !values.location.trim() || !values.detailedLocation.trim()) {
                alert('필수 필드를 모두 채워주세요.');
                return;
            }
            onRegister(values);
            setValues({
                name: '',
                location: '',
                detailedLocation: '',
                password: '',
                opentime: '',
                toiletpaper: '',
                memo: '',
            });
        }
    }));

    return (
        <div className="InputToilet">
            <form className="inputFormToilet">
                <div className="inputName">
                    <p>화장실명</p>
                    <p className="necessary">(필수)</p>
                </div>
                <input
                    className="name"
                    required
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="화장실의 이름을 입력해주세요"
                />
                <div className="inputName">
                    <p>위치</p>
                    <p className="necessary">(필수)</p>
                </div>
                <AddressSearch onAddressSelect={handleAddressSelect} />
                <input
                    className="location"
                    required
                    type="text"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                />
                <div className="inputName">
                    <p>상세 위치</p>
                    <p className="necessary">(필수)</p>
                </div>
                <input
                    className="detailedLocation"
                    type="text"
                    name="detailedLocation"
                    value={values.detailedLocation}
                    onChange={handleChange}
                    placeholder="상세 주소를 입력하세요. 예) 동, 층"
                />
                <div className="inputName">
                    <p>비밀번호</p>
                </div>
                <input
                    className="password"
                    type="text"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요"
                />
                <div className="inputName">
                    <p>개방시간</p>
                </div>
                <input
                    className="opentime"
                    type="text"
                    name="opentime"
                    value={values.opentime}
                    onChange={handleChange}
                    placeholder="개방시간을 입력해주세요"
                />
                <div className="inputName">
                    <p>화장지 유무</p>
                </div>
                <input
                    className="toiletpaper"
                    type="text"
                    name="toiletpaper"
                    value={values.toiletpaper}
                    onChange={handleChange}
                    placeholder="예) 내부 구비, 이용 상가에서 제공 등"
                />
                <div className="inputName">
                    <p>메모</p>
                </div>
                <input
                    className="memo"
                    type="text"
                    name="memo"
                    value={values.memo}
                    onChange={handleChange}
                    placeholder="자유롭게 메모를 입력해주세요"
                />
            </form>
        </div>
    );
});

export default InputToilet;
