import { Link } from "react-router-dom";
import axiosInstance from "../../services/axios";

export default function NewsCard({ article }) {
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "No date";

  // Construct image URL using axiosInstance baseURL
  const getImageUrl = () => {
    if (!article.image)
      return "/news/default-news.webp";

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
    <Link
      to={`/news/${article.slug || article._id}`}
      className="group block"
    >
      <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* News Image */}
        <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-slate-100">
          <img
            src={imageUrl}
            alt={article.title}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "/news/default-news.webp";
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <p className="mb-3 text-sm text-gray-500">
            {formattedDate}
          </p>

          {/* Title */}
          <h2 className="mb-3 line-clamp-2 text-2xl font-bold text-[#243B8F] transition-colors group-hover:text-[#00A99D]">
            {article.title}
          </h2>

          {/* Description */}
          <p className="line-clamp-3 leading-7 text-gray-600">
            {article.shortDescription ||
              article.description ||
              "No description available."}
          </p>

          {/* Read More */}
          <p className="mt-5 inline-flex items-center font-semibold text-[#243B8F] transition-colors group-hover:text-[#00A99D]">
            Read More →
          </p>
        </div>
      </article>
    </Link>
  );
}