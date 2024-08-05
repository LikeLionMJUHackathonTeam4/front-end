import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom'

const MyPage = () => {
    const location = useLocation();

    return (
        <div>
            <Navbar currentPath={location.pathname} />
        </div>
    )
}

export default MyPage;