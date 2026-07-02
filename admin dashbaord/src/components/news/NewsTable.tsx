import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface News {
  _id: string;
  title: string;
  description: string;
  image?: string;
  isPublished: boolean;
  createdAt: string;
}

export default function NewsTable() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (search)
          params.append("search", search);

        if (status)
          params.append(
            "isPublished",
            status
          );

        const res =
          await axiosInstance.get(
            `/news?${params.toString()}`
          );

        setNews(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [search, status]);

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (!confirmed) return;

    try {
      await axiosInstance.delete(
        `/news/${id}`
      );

      setNews((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      toast.success(
        "News deleted successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to delete news"
      );
    }
  };

  const handleStatusToggle = async (
    item: News
  ) => {
    const action = item.isPublished
      ? "unpublish"
      : "publish";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} this news?`
    );

    if (!confirmed) return;

    try {
      await axiosInstance.patch(
        `/news/${item._id}`,
        {
          isPublished: !item.isPublished,
        }
      );

      setNews((prev) =>
        prev.map((entry) =>
          entry._id === item._id
            ? {
                ...entry,
                isPublished: !entry.isPublished,
              }
            : entry
        )
      );

      toast.success(
        `News ${action}ed successfully`
      );
    } catch (error) {
      console.log(error);
      toast.error(
        `Failed to ${action} news`
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-200">
        Loading news...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
      {/* Filters */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 dark:border-white/[0.05] md:flex-row">
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-brand-800"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-brand-800"
        >
          <option value="">
            All Status
          </option>

          <option value="true">
            Published
          </option>

          <option value="false">
            Unpublished
          </option>
        </select>
      </div>

      {/* Header */}
      <div className="border-b border-gray-100 p-5 dark:border-white/[0.05]">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          All News
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                News
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Published Date
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Status
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {news.length === 0 ? (
              <TableRow>
                <TableCell className="px-5 py-6 text-gray-500 dark:text-gray-400">
                  No news found.
                </TableCell>
              </TableRow>
            ) : (
              news.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-20 overflow-hidden rounded-lg">
                        <img
                          src={
                            item.image ||
                            "/images/placeholder.jpg"
                          }
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <span className="block font-medium text-gray-800 dark:text-white">
                          {item.title}
                        </span>

                        <span className="line-clamp-2 block text-sm text-gray-500">
                          {item.description.slice(
                            0,
                            80
                          )}
                          ...
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <button
                      onClick={() =>
                        handleStatusToggle(item)
                      }
                      className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium transition hover:opacity-80 dark:border-gray-700"
                    >
                      <Badge
                        color={
                          item.isPublished
                            ? "success"
                            : "error"
                        }
                      >
                        {item.isPublished
                          ? "Published"
                          : "Draft"}
                      </Badge>
                    </button>
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/news/edit/${item._id}`
                          )
                        }
                        className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}