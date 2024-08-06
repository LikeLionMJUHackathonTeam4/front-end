import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import OAuthTest from './components/OAuthTest';
import initialToilets from './util/initialToilets';
import initialSmokings from './util/initialSmokings';

function App() {
    const [toilets, setToilets] = useState(initialToilets);
    const [smokings, setSmokings] = useState(initialSmokings);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('jwt'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

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
            setToken(localStorage.getItem('jwt'));
            setIsAuthenticated(true);
        }
    }, [user]);

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

    return (
        <>
            {!isAuthenticated ? (
                <OAuthTest setUser={setUser} setToken={setToken} />
            ) : (
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/info' element={<Info />} />
                    <Route path='/description' element={<Description />} />
                    <Route path='/review' element={<Review />} />
                    <Route path='/newreview' element={<NewReview />} />
                    <Route path='/editreview' element={<EditReview />} />
                    <Route path='/myplace' element={<MyPlace toilets={toilets} onDeleteToilet={deleteToilet} />} />
                    <Route path='/myplacesmoking' element={<MyPlaceSmoking smokings={smokings} onDeleteSmoking={deleteSmoking} />} />
                    <Route path='/selectmyplacetoilet' element={<SelectMyPlaceToilet />} />
                    <Route path='/selectmyplacesmoking' element={<SelectMyPlaceSmoking />} />
                    <Route path='/newmyplacetoilet' element={<NewMyPlaceToilet addToilet={addToilet} />} />
                    <Route path='/newmyplacesmoking' element={<NewMyPlaceSmoking addSmoking={addSmoking} />} />
                    <Route path='/editmyplacetoilet/:id' element={<EditMyPlaceToilet toilets={toilets} onUpdateToilet={updateToilet} />} />
                    <Route path='/editmyplacesmoking/:id' element={<EditMyPlaceSmoking smokings={smokings} onUpdateSmoking={updateSmoking} />} />
                    <Route path='/mypage' element={<MyPage user={user} />} />
                    <Route path='/editmyprofile' element={<EditMyProfile user={user} setUser={setUser} token={token} setToken={setToken} />} />
                    <Route path='/myreviewlist' element={<MyReviewList />} />
                    <Route path='/myreviewlistsmoking' element={<MyReviewListSmoking />} />
                </Routes>
            )}
        </>
    );
}

export default App;
