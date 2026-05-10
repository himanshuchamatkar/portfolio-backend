# Portfolio Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from .env.example)

3. Run locally:
```bash
npm run dev
```

## Deploy to Render

1. Push to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create Web Service with:
   - Build Command: `npm install`
   - Start Command: `node index.js`
4. Add Environment Variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Any random string
   - `EMAIL_USER` - your-email@gmail.com
   - `EMAIL_PASS` - Gmail app password

## Default Admin
- Email: admin@portfolio.com
- Password: admin123

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Admin login |
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project (auth) |
| PUT | /api/projects/:id | Update project (auth) |
| DELETE | /api/projects/:id | Delete project (auth) |
| GET | /api/skills | Get all skills |
| POST | /api/contact | Submit contact form |
| GET | /api/contact | Get messages (auth) |