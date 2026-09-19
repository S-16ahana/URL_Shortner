# URL Shortener

A full-stack URL Shortener application built using the MERN stack. Users can enter a long URL and generate a unique short URL. The application also displays previously shortened URLs and tracks the number of clicks.

## Tech Stack

### Frontend

- React.js
- Vite
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- Create short URLs from long URLs
- Store URLs in MongoDB
- Fetch previously created URLs
- Track URL click count
- Redirect users using the generated short URL
- REST API integration between frontend and backend
- Vite proxy configuration for local API requests
- Responsive user interface

## Project Structure

```text
url-shortener/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd url-shortener
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

The frontend will run on the Vite development server, usually:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint      | Description                  |
| ------ | ------------- | ---------------------------- |
| POST   | `/api/url`    | Create a short URL           |
| GET    | `/api/url`    | Get all shortened URLs       |
| GET    | `/:shortCode` | Redirect to the original URL |

## Frontend API Integration

The frontend communicates with the backend using Axios.

Vite proxy configuration is used during development:

```js
server: {
  proxy: {
    "/api": "http://localhost:3000"
  }
}
```

This allows frontend requests such as:

```js
axios.get("/api/url");
```

to be forwarded to the backend.

## Environment Variables

The following variables are required:

```env
PORT=
MONGO_URI=
```

Do not commit your `.env` file to GitHub.

## Future Improvements

- User authentication
- Custom short codes
- URL expiration
- QR code generation
- Analytics dashboard
- Click history
- Rate limiting
- Deployment with a production database

## Author

Sahana Kadrolli

GitHub: https://github.com/S-16ahana
