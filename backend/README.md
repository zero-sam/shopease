🛒 ShopEase Backend

ShopEase is a modern e-commerce platform backend built using the MERN stack, designed to empower small businesses and local sellers with a scalable, secure, and user-friendly online shopping experience.
This backend handles user management, authentication, and product listings, and is built to scale for features like orders and payments.
✅ What Has Been Implemented So Far
1. 👥 User Model with Role Support

    Defined a detailed user schema in /models/User.js.

    Supports three roles: buyer, seller, and admin.

    Includes:

        Secure password hashing using bcrypt middleware.

        Sub-schemas for addresses and bank details.

        Fields for seller verification.

2. 🔐 User Authentication

    Created registration and login routes/controllers:

        /routes/auth.js

        /controllers/authController.js

    Separate registration endpoints for buyers and sellers with role distinction.

    Implemented JWT-based authentication:

        Token generation during login.

        Middleware for JWT verification: /middleware/auth.js

        Middleware for role-based access control: /middleware/roleAuth.js

3. 👤 Profile Endpoint

    Created /api/auth/me to securely retrieve the currently logged-in user's information.

4. 📦 Product Management

    Product schema defined in /models/Product.js with fields:

        name, description, price, category, images, inventory, and seller reference.

    Product routes in /routes/products.js:

        Sellers can: create, update, and delete products.

        Buyers & Sellers can: view and list products.

    Controllers ensure:

        Proper role validation.

        Ownership checks for updates/deletion.

5. ⚙️ Backend Setup & MongoDB Integration

    Connected to MongoDB Atlas using Mongoose.

    Configured environment variables in .env:

        Database URI

        JWT secret

        Port

    Connection uses modern serverApi options.

    Used .gitignore to exclude sensitive data and node_modules.

6. 💻 GitHub & Version Control

    Clean and structured GitHub repo.

    Used GitHub Desktop for commits and pushes.

    Excluded unnecessary files to keep the repo clean.

🚀 How to Run Locally
1. Clone the Repository

git clone https://github.com/your-username/shopease-backend.git
cd shopease-backend

2. Install Dependencies

npm install

3. Create a .env File

Add the following variables:

MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

4. Start the Development Server

npm run dev

🧪 Testing the API

Use Postman, Thunder Client, or any API testing tool to interact with the endpoints:

    🔐 Register or login as buyer/seller.

    👤 Access user profile at /api/auth/me.

    📦 Create, update, or list products.

    🔒 Test protected routes using the JWT token in the Authorization header.
ScreenShots:

<img width="875" height="884" alt="image" src="https://github.com/user-attachments/assets/579d1941-4ab0-46f1-817e-9ab61f938847" />

