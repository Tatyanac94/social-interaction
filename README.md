# Social-Interaction

## Author: Tatyana Cuttino

## Description

The Social Interaction project is a user-friendly backend API designed to enhance social connections on a digital platform. It allows users to easily create, share, and engage with content through posts and comments, making it simple for everyone to connect and express their thoughts.

This API provides all the necessary tools for a lively community, encouraging meaningful interactions and conversations among users. If a user chooses not to provide their name when creating a post or comment, the system will automatically label them as "Anonymous." This ensures that everyone can participate comfortably, fostering an inclusive environment for all users.

## How to Run

Clone the repository: <https://github.com/Tatyanac94/social-interaction.git>

Navigate to the project directory: cd [project-directory]

## Installation Command

Install dependencies: npm install

## Set Up Environmental Variables

Create a `.env` file in the root directory of the project

```Supabase
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-public-key
```

## Run the Server

For development with auto-reloading: npm run dev

For production: npm start

Open your browser and navigate to <http://localhost:4000> to see the app in action.

## Key Features

API Routes:

* GET /api/snacks: Retrieves a list of all post, comments, and likes.
* GET /api/snacks/
: Fetches details of a single post by its ID.
* POST /api/snacks: Creates a new post entry.
* PUT /api/snacks/
: Updates an existing snack entry.
* DELETE /api/snacks/
: Deletes a snack entry.

## Technologies and Resources Used

* [My Postman Collection](https://www.postman.com/tatyanac94/my-projects/collection/ilffzf6/deployed-snacks-project?action=share&creator=34457002)

* Vercel: Deployment platform for serverless functions and static sites.

* Node.js: JavaScript runtime for building the server.

* Express: Web application framework for Node.js used to handle HTTP requests.

* Supabase: Backend-as-a-service platform providing a PostgreSQL database and RESTful API.

* Javascript: Programming language used for both server-side and client-side code.

* Jest & SuperTest: Tools for testing and HTTP assertions.

* Axios: HTTP client for making requests to the Supabase API.

* CORS: Middleware for handling cross-origin requests.

* Nodemon: Development tool for auto-reloading the server on file changes.
