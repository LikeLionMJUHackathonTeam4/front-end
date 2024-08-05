import Header from "../components/Header";
import CustomButton from '../components/CustomButton'
import '../styles/NewMyPlaceToilet.css';
import InputToilet from "../components/InputToilet";

const NewMyPlaceToilet = () => {
    return (
        <div className="NewMyPlaceToilet">
            <Header
                title={'내 장소 등록'}
                leftChild={<CustomButton onClick={() => nav(-1)} text={'취소'} />}
                rightChild={<CustomButton text={'등록'} />}
            />
            <hr className='bar'/>
            <InputToilet />
        </div>
    )
}

export default NewMyPlaceToilet;