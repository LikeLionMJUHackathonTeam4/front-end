import '../styles/NewReview.css'
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'
import { Link, useNavigate } from 'react-router-dom'
import Stars from '../components/Stars'
import { useState } from 'react'

const NewReview = ({ addReview }) => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleStarClick = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };

    const reviewSubmit = () => {
        if (rating > 0 && reviewText.trim()) {
            addReview({ rating, text: reviewText });
            navigate('/review');
        } else {
            alert('별점과 후기를 모두 작성해 주세요.');
        }
    };

    return (
        <>
            <div className="EditReview-top">
                <Header
                    title={'봉천역 개방화장실'}
                    leftChild={<Link to='/review'>취소</Link>}
                    rightChild={<CustomButton onClick={reviewSubmit} text={'등록'} />}
                />
                <hr className='bar'/>
                <Stars rating={rating} onStarClick={handleStarClick} />
                <hr className='bar'/>
                <div className="review-content">
                    <textarea
                        value={reviewText}
                        onChange={handleReviewChange}
                        className="review-textarea"
                        placeholder="후기를 작성해 주세요..."
                    />
                </div>
            </div>
        </>
    )
}
export default NewReview;