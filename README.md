# react-aspnet-staff-management

A full-stack staff management system built with React and ASP.NET Core, featuring staff listing, profile details, creation, editing, deletion, and REST API integration.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Available Commands](#available-commands)
- [API Documentation](#api-documentation)

---

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **JavaScript** - Language
- **CSS** - Styling
- **Fetch API** - HTTP client

### Backend
- **C#** - Language
- **.NET 9** - Runtime
- **ASP.NET Core Web API** - Web framework
- **Entity Framework Core** - ORM
- **PostgreSQL** - Database
- **Swagger / OpenAPI** - API documentation

---

## Features

### Frontend
- View all staff members
- Add new staff members
- Edit existing staff information
- Delete staff members with confirmation
- View individual staff details
- Display loading, success, and error notifications
- Client-side routing with React Router
- Shared staff state management with React Context

### Backend API
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

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **.NET 9 SDK**
- **PostgreSQL** (v12 or higher)

To verify your installations:

```bash
node --version
npm --version
dotnet --version
```

---

## Installation

### Frontend Installation

1. **Navigate to the frontend directory:**

```bash
cd Frontend-React
```

2. **Install dependencies:**

```bash
npm install
```

This will install all required packages including:
- React and React Router
- Vite and its plugins
- ESLint for code quality

### Backend Installation

1. **Navigate to the backend directory:**

```bash
cd UserApi
```

2. **Restore NuGet packages:**

```bash
dotnet restore
```

This will install all required dependencies including:
- ASP.NET Core libraries
- Entity Framework Core
- Npgsql (PostgreSQL driver)
- Swagger packages

3. **Set up the database:**

Ensure your PostgreSQL server is running, then apply migrations:

```bash
dotnet ef database update
```

---

## Configuration

### Frontend Configuration

The frontend communicates with the backend API. Ensure the API endpoint in `src/api/users.js` matches your backend configuration:

```javascript
// Example API endpoint
https://localhost:7001/api/users
```

The exact port may differ depending on your backend launch configuration.

### Backend Configuration

1. **Database Connection String**

   Edit `appsettings.Development.json` to configure your PostgreSQL connection:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Port=5432;Database=staff_management;Username=your_username;Password=your_password"
     }
   }
   ```

2. **CORS Configuration**

   The ASP.NET Core API must allow the Vite development origin through CORS:

   ```
   http://localhost:5173
   ```

   This is typically configured in `Program.cs`.

---

## Running the Application

### Option 1: Run from Monorepo Root

Start both frontend and backend together:

```bash
npm run dev
```

### Option 2: Run Separately

**Start the Backend:**

```bash
cd UserApi
dotnet run
```

The API will be available at `https://localhost:7001`

**Start the Frontend (in a new terminal):**

```bash
cd Frontend-React
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Project Structure

### Frontend

```
Frontend-React/
├── src/
│   ├── api/
│   │   └── users.js              # API client for backend communication
│   ├── assets/                    # Static assets
│   ├── components/
│   │   └── Alert.jsx              # Alert/notification component
│   ├── context/
│   │   └── StaffContext.jsx       # Global state management
│   ├── pages/
│   │   ├── Dashboard.jsx          # Staff listing page
│   │   ├── EditStaff.jsx          # Add/edit staff page
│   │   └── PersonalInfo.jsx       # Staff detail page
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Entry point
├── package.json
└── vite.config.js
```

### Backend

```
UserApi/
├── Controllers/
│   └── UsersController.cs         # API endpoints
├── Data/
│   └── AppDbContext.cs            # EF Core database context
├── DTOs/
│   ├── CreateUserDto.cs           # Create user request model
│   └── UpdateUserDto.cs           # Update user request model
├── Models/
│   └── User.cs                    # User entity
├── Services/
│   ├── IUserService.cs            # Service interface
│   └── UserService.cs             # Service implementation
├── Migrations/                    # Database migrations
├── Properties/
│   └── launchSettings.json        # Launch configuration
├── Program.cs                     # App configuration
├── appsettings.json               # Configuration file
├── appsettings.Development.json   # Development overrides
└── UserApi.csproj
```

---

## Available Routes

| Route        | Purpose                     |
| ------------ | --------------------------- |
| `/`          | Display the staff directory |
| `/edit`      | Add a staff member          |
| `/edit/:id`  | Edit a staff member         |
| `/staff/:id` | View staff details          |

---

## Available Commands

### Frontend Commands

```bash
# Start development server with HMR
npm run dev

# Create optimized production build
npm run build

# Preview production build locally
npm run preview

# Run ESLint on source code
npm run lint
```

### Backend Commands

```bash
# Run development server
dotnet run

# Run in production mode
dotnet run --configuration Release

# Create migrations
dotnet ef migrations add MigrationName

# Apply pending migrations
dotnet ef database update

# View API documentation
# Open: https://localhost:7001/swagger
```

---

## API Documentation

### Swagger / OpenAPI

Once the backend is running, access the interactive API documentation:

```
https://localhost:7001/swagger
```

### API Endpoints

**Get All Users**
```
GET /api/users
```

**Get User by ID**
```
GET /api/users/{id}
```

**Create User**
```
POST /api/users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

**Update User**
```
PUT /api/users/{id}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com"
}
```

**Delete User**
```
DELETE /api/users/{id}
```

---

## Troubleshooting

**Frontend can't connect to API:**
- Verify the API endpoint in `src/api/users.js`
- Ensure the backend is running
- Check CORS configuration in the backend

**Database connection issues:**
- Verify PostgreSQL is running
- Check connection string in `appsettings.Development.json`
- Ensure database and user exist

**Port conflicts:**
- Frontend default: `http://localhost:5173`
- Backend default: `https://localhost:7001`
- Change ports in launch settings if needed
