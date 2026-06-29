import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import NewsCard from "../components/news/NewsCard";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get("/news");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;

  const currentNews = articles.slice(
    indexOfFirstNews,
    indexOfLastNews
  );

  const totalPages = Math.ceil(
    articles.length / newsPerPage
  );

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-[#243B8F]">
          Latest News
        </h1>

        <p className="mt-4 text-gray-600">
          Updates, announcements and healthcare information.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p>Loading news...</p>
        </div>
      ) : currentNews.length > 0 ? (
        <>
          {/* News Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {currentNews.map((article) => (
              <NewsCard
                key={article.id || article._id}
                article={article}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`w-10 h-10 rounded-full transition ${
                    currentPage === index + 1
                      ? "bg-[#243B8F] text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p>No news available.</p>
        </div>
      )}
    </section>
  );
}