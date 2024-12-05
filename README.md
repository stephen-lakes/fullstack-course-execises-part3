# My Phonebook Application

This project is an Express application that serves both an API and static files from the `dist` directory. The frontend is built using a separate build process and copied over to the backend's `dist` directory.

## Features

- Serves static files
- Proxy configuration for API requests
- CRUD operations for contacts

## Setup

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/stephen-lakes/part3-exercises-backend.git
   cd part3-exercises-backend
   ```

2. **Install Dependencies**:

   ```sh
   npm install
   ```

3. **Build the Frontend**:

   ```sh
   npm run build:ui
   ```

4. **Start the Server**:
   ```sh
   npm start
   ```

## Configuration

- The server uses a proxy configuration to forward API requests to `http://localhost:3001`.

## Running the Application

To run the application locally, use:

```sh
npm start
```

app live at🚀:
https://part3-exercises-backend.onrender.com/
