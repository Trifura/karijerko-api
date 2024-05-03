# Karijerko Back-end Documentation

## Overview
Karijerko API provides RESTful services for managing company advertisements, user profiles, and application processes. It's built using NestJS, a progressive Node.js framework, which offers efficient handling of requests with built-in support for dependency injection and modularization.

## Installation Instructions
### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)

### Local Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Trifura/karijerko-api
   cd karijerko-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```
   This command runs the NestJS application, which listens for requests on [http://localhost:3000](http://localhost:3000).

## API Features
### Key Endpoints
- **Company Management:** CRUD operations for company ads, search functionalities, and filtering.
- **User Profiles:** Handling user data, authentication, and authorization.
- **Application Processing:** Manage applications, reviews, and user responses.

### Using the API
- **Authentication:** Utilize JWT for secure access to API endpoints.
- **Requests and Responses:** Follows REST principles with JSON data formats.

## Contributing
### How to Contribute
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

### Reporting Issues
Please use GitHub issues to report potential bugs or request features.

## Contact Information
For further assistance or to contact the maintainers, please email [Trifura.tech@gmail.com](mailto:Trifura.tech@gmail.com).
