# ShopEase E-commerce Platform

ShopEase is a full-stack e-commerce platform built with React, Node.js, Express, and MongoDB that offers a seamless shopping experience for buyers and an intuitive management system for sellers.

## 🚀 Features

### For Buyers
- User authentication and registration
- Browse products with filtering and search
- Product details with images and descriptions
- Shopping cart functionality
- Order placement and tracking
- Order cancellation capabilities
- Responsive design for all devices

### For Sellers
- Dashboard with sales analytics
- Product management (add, edit, delete)
- Order management system
- Shipping and delivery tracking
- Real-time notifications for new orders
- Inventory management

## 🛠️ Technology Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- CSS for styling
- Responsive design with media queries

### Backend
- Node.js & Express
- MongoDB for database storage and queries
- JWT for authentication
- Express middleware:
  - Helmet for security headers
  - CORS for cross-origin requests
  - Rate limiting for API protection
  - Morgan for request logging

## 📋 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/zero-sam/shopease.git
cd shopease
```

2. **Backend Setup**
```bash
cd backend
npm install
# Create a .env file with your MongoDB URI and JWT secret
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔒 Environment Variables

Create a `.env` file in the backend directory with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
``` 

## 📱 Mobile Access

To access the application from your mobile device:
1. Ensure your computer and mobile device are on the same network
2. Find your computer's IP address
3. In the Vite config, set `host: '0.0.0.0'`
4. Access `http://[YOUR_IP_ADDRESS]:5173` from your mobile browser

## 📊 Database Structure

The application uses MongoDB with the following main collections:
- **Users**: Store user information and authentication details
- **Products**: Product listings with details, prices, and inventory
- **Orders**: Customer orders with items, status, and tracking
- **Categories**: Product categorization

## 🌟 API Endpoints

### Authentication
- POST `/api/auth/register`: User registration
- POST `/api/auth/login`: User login

### Products
- GET `/api/products`: Fetch all products
- GET `/api/products/:id`: Get single product details
- POST `/api/products`: Add new product (seller only)
- PUT `/api/products/:id`: Update product (seller only)
- DELETE `/api/products/:id`: Remove product (seller only)

### Orders
- GET `/api/orders`: Get user orders
- POST `/api/orders`: Create new order
- PUT `/api/orders/:id/cancel`: Cancel order
- PUT `/api/orders/:id/status`: Update order status (seller only)

## 📷 Screenshots

/Register
<img width="548" height="874" alt="image" src="https://github.com/user-attachments/assets/c4b68609-59d3-4c20-b621-c9b717a137d5" />

/Register-seller
<img width="562" height="947" alt="image" src="https://github.com/user-attachments/assets/01d70cc4-34d2-4113-9462-bad999a7027c" />

/Register-user
<img width="572" height="963" alt="image" src="https://github.com/user-attachments/assets/1d52e97f-221e-4f4b-b026-1ad66cfc8c5f" />

/public
<img width="989" height="947" alt="image" src="https://github.com/user-attachments/assets/9b309be9-61ed-49c2-b0ac-5b05f8c7917f" />

<img width="1003" height="989" alt="image" src="https://github.com/user-attachments/assets/1e228dbb-79c7-4de3-ac34-6c08d69b2dcb" />

/cart
<img width="639" height="930" alt="image" src="https://github.com/user-attachments/assets/da7b711c-4ffe-4d38-aeb7-77c9c34d6d49" />

/buyer/checkout
<img width="642" height="981" alt="image" src="https://github.com/user-attachments/assets/0e705e32-9180-41be-8a3c-8b4313c2f1b5" />

/buyer/orders
<img width="616" height="983" alt="image" src="https://github.com/user-attachments/assets/66abdbc3-a7fa-420d-96ed-3d3f1525843a" />

/seller/dashboard
<img width="696" height="983" alt="image" src="https://github.com/user-attachments/assets/b343648c-ab06-453c-a65c-902a955a84cf" />


## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Samuel - [GitHub Profile](https://github.com/zero-sam)

---

Made with ❤️ using React, Node.js, Express, and MongoDB
