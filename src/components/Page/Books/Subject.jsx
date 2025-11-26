//import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import Container from "../../Container/Container";
import { fetchPublishersData } from "../../Redux/Slices/PublisherSlice";
import { fetchSubjectData } from "../../Redux/Slices/SubjectSlice";
import PriceRange from "./PriceRange";

const Subject = () => {
  const dispatch = useDispatch();
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const { data: publisherData } = useSelector((state) => state.publishers);
  const { data: subjectsData } = useSelector((state) => state.subjects);
  console.log(subjectsData);

  useEffect(() => {
    dispatch(fetchSubjectData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPublishersData());
  }, [dispatch]);

  //  Handler function to handle publisher
  const togglePublisher = (index) => {
    setSelectedPublishers((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };
  const toggleSubject = (index) => {
    setSelectedSubjects((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  return (
    <div className="py-10 ">
      <Container>
        <div className="flex gap-20">
          {/* Sidebar Filter */}
          <aside className="w-1/4 space-y-10">
            {/* price filter */}
            <div className="border border-gray-200 rounded-lg">
              <h2 className="bg-gray-100 py-2 px-5 font-semibold rounded-t-md">Price Range</h2>
              <PriceRange />
            </div>
            {/* publisher filter*/}
            <div className="border border-gray-200 rounded-lg">
              <h2 className="bg-gray-100 py-2 px-5 font-semibold rounded-t-md">Publisher</h2>

              <div className="overflow-y-scroll h-64">
                {publisherData.map((d, publisherIndex) => (
                  <div
                    key={publisherIndex}
                    className="px-5 border-b-2 border-gray-200 py-2 flex items-center justify-between">
                    <h2>{d.title}</h2>
                    <div
                      onClick={() => {
                        togglePublisher(publisherIndex);
                      }}
                      className="border-2 border-gray-400 h-5 w-5 rounded-full cursor-pointer ">
                      <FcOk className={`${selectedPublishers.includes(publisherIndex) ? "block" : "hidden"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="border border-gray-200 rounded-lg">
              <h2 className="bg-gray-100 py-2 px-5 font-semibold rounded-t-md">Subject</h2>
              <div className="overflow-y-scroll h-52">
                {subjectsData.map((d, subjectIndex) => (
                  <div
                    key={subjectIndex}
                    className="px-5 border-b-2 border-gray-200 py-2 flex items-center justify-between">
                    <h2>{d.title}</h2>
                    <div
                      onClick={() => {
                        toggleSubject(subjectIndex);
                      }}
                      className="border-2 border-gray-400 h-5 w-5 rounded-full cursor-pointer ">
                      <FcOk className={`${selectedSubjects.includes(subjectIndex) ? "block" : "hidden"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Section - Books in here a outler will be render */}
          <section className="w-3/4">
            {/* in this here acdemics books, youth books and ohter books compoente will render here */}
            <Outlet />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Subject;
