import { useState } from "react";
import { Link } from "react-router";

const buttons = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "General Books",
    path: "/general-books",
  },
  {
    title: "Academic",
    path: "/academic-books",
  },
  {
    title: "Subject",
    path: "/subject",
  },
  {
    title: "Author",
    path: "/author",
  },
  {
    title: "Publisher",
    path: "/publisher",
  },
  {
    title: "Preorder",
    path: "/preorder",
  },
];
const Filterbutton = () => {
  const [activeIndex,setActiveIndex] = useState(0)
  return (
    <div className="flex items-center max-w-5xl mx-auto justify-between my-5">
      {buttons.map((btn, index) => (
        <Link onClick={()=>setActiveIndex(index)} className={`${activeIndex === index?'text-[#d53e4f]':'text-black'} hover:text-[#d53e4f]`} key={index} to={btn.path}>{btn.title}</Link>
      ))}
    </div>
  );
};

export default Filterbutton;
