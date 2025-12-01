const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { category = 'general', page = 1, query = '' } = event.queryStringParameters || {};
  const pageSize = 12;
  const apiKey = process.env.NEWS_API_KEY;

  const url = query
    ? `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' }),
    };
  }
};
