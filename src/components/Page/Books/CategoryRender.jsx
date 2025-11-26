import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { fetchAllBooksData } from "../../Redux/Slices/BooksDataSlice";
import { TbCurrencyTaka } from "react-icons/tb";

const CategoryRender = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { data: categoryBooksData } = useSelector((state) => state.booksData);

  useEffect(() => {
    dispatch(fetchAllBooksData());
  }, [dispatch]);

  const filterDataByCategory = categoryBooksData.filter((d) => d.category.toLowerCase() === category.toLowerCase());
  const books = filterDataByCategory[0]?.books || [];

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {books.map((book, index) => (
          <Link to={`/academics/${book.title.replace(/\s+/g, "-").toLowerCase()}`} key={index} className="space-y-4">
            <img src={book.image} alt={book.title} />
            <h2>{book.title}</h2>
            <div className="flex items-center gap-1 text-[#d53e4f]">
              <TbCurrencyTaka size={20} />
              <p> {book.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryRender;
