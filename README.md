# Group3-CS403 — Anime API

Backend for the Integrative Programming Languages 1 (CS403) MCO. Anime character CRUD with
JWT-based authentication and ownership-based authorization, built on Express and PostgreSQL.

## Features

- **CRUD operations**: GET all, GET one, POST, PUT, DELETE, all on `/anime`
- **PostgreSQL** with persistent data (no in-memory arrays): `users`, `refresh_tokens`, and `anime` tables
- **JWT authentication**: register, login, refresh, logout, and protected write routes
- **Authorization**: only the user who created an anime entry can edit or delete it
- **Password hashing** with `bcrypt` (never stored in plaintext)
- **Error handling** for 400, 401, 403, 404, 409, and 500 cases
- **Input validation** with `express-validator` on all write endpoints
- **Swagger documentation** with working "Try it out"

## Tech stack

- Node.js / Express
- PostgreSQL (`pg`)
- JWT auth (access + refresh tokens) with `bcrypt` password hashing
- `express-validator` for request validation
- `swagger-jsdoc` + `swagger-ui-express` for API docs

## Installation

Requires Node.js 20 or newer.

1. Clone the repository:

```
git clone https://github.com/jypher-201/Group3-CS403.git
```

2. Go into the project folder:

```
cd Group3-CS403
```

3. Install the dependencies:

```
npm install
```

4. Configure the environment variables.

Create a `.env` file in the project root, following the format in `.env.example`, and fill in the server, database and JWT values:

```
PORT=5000

DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Never commit the real `.env` file.

## How to run

1. Start the server:

```
node server.js
```

2. If it starts successfully, you should see:

```
App is listening to port 5000
Connected to PostgreSQL database successfully!
```

The API is then available at `http://localhost:5000`.

## Database

The schema lives in `schema.sql` (tables: `users`, `refresh_tokens`, `anime`). The shared Group 3 database was already provisioned with these tables. The `anime` table stores `created_by`, which links each entry to the user who created it. The three seed entries have no owner, so they cannot be edited or deleted through the API.

## API documentation

Interactive Swagger docs (with working "Try it out") are served at:

```
http://localhost:5000/api-docs
```

To test protected routes: call `POST /auth/login` first to get an `accessToken`, click the **Authorize** button in Swagger UI, and paste just the token (Swagger adds the `Bearer ` prefix automatically). After that, "Try it out" works on `POST`, `PUT`, and `DELETE` for `/anime`.

## Endpoints

### Auth

| Method | Route | Auth required | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Create a user (password is hashed with bcrypt) |
| POST | `/auth/login` | No | Log in, returns access token and sets refresh cookie |
| POST | `/auth/refresh` | Refresh cookie | Issue a new access token |
| POST | `/auth/logout` | Refresh cookie | Invalidate the refresh token |

### Anime

| Method | Route | Auth required | Description |
|---|---|---|---|
| GET | `/anime` | No | List all anime characters |
| GET | `/anime/:id` | No | Get one anime character |
| POST | `/anime` | Yes (Bearer token) | Create an anime character |
| PUT | `/anime/:id` | Yes (Bearer token, owner only) | Update an anime character |
| DELETE | `/anime/:id` | Yes (Bearer token, owner only) | Delete an anime character |

## Error handling

| Status | When |
|---|---|
| 400 | Validation failure (missing/invalid fields) or malformed JSON body |
| 401 | Missing access token, or invalid login credentials |
| 403 | Invalid/expired token, or editing/deleting an anime you did not create |
| 404 | Resource (anime, route) not found |
| 409 | Email already registered |
| 500 | Unexpected server error (caught centrally, never crashes the process) |