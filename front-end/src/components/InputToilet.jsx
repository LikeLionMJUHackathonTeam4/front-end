import { useState } from "react";
import '../styles/InputToilet.css';

//필수 요소 입력해야만 등록 가능하도록 & 등록 버튼 연결 (가능하면 팝업 or 바로 목록 이동)

const InputToilet = () => {
    const [values, setValues] = useState({
        name: '',
        location: '',
        password: '',
        opentime: '',
        toiletpaper: '',
        memo: '',
      });

    const handleChange = (e) => {
        setValues(prevValues => {
          const { name, value } = e.target;
            return {
                ...prevValues,
                [name]: value
            };
        })
    };

    return (
        <div className="InputToilet">
            <form className="inputFormToilet">
                <div className="inputName">
                    <p>화장실명</p>
                    <p className="necessary">(필수)</p>
                </div>
                <input className="name" required type="text" name="name" value={values.title} onChange={handleChange} placeholder="화장실의 이름을 입력해주세요" />

                <div className="inputName">
                <p>위치</p>
                <p className="necessary">(필수)</p>
                </div>
                <input className="location" required type="text" name="location" value={values.writer} onChange={handleChange} placeholder="여기를 눌러 주소를 입력해주세요" />

                <div className="inputName">
                <p>비밀번호</p>
                </div>
                <input className="password" type="text" name="password" value={values.content} onChange={handleChange} placeholder="비밀번호를 입력해주세요" />

                <div className="inputName">
                <p>개방시간</p>
                </div>
                <input className="opentime" type="text" name="opentime" value={values.content} onChange={handleChange} placeholder="개방시간을 입력해주세요" />

                <div className="inputName">
                <p>화장지 유무</p>
                </div>
                <input className="toiletpaper" type="text" name="toiletpaper" value={values.content} onChange={handleChange} placeholder="예) 내부 구비, 이용 상가에서 제공 등" />

                <div className="inputName">
                <p>메모</p>
                </div>
                <input className="memo" type="text" name="memo" value={values.content} onChange={handleChange} placeholder="자유롭게 메모를 입력해주세요" />
            </form>
        </div>
    )
}

export default InputToilet;