# Travlr Getaways

A full-stack travel booking web application featuring a public-facing customer site and a secure administrative single-page application (SPA) for managing trip packages.

---

## Architecture

### Frontend: Express vs. SPA

This project uses two different frontend approaches depending on the audience. The public site is built with **Express and Handlebars (HBS)** templates, a traditional server-side rendering approach that works well for static-heavy content and SEO. The admin panel is built as an **Angular SPA**, which loads once and dynamically updates as the user interacts with it, giving administrators a fast and responsive app-like experience.

### Why MongoDB?

**MongoDB** was chosen because its document-based structure is a natural fit for travel data. Trip packages often have varying fields like different durations or resort types, and a NoSQL schema handles that flexibility well. It also integrates natively with Node.js and JSON, keeping data flow between the database and frontend clean and consistent.

---

## Functionality

### JSON and the Full Stack

JavaScript handles the application logic, but **JSON (JavaScript Object Notation)** is what moves data between the frontend and backend. The Express API sends trip data as JSON, and the Angular SPA parses it to populate the UI. JSON serves as the common language tying the whole stack together.

### Refactoring and Reusable Components

A significant part of development involved refactoring. Trip data was moved from hardcoded JSON files into a REST API, centralizing data management and making the app easier to scale. Angular's component model was used to build reusable UI pieces like the `TripCard` component, so the card logic only had to be written once and could be used anywhere in the application.

---

## Testing

### HTTP Methods, Endpoints, and Security

I used **GET**, **POST**, and **PUT** methods mapped to specific API endpoints for retrieving, creating, and updating trips. Securing those endpoints with **JWT (JSON Web Tokens)** added an authentication layer that required testing beyond just data retrieval. **Postman** was used to verify that protected routes correctly rejected requests without a valid token, while public trip listings remained accessible without authentication.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend (Public) | Express.js, Handlebars (HBS) |
| Frontend (Admin) | Angular SPA |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT |
| API Testing | Postman |

---
