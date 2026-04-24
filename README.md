# URL Shortener

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)

A minimal URL shortening service built with Express and MongoDB. Generates short slugs via [nanoid](https://github.com/ai/nanoid) and tracks click counts. Optionally passes longer slugs through to a configurable CDN.

## Tech Stack

- **Node.js** (>= 18) / **Express 5**
- **MongoDB** (>= 6) via Mongoose
- **nanoid** for slug generation
- **helmet**, **hpp**, and **express-rate-limit** for basic hardening

## Requirements

- Node.js 18 or newer
- A running MongoDB instance (local or hosted, e.g. MongoDB Atlas)

## Project Structure

```
├── config/
│   └── db.js                     # MongoDB connection
├── controllers/
│   ├── redirect.controller.js    # Handles GET /:slug
│   └── shortener.controller.js   # Handles GET /s?url=...
├── models/
│   └── Url.js                    # Mongoose schema (full, slug, clicks, timestamps)
├── routes/
│   ├── redirect.routes.js
│   └── shortener.routes.js
└── server.js                     # App entrypoint
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example env file and fill in values:
   ```bash
   cp .env.example .env
   ```

### Environment Variables

| Variable            | Description                                                                      | Default |
| ------------------- | -------------------------------------------------------------------------------- | ------- |
| `PORT`              | Port the Express server listens on                                               | `3000`  |
| `BASE_URL`          | Base URL used in shortened URL responses (e.g. `https://short.example.com`)      | `http://localhost:${PORT}` |
| `MONGO_CONN_STRING` | MongoDB connection string                                                        | —       |
| `CDN_URL`           | Host for the long-slug CDN passthrough (e.g. `cdn.example.com`). Optional.       | —       |
| `DISCORD_USER_ID`   | User ID segment used in the CDN passthrough path. Optional.                      | —       |
| `ID_LENGTH`         | Length of generated slugs                                                        | `10`    |

## Running

Development (auto-reload via nodemon):
```bash
npm run dev
```

Production:
```bash
npm start
```

The server will start on `http://localhost:${PORT}`.

## Usage

### Shorten a URL

```
GET /s?url=https://example.com/some/long/path
```

Responds with the shortened URL, e.g. `http://localhost:3000/aB3xYz9qKp`. Set `BASE_URL` to override the host used in the response when deploying.

### Follow a Short URL

```
GET /:slug
```

- If `slug.length <= ID_LENGTH`: looks up the stored URL, increments `clicks`, updates `lastClickedAt`, and redirects to the original URL.
- If `slug.length > ID_LENGTH`: redirects to `https://${CDN_URL}/uploads/${DISCORD_USER_ID}/${slug}` — a CDN passthrough using the `CDN_URL` and `DISCORD_USER_ID` env vars. If you don't need this, leave those vars blank and avoid sending slugs longer than `ID_LENGTH`.
- Unknown slugs return `404 Not Found`.

## Rate Limiting

All routes are limited to **20 requests per 15 minutes** per IP (configured in [server.js](server.js)).

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/my-feature`).
3. Commit your changes.
4. Push to your fork and open a pull request.

For bugs or feature requests, please open an issue.

## License

Released under the [MIT License](LICENSE). © Ethan Rubenstein
