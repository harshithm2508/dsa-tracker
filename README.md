# DSA Tracker

A comprehensive MERN stack application to track your Data Structures and Algorithms (DSA) progress.

## Features

- **Dashboard**: Visualize your progress with statistics on solved and bookmarked questions.
- **Track**: Manage your questions in a canvas-style masonry layout.
- **Detailed Tracking**: Record approaches, time/space complexity, code solutions, and tags.
- **Bookmarks**: Keep track of questions you want to focus on.
- **Modern UI**: Clean, responsive interface with a premium white and blue theme.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Setup Guide (For Forked Repos)

Follow these steps to set up the project locally after forking the repository.

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/dsa-tracker.git
cd dsa-tracker
```

### 2. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory:
    ```bash
    # server/.env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/dsa-tracker
    # Or use your MongoDB Atlas URI
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```
    You should see: `Server running on port 5000` and `Connected to MongoDB`.

### 3. Frontend Setup

1.  Open a **new terminal** and navigate to the project root:
    ```bash
    cd dsa-tracker
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the link shown in the terminal (usually `http://localhost:5173`) to view the app.

## Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
