import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Info from './pages/Info'
import Description from './pages/Description'
import Review from './pages/Review'
import NewReview from './pages/NewReview'
import EditReview from './pages/EditReview'
import MyPlace from './pages/MyPlace'
import MyPlaceSmoking from './pages/MyPlaceSmoking'
import SelectMyPlaceToilet from './pages/SelectMyPlaceToilet'
import SelectMyPlaceSmoking from './pages/SelectMyPlaceSmoking'
import NewMyPlaceToilet from './pages/NewMyPlaceToilet'
import NewMyPlaceSmoking from './pages/NewMyPlaceSmoking'
import EditMyPlaceToilet from './pages/EditMyPlaceToilet'
import EditMyPlaceSmoking from './pages/EditMyPlaceSmoking'

function App() {

  return (
    <>
      <Routes>
        {/* 홈화면 */}
        <Route path='/' element={<Home />} />
        {/* 검색화면 */}
        <Route path='/search' element={<Search />} />
        <Route path='/info' element={<Info />} />
        {/* 정보화면 */}
        <Route path='/description' element={<Description />} />
        {/* 후기화면 */}
        <Route path='/review' element={<Review />} />
        <Route path='/newreview' element={<NewReview />} />
        <Route path='/editreview' element={<EditReview />} />
        {/* 내 장소 목록 화면 */}
        <Route path='/myplace' element={<MyPlace />} />
        <Route path='/myplacesmoking' element={<MyPlaceSmoking />} />
        <Route path='/selectmyplacetoilet' element={<SelectMyPlaceToilet />} />
        <Route path='/selectmyplacesmoking' element={<SelectMyPlaceSmoking />} />
        <Route path='/newmyplacetoilet' element={<NewMyPlaceToilet />} />
        <Route path='/newmyplacesmoking' element={<NewMyPlaceSmoking />} />
        <Route path='/editmyplacetoilet' element={<EditMyPlaceToilet />} />
        <Route path='/editmyplacesmoking' element={<EditMyPlaceSmoking />} />
        {/* 마이페이지 화면
        <Route path='/mypage' element={<MyPage />} /> */}
      </Routes>
    </>
  )
}

export default App
