import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import '../../styles/responsive.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const cartItemCount = cartItems?.length || 0;
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '70px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ 
          textDecoration: 'none', 
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{ 
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #6366F1, #818CF8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ShopEase
          </span>
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px',
            '@media (max-width: 768px)': {
              display: 'block',
            }
          }}
          className="menu-toggle"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Nav links - desktop */}
        <div 
          className={`nav-links ${menuOpen ? 'show' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
          <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>Products</Link>

          {user ? (
            <>
              {user.role === 'buyer' && (
                <>
                  <Link to="/buyer/orders" style={{ textDecoration: 'none', color: '#333' }}>My Orders</Link>
                  <Link to="/cart" style={{ 
                    textDecoration: 'none', 
                    color: '#333',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}>
                    Cart
                    {cartItemCount > 0 && (
                      <span style={{
                        background: '#6366F1',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}>
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </>
              )}
              
              {user.role === 'seller' && (
                <>
                  <Link to="/seller/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
                  <Link to="/seller/products" style={{ textDecoration: 'none', color: '#333' }}>My Products</Link>
                </>
              )}
              
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#333',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '1rem',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Login</Link>
              <Link to="/register" style={{ 
                textDecoration: 'none',
                padding: '8px 16px',
                background: 'linear-gradient(90deg, #6366F1 0%, #818CF8 100%)',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: '500',
              }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <style jsx>{`
        @media (max-width: 768px) {
          .menu-toggle {
            display: block !important;
          }
          
          .nav-links {
            display: ${menuOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 100;
          }
          
          .nav-links a, .nav-links button {
            padding: 15px 0;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #f1f1f1;
          }
          
          .nav-links a:last-child, .nav-links button:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </nav>
  );
}
