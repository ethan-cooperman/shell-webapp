# shell-webapp

## A simple web application to simulate shell commands with a client-server architecture.

I created this project to build a full-stack web application using NextJS and Express.js in Typescript. The application allows users to execute shell commands in a simulated environment, providing a user-friendly interface for command execution that mimics a terminal. While HTTP requests are not traditionally used for file operations, this application was an opportunity for me to explore converting an existing class project of writing a terminal in C into a web application.

I imagined the client as the equivalent of a terminal, which is responsible for parsing user input into lower-level system calls and displaying output, while the server acts as the backend that processes these commands as if it were a file system. This allows for validation of commands in the client and prevents the server from executing potentially harmful commands. The server has a few middlewares to handle command execution and validation, ensuring that only safe commands are processed. There is also a bearer token authentication system in place to secure the API endpoints. The server uses express.js with routing to handle HTTP requests and responses, while the client is built with NextJS to provide a seamless user experience.

## Installation and Usage

This project is not designed to be deployed.

### Credentials

I simulated a user authentication system with a bearer token, as well as hiding any sensitive information that would typically be obfuscated in a real application. Server credentials should be placed in a `server/.env` file in the server directory. The server credentials are:

```
# .env
PORT=3000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3001
PASSWORD=password
```

Client credentials are stored in `client/.env.local`:

```
# .env.local
NEXT_PUBLIC_USE_MOCK=FALSE
NEXT_PUBLIC_API_AUTH=password
NEXT_PUBLIC_API_PATH=http://localhost:3000
```

As a note, the `NEXT_PUBLIC_USE_MOCK` variable is set to `FALSE` to indicate that the application should not use mock data and instead connect to the server for real command execution. If you want to commands to use their mocked responses, set it to `TRUE` and the application will use predefined mock commands instead of making API calls.

### Running the Application

To run the application, you need to have Node.js installed on your machine. By default, the server runs on port 3000 and the client on port 3001. Follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies and run both the server and client:

```bash
cd server
npm install
npm run build
npm start
```

Then, in a separate terminal, run the client:

```bash
# In a separate terminal
cd client
npm install
npm run build
npm start
```

## Features

- **Command Execution**: Users can execute shell commands through a web interface.
- **Command History**: The application maintains a history of executed commands, allowing users to revisit previous commands with arrow keys.
- **User Interface**: The application provides a simple and intuitive UI for command input and output display.
- **Client-Server Architecture**: The application is built with a client-server architecture, where the client is developed using NextJS and the server uses Express.js.
- **Simulated Environment**: The application simulates a terminal environment, providing a realistic experience for users.

### Commands Supported

- `ls`: List directory contents.
- `pwd`: Print working directory.
- `cd`: Change directory.
- `cat`: Concatenate and display file content.
- `echo`: Display a line of text.
- `clear`: Clear the terminal screen.
- `touch`: Create an empty file.
- `rm`: Remove files or directories.
- `mkdir`: Create a new directory.
- `rmdir`: Remove an empty directory.

## Technologies Used

- **NextJS**: For building the client-side application.
- **Express.js**: For creating the server-side application.
- **Node.js**: For running the server and client applications.
- **Typescript**: For both client and server-side scripting.
- **CSS**: For styling the web application.
- **Tailwind CSS**: For utility-first CSS styling.
- **HTML**: For structuring the web application.
