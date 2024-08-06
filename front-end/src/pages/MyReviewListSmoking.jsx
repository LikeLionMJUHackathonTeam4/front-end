import "../styles/MyReviewListSmoking.css";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const MyReviewListSmoking = () => {
    const navigate = useNavigate();

    return (
        <div className="MyReviewListSmoking">
            <Header
                title='내가 작성한 후기'
                leftChild={
                    <CustomButton
                        onClick={() => navigate('/mypage')}
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

             <div className='choosePlace'>
                <p className='Mytoilet' onClick={() => navigate('/myreviewlist')}>화장실</p>
                <p className='Mysmoking' onClick={() => navigate('/myreviewlistsmoking')}>흡연구역</p>
            </div>
            <div className='nav-bar'>
                <svg width="478" height="3" viewBox="0 0 478 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="1" x2="478.004" y2="1" stroke="#E9E9EB" strokeWidth="2"/>
                    <path d="M342 2L374 2" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>

            <div className='sort-bar'>
                <select>
                    <option>최신순</option>
                    <option>별점높은순</option>
                    <option>별점낮은순</option>
                </select>

            </div>

            <hr className='bar'/>
        </div>
    )
}

export default MyReviewListSmoking;