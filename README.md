# react-aspnet-staff-management
A full-stack staff management system built with React and ASP.NET Core, featuring staff listing, profile details, creation, editing, deletion, and REST API integration.


# UserApi

A simple ASP.NET Core Web API for managing staff users.

This project was built as a learning backend using:

- C#
- .NET 9
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Npgsql
- Swagger / OpenAPI

## Features

- Get all users
- Get a user by ID
- Create a user
- Update a user
- Delete a user
- Persistent PostgreSQL storage
- Async database operations
- Dependency Injection
- DTO-based request models
- Swagger / OpenAPI documentation

## Project Structure

```text
UserApi/
├── Controllers/
│   └── UsersController.cs
├── Data/
│   └── AppDbContext.cs
├── DTOs/
│   ├── CreateUserDto.cs
│   └── UpdateUserDto.cs
├── Models/
│   └── User.cs
├── Services/
│   ├── IUserService.cs
│   └── UserService.cs
├── Migrations/
├── Properties/
│   └── launchSettings.json
├── Program.cs
├── appsettings.json
├── appsettings.Development.json
└── UserApi.csproj
```

# Staff Management Frontend

React frontend for the Staff Management System. It provides an interface for viewing, creating, editing, deleting, and inspecting staff records through an ASP.NET Core Web API.

## Features

* View all staff members
* Add new staff members
* Edit existing staff information
* Delete staff members with confirmation
* View individual staff details
* Display loading, success, and error notifications
* Client-side routing with React Router
* Shared staff state management with React Context

## Technology Stack

* React
* Vite
* React Router
* JavaScript
* CSS
* Fetch API
* ASP.NET Core REST API

## Project Structure

```text
src/
├── api/
│   └── users.js
├── assets/
├── components/
│   └── Alert.jsx
├── context/
│   └── StaffContext.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── EditStaff.jsx
│   └── PersonalInfo.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Requirements

Install the following before running the application:

* Node.js
* npm
* The Staff Management ASP.NET Core API

## Installation

Clone the repository and navigate to the frontend directory:

```bash
git clone https://github.com/YOUR_USERNAME/react-aspnet-staff-management.git
cd react-aspnet-staff-management/Frontend-React
```

Install the frontend dependencies:

```bash
npm install
```

## API Configuration

Ensure that the API address configured in `src/api/users.js` matches the address used by the ASP.NET Core backend.

Example:

```text
https://localhost:7001/api/users
```

The exact port may differ depending on the backend launch configuration.

The ASP.NET Core API must also allow the Vite development origin through its CORS configuration:

```text
http://localhost:5173
```

## Running the Frontend

Start the Vite development server:

```bash
npm run dev
```

Open the address shown in the terminal. The default address is:

```text
http://localhost:5173
```

To start both the frontend and backend from the monorepo root:

```bash
npm run dev
```

## Available Routes

| Route        | Purpose                     |
| ------------ | --------------------------- |
| `/`          | Display the staff directory |
| `/edit`      | Add a staff member          |
| `/edit/:id`  | Edit a staff member         |
| `/staff/:id` | View staff details          |

## Available Commands

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

```bash
npm run preview
```

Locally previews the production build.

```bash
npm run lint
```

Checks the source code with ESLint.

## Backend Dependency

This frontend requires the `UserApi` ASP.NET Core project. The backend is responsible for:

* Providing REST API endpoints
* Validating request data
* Managing EF Core database operations
* Persisting data in PostgreSQL
* Configuring CORS

## Production Build

Create a production build with:

```bash
npm run build
```

The generated files will be placed in:

```text
dist/
```
