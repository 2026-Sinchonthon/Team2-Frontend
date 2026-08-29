import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import MyPage from "./pages/MyPage";

import MyActivity from "./pages/MyActivity";
import LikedRestaurants from "./pages/LikedRestaurants";
import MyPosts from "./pages/MyPosts";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import RankingPage from "./pages/Rank/RankingPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRestaurant />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/rank" element={<RankingPage />} />
        <Route path="/mypage/activity" element={<MyActivity />} />
        <Route path="/mypage/liked" element={<LikedRestaurants />} />
        <Route path="/mypage/posts" element={<MyPosts />} />
      </Route>
      <Route element={<AuthLayout />}>
    
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
