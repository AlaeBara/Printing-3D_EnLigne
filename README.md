# **Design and Development of a Web Application for Online 3D Printing Requests.**

## Project Specification

In a world where technology is rapidly evolving, 3D printing has become an essential tool in various fields such as medicine and engineering. However, it often remains inaccessible to the general public due to the complexity, cost of equipment, and the need to visit specialized printing centers.

Our platform aims to address these issues by providing an online 3D printing service that is easy to use, cost-effective, and accessible from anywhere. The application is developed using ReactJs for the frontend, NodeJs for the backend, and MongoDB for database management.

## Objectives

The primary objective of our platform is to enable users to transform their ideas into tangible objects without having to invest in expensive equipment or acquire specialized technical skills.

## Project Features

### Client Side

#### Home Page
- Presentation of the 3D printing services offered.
- Highlighting the ease of use and accessibility of the service.

#### Quote Request Page (Before Login)
- Users can upload their 3D model and view the printing price.
- If the client is registered, their request will be saved and they can track its status.

#### Quote Request Page (After Login)
- The client can upload their 3D model.
- The platform automatically calculates the printing price based on the model specifications (volume, etc.).
- The client can submit their printing request.
- Access to a dedicated page to track the status of their printing requests.

### Admin Side
- Management of client messages (integrated forum on the homepage).
- Viewing of printing requests:
  - List of requests with detailed information.
- Assignment of statuses to requests:
  - Assigning statuses (Confirmed, Completed) to track the processing of requests.
