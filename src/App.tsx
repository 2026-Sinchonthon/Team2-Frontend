import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import MyPage from "./pages/MyPage";
import Ranking from "./pages/Ranking";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import RankingPage from "./pages/Rank/RankingPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRestaurant />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rank" element={<RankingPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
