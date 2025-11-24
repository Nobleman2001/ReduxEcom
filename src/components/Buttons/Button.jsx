import { FaCartArrowDown, FaRegHeart, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router";
const buttons = [
  { title: "Wishlist", icon: <FaRegHeart />, path: "/wishlist" },
  { title: "Cart", icon: <FaCartArrowDown />, path: "/cart" },
  { title: "Login", icon: <FaUser />, path: "/login" },
];

const Button = () => {
  return (
    <div className="flex items-center gap-20">
      <div className="flex items-center border-2 border-gray-400 p-2 rounded-sm focus-within:border-[#d53e4f]">
        <input type="text" placeholder="Search books using writer name, books...." className="outline-none  w-2xl px-5" />
        <FaSearch className="text-gray-500" />
      </div>
      <div className="flex items-center gap-5">
        {buttons.map((btn, index) => (
          <Link key={index} to={btn.path} className="text-md flex items-center gap-2 hover:text-[#d53e4f]">
            <span className="text-gray-400">{btn.icon} </span>
            {btn.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Button;
