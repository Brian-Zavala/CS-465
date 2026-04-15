# Travlr Getaways - Full Stack Web Application

This project is a full-stack travel booking website developed for Travlr Getaways. It features a public-facing customer site and a secure administrative single-page application (SPA) for managing trip packages.

## Architecture

**Frontend Development: Express vs. SPA**
In this project, I used two different approaches to frontend development. The public site was built using **Express with Handlebars (HBS)** templates. This is a traditional server-side approach where the server renders the HTML and sends it to the browser. It’s efficient for static-heavy content and SEO. For the admin panel, I used an **Angular SPA**. Unlike Express, the SPA loads once and dynamically updates the page as the user interacts with it. This provides a much faster, more responsive "app-like" experience for administrators managing data.

**Why NoSQL MongoDB?**
I chose **MongoDB** for the backend because its document-based structure is perfect for travel data. Travel packages often have different fields (like varying lengths or resort types), and a NoSQL database allowed for a flexible schema. It also integrates natively with Node.js and JSON, making the data flow between the database and the frontend very smooth.

## Functionality

**JSON and the Full Stack**
While JavaScript is the programming language used to build the logic, **JSON (JavaScript Object Notation)** is the data format used to transmit that logic between the frontend and backend. JSON acts as the "universal language" for this project; the Express API sends trip data as JSON, and the Angular SPA parses that data to display it in the UI. 

**Refactoring and Reusable Components**
A major part of the development process was refactoring. For example, I moved the trip data from hardcoded JSON files to a REST API. This improved efficiency by centralizing data management. I also utilized **reusable UI components** in Angular, like the `TripCard`. The benefit of this is that I only had to write the card logic once and could reuse it across the entire application, making the code much easier to maintain and update.

## Testing

**Methods, Endpoints, and Security**
Testing is critical in a full-stack environment. I used various HTTP methods—**GET** for retrieving trips, **POST** for adding them, and **PUT** for updates. Each of these corresponds to a specific **API endpoint**. Adding a security layer with **JWT (JSON Web Tokens)** meant that I had to test not just the data retrieval, but also the authentication logic. I used **Postman** to verify that my endpoints correctly required a valid token for sensitive actions (like editing a trip) while still allowing public access to the trip listings.

## Reflection

This course has been a massive step toward my goal of becoming a full-stack developer. Learning the **MEAN stack** has given me a deep understanding of how all the pieces of a modern web application fit together—from the database to the final UI. Mastering skills like **RESTful API design** and **token-based authentication** makes me a much more marketable candidate because these are industry-standard practices that employers look for. I feel confident in my ability to build secure, functional applications from the ground up.
