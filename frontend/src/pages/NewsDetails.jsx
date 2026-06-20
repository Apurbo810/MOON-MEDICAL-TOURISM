import { useParams } from "react-router-dom";
import { news } from "../data/news";

export default function NewsDetails() {
  const { slug } = useParams();

  const article = news.find(
    (item) => item.slug === slug
  );

  if (!article) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">
          News Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">

      <img
        src={article.image}
        alt={article.title}
        className="w-full rounded-2xl mb-8"
      />

      <p className="text-gray-500 mb-3">
        {article.date}
      </p>

      <h1 className="text-5xl font-bold text-[#243B8F] mb-8">
        {article.title}
      </h1>

      <div className="text-gray-700 leading-9 whitespace-pre-line">
        {article.content}
      </div>

    </section>
  );
}