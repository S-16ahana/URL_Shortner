import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  async function fetchUrls() {
    const response = await axios.get(`${API_URL}/api/url`);
    const responseData = response.data;

    setUrls(responseData.data.urls);
  }

  async function createShortUrl() {
    if (!inputValue.trim()) {
      return;
    }

    const response = await axios.post(`${API_URL}/api/url`, {
      url: inputValue,
    });

    const shortCode = response.data.data.shortCode;

    setCurrentUrl({
      originalUrl: response.data.data.url,
      shortCode: shortCode,
      shortUrl: `${API_URL}/${shortCode}`,
    });

    setInputValue("");
    fetchUrls();
  }

  async function deleteUrl(id) {
    await axios.delete(`${API_URL}/api/url/${id}`);

    if (currentUrl) {
      setCurrentUrl(null);
    }

    fetchUrls();
  }

  async function copyUrl(url, id) {
    await navigator.clipboard.writeText(url);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900">
            URL Shortener
          </h1>

          <p className="mt-2 text-neutral-500">
            Turn long URLs into short, easy-to-share links.
          </p>
        </div>

        {/* Input section */}
        <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              className="min-w-0 flex-1 rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-500"
              placeholder="Paste your long URL here"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createShortUrl();
                }
              }}
            />

            <button
              className="rounded-md bg-neutral-900 px-5 py-2 text-white hover:bg-neutral-800"
              onClick={createShortUrl}
            >
              Shorten
            </button>
          </div>
        </div>

        {/* Newly generated URL */}
        {currentUrl && (
          <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="mb-2 text-sm text-neutral-500">Your shortened URL</p>

            <div className="flex items-center gap-2">
              <a
                href={currentUrl.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="min-w-0 flex-1 truncate text-lg font-medium text-blue-600 hover:underline"
              >
                {currentUrl.shortUrl}
              </a>

              <button
                onClick={() => copyUrl(currentUrl.shortUrl, "current")}
                className="shrink-0 rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
              >
                {copiedId === "current" ? "Copied!" : "Copy"}
              </button>
            </div>

            <p className="mt-3 truncate text-sm text-neutral-400">
              {currentUrl.originalUrl}
            </p>
          </div>
        )}

        {/* Previous URLs */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">
              Your URLs
            </h2>

            <span className="text-sm text-neutral-500">
              {urls.length} {urls.length === 1 ? "URL" : "URLs"}
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            {urls.length === 0 ? (
              <div className="p-8 text-center text-neutral-400">
                No shortened URLs yet.
              </div>
            ) : (
              urls.map((url) => {
                const shortUrl = `${API_URL}/${url.shortCode}`;

                return (
                  <div
                    key={url._id}
                    className="border-b border-neutral-100 p-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      {/* Short URL */}
                      <div className="min-w-0 flex-1">
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {shortUrl}
                        </a>

                        <p className="mt-1 truncate text-sm text-neutral-400">
                          {url.originalUrl}
                        </p>
                      </div>

                      {/* Click count */}
                      <div className="hidden text-sm text-neutral-500 sm:block">
                        {url.clicks} clicks
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => copyUrl(shortUrl, url._id)}
                          className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
                        >
                          {copiedId === url._id ? "Copied!" : "Copy"}
                        </button>

                        <button
                          onClick={() => deleteUrl(url._id)}
                          className="rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
