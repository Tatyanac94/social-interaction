# Social Interaction

## Author: Tatyana Cuttino

## Description

The Social Interaction project is a user-friendly backend API designed to enhance social connections on a digital platform. It allows users to easily create, share, and engage with content through posts and comments, making it simple for everyone to connect and express their thoughts.

This API provides all the necessary tools for an active community, encouraging meaningful interactions and conversations among users. If a user chooses not to provide their name when creating a post or comment, the system will automatically label them as "Anonymous." This ensures that everyone can participate comfortably, fostering an inclusive environment for all users.

## How to Run

Clone the repository: <https://github.com/Tatyanac94/social-interaction.git>

Navigate to the project directory:

```bash
cd [project-directory]
```

## Installation Command

Install dependencies using the following command:

```bash
npm install
```

## Set Up Environmental Variables

Create a `.env` file in the root directory of the project:

```plaintext
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-public-key
```

## Run the Server

For production:

```bash
npm start
```

For development with auto-reloading:

```bash
npm run dev
```

Open your browser and navigate to <http://localhost:4000> to see the app in action.

## Key Features

## API Routes

POSTS:

* GET /api/posts - Retrieves a list of all posts.
* GET /api/posts/:id - Fetches details of a single post by its ID.
* POST /api/posts - Creates a new post entry.
* PUT /api/posts/:id - Updates an existing post entry by its ID.
* DELETE /api/posts/:id - Deletes a post by its ID.

COMMENTS:

* GET /api/comments/posts/:id/comments - To get all comments for a specific post.
* POST /api/comments/posts/:id/comments - To add a comment to a specific post by the post ID.
* PUT /api/comments/comments/:commentId - To update a comment by its ID.
* DELETE /api/comments/comments/:commentId - Deletes a comment by its ID.

LIKES:

* GET /api/likes/posts/:id/likes - To view likes for a post.
* POST /api/likes/posts/:id/likes - For liking a post.
* DELETE /api/likes/likes/:likeId - To delete a like by its ID.

## Request Body Format for Posting and Updating Comments and Posts

When making a POST or PUT request to create or update a comment or post entry, ensure that you send a valid JSON body. The request body should be formatted as follows:

For creating or updating a Post:
(Username is optional. If you remove the username, your post will be labeled as Anonymous.)

```json
{
    "title": "Your post title",
    "content": "Your post content here",
    "username": "Your name here"
}
```

For creating or updating a Comment:
(Username is optional. If you remove the username, your comment will be labeled as Anonymous.)

```json
{
    "content": "Your updated comment here",
    "username": "Your name here"
}
```

## Technologies and Resources Used

* Vercel: Deployment platform for serverless functions and static sites.

* Node.js: JavaScript runtime for building the server.

* Express: Web application framework for Node.js used to handle HTTP requests.

* Supabase: Backend-as-a-service platform providing a PostgreSQL database and RESTful API.

* Javascript: Programming language used for both server-side and client-side code.

* Postman: Write and run automated tests for API endpoints. (GET, POST, PUT, DELETE, etc.).

* Jest & SuperTest: Tools for testing and HTTP assertions.

* Axios: HTTP client for making requests to the Supabase API.

* CORS: Middleware for handling cross-origin requests.

* Nodemon: Development tool for auto-reloading the server on file changes.
