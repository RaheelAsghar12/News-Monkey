import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { category = 'general', page = 1, query = '' } = req.query;
  const pageSize = 12;
  const apiKey = process.env.NEWS_API_KEY; // secure API key

  const url = query
    ? `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
