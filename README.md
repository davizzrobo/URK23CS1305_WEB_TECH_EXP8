# Multi-Language News Aggregation Portal

A full-stack demo app that aggregates and manages news in multiple languages (English/Hindi). It demonstrates CRUD operations (Insert, Fetch, Delete) using Node.js, Express, MongoDB and a simple frontend UI.

## Features

- REST API endpoints to fetch, add, delete news
- Simple admin form to insert news
- Language filtering (English/Hindi)
- Demo seed route to populate sample articles

## Project Structure

- `server.js` - Express server entry
- `models/news.js` - Mongoose model for news articles
- `routes/news.js` - API routes: GET `/api/news`, POST `/api/news/add`, DELETE `/api/news/delete/:id`, POST `/api/news/seed`
- `client/index.html` - Lightweight frontend (no build step required) using plain JS and fetch
- `package.json` - Backend dependencies and scripts

## Quick start (local)

1. Copy `.env.example` to `.env` and set `MONGODB_URI` if needed.
2. Install dependencies:

```bash
npm install
```

3. Start MongoDB locally or use MongoDB Atlas and set `MONGODB_URI` in `.env`.

4. Run server:

```bash
npm run dev
# or
npm start
```

5. Open the frontend in your browser:

- If running server on `http://localhost:5000`, open `http://localhost:5000/client/index.html` (or open the file directly for the static client and ensure the API base points to http://localhost:5000)

## Endpoints

- GET `/api/news` - fetch all news. Supports query params: `language` and `q` (search)
- POST `/api/news/add` - add news (body: `{title, description, language, source, date?}`)
- DELETE `/api/news/delete/:id` - delete by id
- POST `/api/news/seed` - insert demo items

## Notes on multilingual support

This demo stores a `language` field per article and filters by it on the server. For production translation you can integrate an external translation API (Google Translate, Microsoft Translator) to translate content dynamically.

## Deployment

**📘 Complete deployment guide available in [DEPLOYMENT.md](./DEPLOYMENT.md)**

Quick overview:
1. **MongoDB Atlas** (free tier) - cloud database
2. **Render.com** (free tier) - hosting platform
3. Auto-deploy on git push to `main` branch

For detailed step-by-step instructions with screenshots, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## License

MIT
