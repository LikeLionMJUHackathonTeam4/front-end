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
import axios from 'axios';


function App() {
    const [toilets, setToilets] = useState(initialToilets);
    const [smokings, setSmokings] = useState(initialSmokings);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);  // Kakao 지도 API 로드 상태

    const navigate = useNavigate();

    const endpoint = import.meta.env.VITE_BE_ENDPOINT;
    const baseUrl = `${endpoint}/api`;

    // const handleCallback = async () => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const code = urlParams.get('code');
    
    //     if (code) {
    //     try {
    //         // 카카오 로그인 콜백 처리
    //         const token = await kakaoLoginCallback(code);
    //         localStorage.setItem('token', token); // JWT 대신 token으로 통일
    //         setToken(token);
            
    //         // 사용자 정보 가져오기
    //         const userData = await getUserInfo(token);
    //         setUser(userData);
    //         // setLoginStatus('Login successful!');
    //         navigate('/'); // 로그인 후 메인 페이지로 리디렉션
    //     } catch (error) {
    //         console.error('Error during callback handling:', error);
    //         // setLoginStatus(Login failed: ${error.response?.data?.message || 'Unknown error'});
    //     }
    //     }
    // };
    
    // useEffect(() => {
    //     handleCallback();
    // }, []);

    useEffect(() => {
        // 화장실 목록을 가져오는 함수
        const fetchToilets = async () => {
            try {
                const config = {
                    // 토큰을 Authorization 헤더에 포함
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json' // 기본 Content-Type
                    }
                };
                // GET 요청을 통해 화장실 목록 조회
                const response = await axios.get(`${baseUrl}/my/toilet/all`, config);
                // 서버로부터 받은 데이터를 상태로 설정
                setToilets(response.data.data);
            } catch (error) {
                // 에러 발생 시 에러 상태 설정
                console.error('Error fetching toilets:', error);
                setError(error);
            } finally {
                // 로딩 상태 종료
                setLoading(false);
            }
        };

        if (token) {
            fetchToilets();
        }
    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            console.log("app.jsx - 로그인되어 있음.");
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            console.log("app.jsx - 로그인되어 있지 않음.");
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

    // useEffect(() => {
    //     if (user) {
    //         localStorage.setItem('user', JSON.stringify(user));
    //         setToken(localStorage.getItem('token'));
    //         setIsAuthenticated(true);
    //     }
    // }, [user]);

    useEffect(() => {
        // Kakao 지도 API 스크립트를 비동기로 로드
        const loadKakaoMapScript = () => {
            return new Promise((resolve, reject) => {
                const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
                const script = document.createElement('script');
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&autoload=false&libraries=services`;  // autoload=false 옵션 사용
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

    const addToilet = async (newToilet) => {
        try {
            const config = {
                // 토큰을 Authorization 헤더에 포함
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json' // 기본 Content-Type
                }
            };

            // axios POST 요청
            const response = await axios.post(`${baseUrl}/my/toilet/save`, newToilet, config);

            // 성공적으로 백엔드에 저장된 경우
            console.log('Toilet saved successfully:', response.data);

            // 상태 업데이트 및 페이지 이동
            setToilets(prevToilets => [...prevToilets, newToilet]);
            navigate('/myplace');
        } catch (error) {
            // 에러 처리
            console.error('Error saving toilet:', error);
            if (error.response) {
                // 서버가 응답을 했지만, 요청이 성공하지 못한 경우
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            } else if (error.request) {
                // 요청이 전송되었지만, 서버로부터 응답이 없는 경우
                console.error('Request made but no response received:', error.request);
            } else {
                // 요청을 설정하는 중에 에러가 발생한 경우
                console.error('Error in setting up request:', error.message);
            }
        }
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
                <Route path='/myplace' element={<MyPlace user={user} toilets={toilets} onDeleteToilet={deleteToilet} isAuthenticated={isAuthenticated} />} />
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
                <Route path='/auth' element={<Auth setUser={setUser} setToken={setToken} setRefreshToken={setRefreshToken} setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </div>
    );
}

export default App;