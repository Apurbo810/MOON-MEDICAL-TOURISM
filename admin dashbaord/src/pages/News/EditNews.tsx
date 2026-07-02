import PageMeta from "../../components/common/PageMeta";
import NewsForm from "../../components/news/NewsForm";

export default function EditNews() {
  return (
    <>
      <PageMeta
        title="Edit News | Admin Dashboard"
        description="Edit an existing news article"
      />

      <div className="space-y-6">
        <NewsForm />
      </div>
    </>
  );
}
