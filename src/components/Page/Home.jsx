import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import Container from "../Container/Container";
import Hero from "../Landingpage/Hero";
import { fetchData } from "../Redux/Slices/BooksSlice";

const Home = () => {

  const dispatch = useDispatch();
  const { data:booksList, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const sliceBooksList = booksList.slice(0, 4);

  return (
    <>
      <Hero />
      <div className="bg-gray-100 py-10">
        <Container>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-4 gap-5">
            {sliceBooksList.map((book, index) => (
              <div key={index} className="border border-gray-200 bg-white rounded-xl p-8">
                <h2 className="mb-5 text-xl uppercase">{book.category}</h2>

                <div className="grid grid-cols-2 gap-5">
                  {book.image.map((item, idx) => (
                    <Link key={idx} to={`/${item.path}`} className="block hover:opacity-80 transition">
                      <img src={item.image} alt={item.title} className="h-32" />
                      <h3 className="text-sm font-medium mt-1">{item.title}</h3>
                    </Link>
                  ))}
                </div>

                <button className="mt-5 text-[#d53e4f] border w-full py-2 cursor-pointer hover:bg-[#d53e4f] hover:text-white transition-all duration-300">
                  See More
                </button>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
