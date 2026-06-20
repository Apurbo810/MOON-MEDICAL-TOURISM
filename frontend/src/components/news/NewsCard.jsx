import { Link } from "react-router-dom";

export default function NewsCard({ article }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-slate-100">
      
      {/* News Image */}
      <div className="h-72 bg-white flex items-center justify-center overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* News Content */}
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-3">
          {article.date}
        </p>

        <h2 className="text-2xl font-bold text-[#243B8F] mb-3">
          {article.title}
        </h2>

        <p className="text-gray-600 leading-7">
          {article.excerpt}
        </p>

        <Link
          to={`/news/${article.slug}`}
          className="inline-flex items-center mt-5 text-[#243B8F] font-semibold hover:text-blue-800 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}