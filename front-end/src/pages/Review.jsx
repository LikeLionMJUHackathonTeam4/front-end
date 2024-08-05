import '../styles/Review.css'
import { Link } from 'react-router-dom'
import backIcon from '../image/back.svg'
import profileIcon from '../image/profile.svg'

const Review = () => {
    return (
        <>
            <div className='Review-Back'>
                <Link to='/info' className='backIcon'>
                    <img src={backIcon} />
                </Link>
                <div className='ReviewTitle'>
                    <p>봉천역 개방화장실</p>
                </div>
            </div>
            <div className='Review-Navbar'>
                <Link to='/description' className='Description-off'>정보</Link>
                <Link to='/review' className='Review-on'>후기</Link>
            </div>
            <div className='Review-NavbarLine'>
                <svg width="478" height="3" viewBox="0 0 478 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="1" x2="478.004" y2="1" stroke="#E9E9EB" strokeWidth="2"/>
                    <path d="M342 2L374 2" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
            <div className='Sorting'>
                <select>
                    <option>최신순</option>
                    <option>별점높은순</option>
                    <option>별점낮은순</option>
                </select>
                <Link to='/newreview' className='goNewReview'>후기쓰기</Link>
            </div>
            <div className='review-score'>
                <p>몇 점</p>
                <div>대충 별이 들어갈 자리</div>
            </div>
            <div className='ReviewList'>
                <img src={profileIcon} />
                <div className='content'>
                    <p className='nickname'>닉넴</p>
                    <div className='day'>
                        <div>별별별</div>
                        <p>| 날짜</p>
                    </div>
                    <p>~후기 내용~</p>
                </div>
                <div className='review-button'>
                    <Link to='/editreview' className='goToEditReview'>수정</Link>
                    <button>삭제</button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Review;