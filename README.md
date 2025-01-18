# DormMate Frontend

This repository contains the frontend code for the DormMate web application, a dormitory management system designed to streamline communication and transactions between dorm owners and tenants.

## About

DormMate is a web application built to address the inefficiencies and communication gaps often present in traditional dormitory management. It provides a digital platform for dorm owners to manage units, track payments, and share announcements, and for tenants to stay informed and submit maintenance requests.

This project contains the client-side code, built with [Svelte](https://svelte.dev/), which interacts with the backend API to provide a user-friendly interface.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (>= 18.x) and [npm](https://www.npmjs.com/) (included with Node.js).
*   A web browser (Chrome, Firefox, Safari, etc.).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    cd dormmate-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  Open your web browser and navigate to `http://localhost:5000` (or the port indicated in your terminal).

### Technology Stack

*   **Svelte:** The frontend framework used for building the user interface.
*   **svelte-navigator:** Library for handling client-side routing within the Svelte application.
*   **Axios:** Promise-based HTTP client for making API requests to the backend.
*   **HTML:** For structuring the web pages.
*   **CSS:** For styling the application.
*   **JavaScript:** For handling user interactions and making API calls.

### Key Features (in MVP)

*   **Landing page:** Page where the user can choose to login as an admin or a tenant.
*   **Admin dashboard:** Includes functionality to manage units, payments, announcements, and maintenance requests.
*   **Tenant dashboard:** Enables tenants to view their profile, announcements, and maintenance requests.

### Project Structure

The project structure is as follows:
Use code with caution.
Markdown
dormmate-frontend/
├── public/ (Static assets such as images)
├── src/
│ ├── components/ (All your Svelte components)
│ │ ├── auth/
│ │ │ ├── Login.svelte
│ │ │ └── Register.svelte
│ │ ├── admin/
│ │ │ ├── Dashboard.svelte
│ │ │ ├── Units.svelte
│ │ │ ├── Tenants.svelte
│ │ │ └── Announcements.svelte
│ │ └── tenant/
│ │ ├── Dashboard.svelte
│ │ ├── Maintenance.svelte
│ │ └── Profile.svelte
│ ├── routes/
│ │ ├── _layout.svelte (Common layout for all pages)
│ │ └── index.svelte (Landing page - choose admin/tenant login)
│ ├── App.svelte
│ ├── main.js
│ ├── lib/
│ │ └── api.js
│ └── styles/
│ └── global.css
└── ...

### Known Issues

*   There are no tests.
*   The authentication and authorization are not fully implemented yet.

### Roadmap (Future Enhancements)

*   Implement user registration and login.
*   Add role-based access control for different parts of the application.
*   Implement a more robust error handling system.
*   Add testing for the different components.
*   Improve UI/UX design and add responsiveness.