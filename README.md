# StepCloser

StepCloser is a web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to set and track their personal and public goals while providing a clean and intuitive interface. This project was created to consolidate a week's worth of learning and challenge my development skills.

![logo](https://github.com/AdityaAnandCodes/StepCloser/blob/main/showcase/logo.png)
---

## Features

1. **User Authentication**
   - Users can create an account, log in, and log out securely.

2. **Goal Management**
   - Create two types of goals:
     - **Public Goals:** Visible to all users, inspiring others to achieve more.
     - **Private Goals:** Visible only to the creator.
   - Mark goals as complete at any time.

3. **Responsive Design**
   - A clean, modern interface that adapts to various devices and screen sizes.

---

## Screenshots

### Hero Section
![Hero Section](https://github.com/AdityaAnandCodes/StepCloser/blob/main/showcase/StepCloser%20-%20Google%20Chrome%2029-12-2024%2023_54_59.png)
A welcoming hero section that introduces StepCloser with a call-to-action button to get started.

### Goals Page
![Goals Page](https://github.com/AdityaAnandCodes/StepCloser/blob/main/showcase/StepCloser%20-%20Google%20Chrome%2029-12-2024%2023_55_16.png)
The public goals page where users can view and draw inspiration from goals shared by others.

---

## Tech Stack

- **Frontend:** React.js with TailwindCSS for styling
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (via Mongoose for ORM)
- **Authentication:** JSON Web Tokens (JWT) and bcrypt for password hashing

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaAnandCodes/StepCloser.git
   ```

2. Navigate to the project directory:
   ```bash
   cd stepcloser
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd frontend
   npm install
   cd backend
   npm install
   ```

4. Create a `.env` file in the backend directory and add the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Access the app at `http://localhost:5173`.


## License

This project is licensed under the [Apache2.0 License](LICENSE).

---

## Acknowledgments

- Inspired by productivity tools and goal-setting apps.
- Special thanks to the MERN stack documentation and open-source libraries used in the project.

---

Feel free to contribute by submitting issues or pull requests. Let's help more people achieve their goals with StepCloser!

