import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Info from './pages/Info';
import Description from './pages/Description';
import Review from './pages/Review';
import NewReview from './pages/NewReview';
import EditReview from './pages/EditReview';
import MyPlace from './pages/MyPlace';
import MyPlaceSmoking from './pages/MyPlaceSmoking';
import SelectMyPlaceToilet from './pages/SelectMyPlaceToilet';
import SelectMyPlaceSmoking from './pages/SelectMyPlaceSmoking';
import NewMyPlaceToilet from './pages/NewMyPlaceToilet';
import NewMyPlaceSmoking from './pages/NewMyPlaceSmoking';
import EditMyPlaceToilet from './pages/EditMyPlaceToilet';
import EditMyPlaceSmoking from './pages/EditMyPlaceSmoking';
import MyPage from './pages/MyPage';
import EditMyProfile from './pages/EditMyProfile';
import MyReviewList from './pages/MyReviewList';
import MyReviewListSmoking from './pages/MyReviewListSmoking';
import initialToilets from './util/initialToilets';
import initialSmokings from './util/initialSmokings';
import LoginPage from './pages/LoginPage';
import Auth from './components/Auth';

function App() {
    const [toilets, setToilets] = useState(initialToilets);
    const [smokings, setSmokings] = useState(initialSmokings);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);  // Kakao 지도 API 로드 상태

    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [setToken]);    

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setToken(localStorage.getItem('token'));
            setIsAuthenticated(true);
        }
    }, [user]);

    useEffect(() => {
        // Kakao 지도 API 스크립트를 비동기로 로드
        const loadKakaoMapScript = () => {
            return new Promise((resolve, reject) => {
                const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
                const script = document.createElement('script');
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&autoload=false`;  // autoload=false 옵션 사용
                script.onload = () => {
                    window.kakao.maps.load(() => { // Kakao API가 완전히 로드된 후에 실행
                        setIsKakaoLoaded(true);
                        resolve();
                    });
                };
                script.onerror = () => reject(new Error('Kakao Map API script failed to load'));
                document.head.appendChild(script);
            });
        };

        loadKakaoMapScript().catch(err => {
            console.error('Kakao Maps API 로드 실패:', err);
        });
    }, []);

    if (!isKakaoLoaded) {
        return <div>Loading Kakao Maps...</div>;
    }

    const addToilet = (newToilet) => {
        setToilets(prevToilets => [...prevToilets, newToilet]);
        navigate('/myplace');
    };

    const addSmoking = (newSmoking) => {
        setSmokings(prevSmokings => [...prevSmokings, newSmoking]);
        navigate('/myplacesmoking');
    };

    const updateToilet = (updatedToilet) => {
        setToilets(prevToilets =>
            prevToilets.map(toilet =>
                toilet.id === updatedToilet.id ? updatedToilet : toilet
            )
        );
    };

    const updateSmoking = (updatedSmoking) => {
        setSmokings(prevSmokings =>
            prevSmokings.map(smoking =>
                smoking.id === updatedSmoking.id ? updatedSmoking : smoking
            )
        );
    };

    const deleteToilet = (id) => {
        setToilets(prevToilets => prevToilets.filter(toilet => toilet.id !== id));
    };

    const deleteSmoking = (id) => {
        setSmokings(prevSmokings => prevSmokings.filter(smoking => smoking.id !== id));
    };

    const addReview = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]);
    };

    // if (!isAuthenticated) {
    //     return <OAuthTest setUser={setUser} setToken={setToken} />;
    // }

    return (
        <div className="app-container">
            <Routes>
                <Route path='/' element={<Home isAuthenticated={isAuthenticated}/>} />
                <Route path='/search' element={<Search />} />
                <Route path='/info' element={<Info />} />
                <Route path='/description' element={<Description />} />
                <Route path='/review' element={<Review reviews={reviews} />} />
                <Route path='/newreview' element={<NewReview addReview={addReview} />} />
                <Route path='/editreview' element={<EditReview />} />
                <Route path='/myplace' element={<MyPlace toilets={toilets} onDeleteToilet={deleteToilet} isAuthenticated={isAuthenticated} />} />
                <Route path='/myplacesmoking' element={<MyPlaceSmoking smokings={smokings} onDeleteSmoking={deleteSmoking} isAuthenticated={isAuthenticated} />} />
                <Route path='/selectmyplacetoilet' element={<SelectMyPlaceToilet isAuthenticated={isAuthenticated}/>} />
                <Route path='/selectmyplacesmoking' element={<SelectMyPlaceSmoking isAuthenticated={isAuthenticated}/>} />
                <Route path='/newmyplacetoilet' element={<NewMyPlaceToilet addToilet={addToilet} isAuthenticated={isAuthenticated}/>} />
                <Route path='/newmyplacesmoking' element={<NewMyPlaceSmoking addSmoking={addSmoking} isAuthenticated={isAuthenticated}/>} />
                <Route path='/editmyplacetoilet/:id' element={<EditMyPlaceToilet toilets={toilets} onUpdateToilet={updateToilet} isAuthenticated={isAuthenticated}/>} />
                <Route path='/editmyplacesmoking/:id' element={<EditMyPlaceSmoking smokings={smokings} onUpdateSmoking={updateSmoking} isAuthenticated={isAuthenticated}/>} />
                <Route path='/mypage' element={<MyPage user={user} isAuthenticated={isAuthenticated}/>} />
                <Route path='/editmyprofile' element={<EditMyProfile user={user} setUser={setUser} token={token} setToken={setToken} isAuthenticated={isAuthenticated}/>} />
                <Route path='/myreviewlist' element={<MyReviewList isAuthenticated={isAuthenticated}/>} />
                <Route path='/myreviewlistsmoking' element={<MyReviewListSmoking isAuthenticated={isAuthenticated}/>} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/auth' element={<Auth setUser={setUser} setToken={setToken} />} />
            </Routes>
        </div>
    );
}

export default App;