import { Link } from "react-router";

const navs = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Books",
    path: "/books",
  },
];

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center gap-10 ">
        {navs.map((nav, index) => (
          <Link to={nav.path} key={index} className="text-xl">
            {nav.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
