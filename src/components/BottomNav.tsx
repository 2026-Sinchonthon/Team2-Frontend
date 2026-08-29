import { NavLink } from "react-router-dom";
import iconHome from "../assets/icons/home.svg";
import iconMypage from "../assets/icons/mypage.svg";
import iconRanking from "../assets/icons/ranking.svg";

const TABS = [
  { to: "/mypage", label: "마이페이지", icon: iconMypage },
  { to: "/", label: "홈", icon: iconHome, end: true },
  { to: "/ranking", label: "랭킹", icon: iconRanking },
];

function BottomNav() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-20 flex h-[64px] items-center justify-around border-t border-gray-100 bg-white">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className="flex flex-col items-center justify-center"
        >
          {({ isActive }) => (
            <img
              src={tab.icon}
              alt={tab.label}
              className={`h-[22px] w-[22px] object-contain ${
                isActive ? "opacity-100" : "opacity-30"
              }`}
            />
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
