import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/layouts/Layout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import RankingPage from "./pages/Rank/RankingPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rank" element={<RankingPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
