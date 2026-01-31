# URL Shortener Service

A URL Shortener API built with Fastify, TypeScript, Redis, and PostgreSQL (Prisma), designed with scalability, rate limiting, caching, and clean system design in mind.

## ✨ Features

- Create short URLs from long URLs  
- Redirect short URLs to original URLs  
- Redis caching for fast redirects  
- Rate limiting to prevent abuse  
- Click event tracking via background worker
- Analytics aggregation worker (async & scalable)
- Modular & scalable monorepo structure  
- Prisma ORM for database access  
- Centralized error handling  
<!-- - Optional custom alias support   -->

## 🏗️ Tech Stack

| Layer | Tech |
|-----|-----|
| Runtime | Node.js |
| Framework | Fastify |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache | Redis |
| Workers | BullMQ |
| Package Manager | pnpm |
| Architecture | Monorepo |


## 🔌 API Endpoints

### 1️. Create Short URL

**POST** `/api/urls`  
Creates a new short URL for a given original URL.

**Request Body**
```json
{
  "originalUrl": "https://example.com/some/very/long/url",
}
```

**Response**  
```json
{
  "id": "uuid",
  "code": "my-link",
  "shortUrl": "http://localhost:3000/my-link",
  "originalUrl": "https://example.com/some/very/long/url",
  "createdAt": "2026-01-31T10:15:30.000Z"
}
```

### 2️. Get Short URL Details

**GET** `/api/urls/:code`  
Returns metadata for a short URL without redirecting.

**Example**
```perl
GET /api/urls/my-link
```

**Response**
```json
{
  "id": "uuid",
  "code": "my-link",
  "originalUrl": "https://example.com/some/very/long/url",
  "createdAt": "2026-01-31T10:15:30.000Z"
}
```

### 3️. Redirect to Original URL
**GET** `/:code`  
Redirects the short URL to the original URL.


### 4️. Get URL Analytics
**GET** `/analytics/:shortUrlId`  
Returns aggregated analytics data for a short URL.