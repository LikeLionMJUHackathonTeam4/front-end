import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { Link } from 'react-router-dom'
import Stars from '../components/Stars'
import { useRef } from 'react';


const EditReview = () => {
    const inputReviewRef = useRef();

    const reviewSubmit = () => {
        if(inputReviewRef.current) {
            inputReviewRef.current.reviewSubmit();
        }
    }

    return (
        <>
            <div className="EditReview-top">
                <Header
                    title={'봉천역 개방화장실'}
                    leftChild={<Link to='/review'>취소</Link>}
                    rightChild={<CustomButton onClick={reviewSubmit} text={'등록'} />}
                />
                <hr className='bar'/>
                <Stars />
                <hr className='bar'/>
                {/* 리뷰 내용 작성 */}
            </div>
        </>
    )
}

export default EditReview;