const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3300;
const METABASE_URL = 'http://localhost:3000';

app.use(cookieParser())

app.use((req, res, next) => {
  console.log(req.cookies)
  const requiredCookie = req.cookies.permitted;
  if (requiredCookie) {
    next();
  } else {
    // Redirect to forbidden page of nextjs
    res.status(403).send('Forbidden');
  }
});

app.use('/', createProxyMiddleware({
  target: METABASE_URL,
  changeOrigin: true,
}));

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
