import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../styles/CustomButton.css';

const CustomButton = ({text, onClick}) => {
    return (
        <>
            <Button variant="outline-primary" className="button" onClick={onClick}>{text}</Button>{' '}
        </>
    )
}

export default CustomButton;
