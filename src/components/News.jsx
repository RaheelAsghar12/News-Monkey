import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';

const News = ({ category, darkMode }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');
  const apiKey = '93df460c86514144844c0be11744ff6c';
  const pageSize = 12;

<<<<<<< Updated upstream
  // Fetch news from Netlify serverless function
  const fetchNews = async (pageNum = 1, search = "") => {
   const res = await fetch(`/api/news?category=${category}&page=${pageNum}&query=${query}`);
const data = await res.json();

=======
  const fetchNews = async (pageNum = 1, search = '') => {
    const url = search
      ? `https://newsapi.org/v2/everything?q=${search}&page=${pageNum}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${apiKey}`
      : `https://newsapi.org/v2/top-headlines?category=${category}&page=${pageNum}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
>>>>>>> Stashed changes

    if (pageNum === 1) setArticles(data.articles);
    else setArticles(prev => [...prev, ...data.articles]);

    setHasMore(data.articles.length === pageSize);
  };

  useEffect(() => {
    setPage(1);
    fetchNews(1);
  }, [category]);

  const fetchMore = () => {
    const nextPage = page + 1;
    fetchNews(nextPage, query);
    setPage(nextPage);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (query.trim() !== '') {
      setPage(1);
      fetchNews(1, query);
    }
  };

  return (
    <>
      <div className={`max-w-7xl mx-auto my-6 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-6">{category.charAt(0).toUpperCase() + category.slice(1)} News</h2>

        {/* Search Bar */}
        <form className="flex mb-6" onSubmit={handleSearch}>
          <input
            type="text"
            className={`flex-grow px-4 py-2 rounded-l-md focus:outline-none ${
              darkMode ? 'bg-gray-700 text-white placeholder-gray-300' : 'bg-gray-100 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-r-md font-medium ${
              darkMode ? 'bg-white text-gray-900' : 'bg-green-600 text-white'
            }`}
          >
            Search
          </button>
        </form>

        {/* Articles */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="text-center my-4">
              <img src="/icegif-1265.gif" alt="Loading..." className="h-16 mx-auto" />
            </div>
          }
          endMessage={<p className="text-center my-4 text-gray-500">No more articles</p>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <motion.div
                key={idx}
                className={`rounded-lg overflow-hidden shadow-md flex flex-col ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <img
                  src={article.urlToImage || 'https://via.placeholder.com/300'}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="font-semibold text-lg mb-2">{article.title}</h5>
                  <p className="flex-grow text-sm mb-4">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-auto px-4 py-2 rounded-md font-medium text-center ${
                      darkMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Read More
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default News;
