import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const Stars = ({ rating, onStarClick }) => {
    const ARRAY = [0, 1, 2, 3, 4];
    const [score, setScore] = useState([false, false, false, false, false]);
    
    // Update score state based on rating prop
    useEffect(() => {
        const updatedScore = ARRAY.map(index => index <= rating - 1);
        setScore(updatedScore);
    }, [rating]);

    const handleStarClick = (index) => {
        if (onStarClick) {
            onStarClick(index + 1); // Pass 1-based index to onStarClick
        }
    };

    return (
        <div>
            {ARRAY.map((el, index) => (
                <div key={index} style={{ display: 'inline-block', marginRight: index < ARRAY.length - 1 ? '15px' : '0px' }}>
                    <FaStar
                        size="35"
                        color={score[index] ? "#2CB3FF" : "#E0E0E0"}
                        onClick={() => handleStarClick(index)}
                        style={{ cursor: 'pointer', marginRight: index < ARRAY.length - 1 ? '15px' : '0px' }}
                    />
                </div>
            ))}
            {rating > 0 && (
            <div className='scoreIndex'>
                <p style={{ marginTop: '25px' }}>{rating} </p>
            </div>
            )}
            <p>/ 5</p>
        </div>
    );
};

export default Stars;