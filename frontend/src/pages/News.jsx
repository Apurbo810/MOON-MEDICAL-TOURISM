import { news } from "../data/news";
import NewsCard from "../components/news/NewsCard";

export default function News() {
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

      <div className="grid lg:grid-cols-2 gap-8">
        {news.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
          />
        ))}
      </div>

    </section>
  );
}