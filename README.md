A backend API for a social media feed, built with Node.js, Express, TypeScript, and PostgreSQL. Features include JWT authentication, post creation, a following system, and a personalized news feed.

---

## 1. Quick Start

### ✅ Prerequisites

- Node.js v16+
- npm v8+
- PostgreSQL 13+ (or Docker)
- A `.env` file with the secrets listed below

### 🔧 Environment Variables

Create a `.env` in the project root:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=social_feed
JWT_SECRET=replace_me_with_something_secret

### 🗄️ Boot the Database

**Option A – Docker (recommended)**

1. Add `postgres` and optional `pgadmin` services to `docker-compose.yml`.
2. Run:

docker-compose up -d

**Option B – Local PostgreSQL**

1. Start PostgreSQL manually.
2. Create the database:

createdb social_feed

### 🚀 Install & Run

npm install
npm run build
npm run start

For live reload during development:

npm run dev

---

## 2. Architectural Decisions & Trade-offs

### ⚙️ TypeScript + Class Validators

- We embraced TypeScript’s strict mode and `class-validator` DTOs to enforce request payloads.
- **Benefit:** Fewer runtime surprises, auto-generated docs from DTOs.
- **Trade-off:** Slightly more boilerplate and type definitions (e.g., augmenting `Express.Request.user`).

### 📊 TypeORM for Data Mapping

- TypeORM handles entity definitions (`User`, `Post`) and relationships.
- **Benefit:** Concise data access, easy migrations, relation management.
- **Trade-off:** Less visibility into raw SQL; we mitigate performance concerns with query builders when needed.

### 🧑‍🤝‍🧑 Self-Referential Follow Relationships

- We rely on a TypeORM Many-to-Many self-join for `followers` / `following`.
- **Benefit:** Simple API for “who am I following?” queries.
- **Trade-off:** Relations load lazily by default; we explicitly select relations in services when necessary.

### 📰 Feed Generation: Pull Model

- Each `GET /feed` request queries posts authored by the user’s follow list.
- **Benefit:** Straightforward logic, minimal infrastructure, instant consistency (delete a post, it disappears from feeds).
- **Trade-off:** Query cost rises with follower/following scale. A “push” fan-out model with queues and caching could replace this when scale demands.

### 🔒 JWT Authentication Middleware

- After verifying the JWT, middleware attaches the user to `req.user`.
- **Benefit:** Stateless auth that scales horizontally.
- **Trade-off:** Stateless tokens make revocation/refresh handling trickier; short token TTLs and refresh tokens should be considered later.

### 🧱 Centralized Error Handling

- A global middleware returns consistent JSON errors.
- **Benefit:** Clients can handle errors predictably and log them effectively.
- **Trade-off:** Deeply nested errors need careful logging to preserve context.

---

## 3. Manual Validation Checklist

If you’re testing manually (or planning automated tests), here’s a quick verification list:

1. **Signup Success:** POST `/auth/signup` → 201 Created + new user.
2. **Duplicate Email:** POST `/auth/signup` with existing email → 409 Conflict.
3. **Login Success:** POST `/auth/login` → 200 OK + JWT.
4. **Login Wrong Password:** POST `/auth/login` with wrong password → 401 Unauthorized.
5. **Create Post (Authed):** POST `/posts` with valid JWT → 201 Created + post payload.
6. **Create Post (Unauthed):** POST `/posts` without token → 401 Unauthorized.
7. **Follow User:** POST `/users/:id/follow` → 200 OK.
8. **Follow Self:** POST `/users/:selfId/follow` → 400 Bad Request.
9. **Feed Retrieval:** GET `/feed` after following others → Returns posts by followed users (sorted descending by timestamp).
10. **Feed Pagination:** GET `/feed?offset=5&limit=5` → Returns the expected slice of results.

---

## 4. Roadmap & Maintenance

- **Feed Performance Enhancements:** Introduce caching or denormalized feed tables when follower counts climb.
- **Refresh Tokens:** Add secure refresh flow for longer-lived sessions.
- **Automated Tests:** Expand coverage with integration tests (e.g., Supertest) for auth, posts, feeds.
- **Observability:** Integrate structured logging (winston/pino) and trace metrics for production readiness.

---
