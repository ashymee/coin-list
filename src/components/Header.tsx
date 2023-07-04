import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    url: "/",
    name: "Home",
  },
  {
    url: "/coin-list",
    name: "Coin List",
  },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <div className="flex-none h-[123px] w-full bg-[#FFFFFF] shadow-lg flex items-end pl-56 gap-x-5">
      {links.map((item, index) => (
        <Link
          key={index}
          to={item.url}
          className={classNames(
            "pb-1 border-b-4 ",
            pathname === item.url
              ? "text-[#2569A5] font-bold border-[#2569A5]"
              : "text-[#8597AC] border-transparent hover:text-[#2569A5]"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
