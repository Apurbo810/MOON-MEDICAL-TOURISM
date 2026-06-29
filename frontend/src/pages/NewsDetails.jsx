import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";

export default function NewsDetails() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        if (!slug) {
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get(
          `/news/${slug}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error(
          "Error fetching news:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-4xl font-bold">
          News Not Found
        </h1>
      </div>
    );
  }

  // Construct image URL from backend
  const getImageUrl = () => {
    if (!article.image) return null;
    
    // If it's already a full URL, use it as is
    if (article.image.startsWith("http")) {
      return article.image;
    }
    
    // If it has a leading slash, combine directly
    if (article.image.startsWith("/")) {
      return `${axiosInstance.defaults.baseURL}${article.image}`;
    }
    
    // Otherwise, add a slash before combining
    return `${axiosInstance.defaults.baseURL}/${article.image}`;
  };

  const imageUrl = getImageUrl();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={article.title}
          className="mb-8 w-full rounded-2xl"
          onError={(e) => {
            e.target.src = "/news/default-news.webp";
          }}
        />
      )}

      {/* Date */}
      <p className="mb-3 text-gray-500">
        {article.createdAt
          ? new Date(
              article.createdAt
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "No Date"}
      </p>

      {/* Title */}
      <h1 className="mb-8 text-5xl font-bold text-[#243B8F]">
        {article.title}
      </h1>

      {/* Content */}
      <div className="whitespace-pre-line leading-9 text-gray-700">
        {article.content ||
          article.description ||
          article.shortDescription ||
          "No content available."}
      </div>
    </section>
  );
}