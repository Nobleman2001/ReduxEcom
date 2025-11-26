import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import Container from "../Container/Container";
import Hero from "../Landingpage/Hero";
import { fetchData } from "../Redux/Slices/BooksSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data: booksList, loading, error } = useSelector((state) => state.books);
  const scrollRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Calculate how many slides are visible at once
  const getSlidesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1536) return 4;
      if (window.innerWidth >= 1280) return 4;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update scroll buttons visibility
  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current;
    if (container && booksList.length > 0) {
      const maxIndex = Math.max(0, booksList.length - slidesPerView);
      setCanScrollLeft(currentIndex > 0);
      setCanScrollRight(currentIndex < maxIndex);
    }
  }, [booksList.length, slidesPerView, currentIndex]);

  // Update current index based on scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isDragging) return;

    const handleScrollEnd = () => {
      const slideWidth = container.scrollWidth / booksList.length;
      const newIndex = Math.round(container.scrollLeft / slideWidth);
      setCurrentIndex(Math.max(0, Math.min(booksList.length - slidesPerView, newIndex)));
    };

    container.addEventListener("scrollend", handleScrollEnd);
    container.addEventListener("scroll", updateScrollButtons);

    return () => {
      container.removeEventListener("scrollend", handleScrollEnd);
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, [booksList, slidesPerView, isDragging, updateScrollButtons]);

  // Scroll to specific index
  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (container && booksList.length > 0) {
      const slideWidth = container.scrollWidth / booksList.length;
      const scrollPosition = slideWidth * index;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    }
  };

  // Handle scroll with arrow buttons - moves exactly one slide
  const handleScroll = (direction) => {
    const newIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(booksList.length - slidesPerView, currentIndex + 1);

    scrollToIndex(newIndex);
  };

  // Mouse drag handlers - Natural free dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollRef.current.style.cursor = "grab";
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const distance = Math.abs(x - startX);

    if (distance > 5) {
      setHasDragged(true);
    }

    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClick = (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <>
      <div data-testid="hero-section">
        <Hero />
      </div>
      <div className="bg-gray-100 py-10 relative">
        <Container>
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d53e4f]"></div>
            </div>
          )}

          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">{error}</div>}

          {!loading && !error && booksList.length > 0 && (
            <>
              {/* Left Arrow Button */}
              {canScrollLeft && (
                <button
                  onClick={() => handleScroll("left")}
                  className="absolute top-1/2 -translate-y-1/2 left-10 bg-white p-3 rounded-full z-50 shadow-lg hover:bg-[#d53e4f] hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Previous slide">
                  <IoIosArrowBack className="text-xl" />
                </button>
              )}

              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleDragMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`flex gap-5 overflow-x-scroll scrollbar-hide select-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}>
                {booksList.map((book, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 bg-white rounded-xl p-5 shrink-0 w-[calc(100%-1.25rem)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)] xl:w-[calc(25%-0.9375rem)]">
                    {/* This is i want to access as a test */}
                    <h2 className="mb-5 text-xl uppercase font-semibold text-gray-800">{book.category}</h2>

                    <div className="grid grid-cols-2 gap-5">
                      {book.image.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`/${item.path}`}
                          className="block hover:opacity-80 transition-opacity duration-200"
                          onClick={handleClick}
                          onDragStart={(e) => e.preventDefault()}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-32 w-full object-cover rounded-lg"
                            draggable="false"
                          />
                          <h3 className="text-sm font-medium mt-2 line-clamp-2">{item.title}</h3>
                        </Link>
                      ))}
                    </div>

                    <Link
                      to={`/books/subject/${book.category.replace(/\s+g/, "-").toLowerCase()}`}
                      onClick={handleClick}
                      className="mt-5 text-center block text-[#d53e4f] border border-[#d53e4f] w-full py-2 rounded-lg cursor-pointer hover:bg-[#d53e4f] hover:text-white transition-all duration-300 font-medium">
                      See More
                    </Link>
                  </div>
                ))}
              </div>

              {/* Right Arrow Button */}
              {canScrollRight && (
                <button
                  onClick={() => handleScroll("right")}
                  className="absolute top-1/2 -translate-y-1/2 right-10 bg-white p-3 rounded-full z-50 shadow-lg hover:bg-[#d53e4f] hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Next slide">
                  <IoIosArrowForward className="text-xl" />
                </button>
              )}
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
