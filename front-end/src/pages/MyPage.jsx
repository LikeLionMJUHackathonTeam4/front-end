import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import "../styles/MyPage.css"
const MyPage = () => {
    const name="김멋사"
    const email="likelion@kakao.com"

    return (
        <div className="MyPage">
            <Header
                title='마이페이지'
                leftChild={
                    <CustomButton
                        onClick={() => navigate(-1)}
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
            />
            
            <div className="profile">
                <svg className="myimg" width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3984 52.6456C16.0459 48.764 19.8926 46.0416 24.3751 46.0416H40.6251C45.1076 46.0416 48.9542 48.7641 50.6018 52.6456M43.3334 25.7291C43.3334 31.7122 38.4832 36.5625 32.5001 36.5625C26.517 36.5625 21.6667 31.7122 21.6667 25.7291C21.6667 19.746 26.517 14.8958 32.5001 14.8958C38.4832 14.8958 43.3334 19.746 43.3334 25.7291ZM59.5834 32.5C59.5834 47.4577 47.4578 59.5833 32.5001 59.5833C17.5424 59.5833 5.41675 47.4577 5.41675 32.5C5.41675 17.5422 17.5424 5.41663 32.5001 5.41663C47.4578 5.41663 59.5834 17.5422 59.5834 32.5Z" stroke="#2CB3FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className="myName">
                    {name}
                </div>
                <div className="myEmail">
                    {email}
                </div>
            </div>
        </div>
    )
}

export default MyPage;