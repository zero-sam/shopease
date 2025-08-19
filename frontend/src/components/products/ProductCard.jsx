import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import '../../styles/responsive.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      ':hover': {
        transform: 'translateY(-5px)'
      }
    }}>
      <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          width: '100%',
          paddingBottom: '100%' /* 1:1 Aspect Ratio */,
          position: 'relative',
          overflow: 'hidden',
          background: '#f5f5f5',
        }}>
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#aaa',
            }}>
              No Image
            </div>
          )}
        </div>
      </Link>

      <div style={{ 
        padding: 'clamp(12px, 3vw, 24px)', 
        display: 'flex', 
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'space-between'
      }}>
        <div>
          <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', 
              fontWeight: '600', 
              margin: '0 0 6px',
              color: '#2d3748',
            }}>
              {product.name}
            </h3>
          </Link>
          <p style={{ 
            margin: '0 0 12px', 
            color: '#64748b',
            fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.4'
          }}>
            {product.description ? product.description.substring(0, 60) + (product.description.length > 60 ? '...' : '') : 'No description'}
          </p>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px'
          }}>
            <span style={{ 
              fontWeight: '700', 
              color: '#4f46e5',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)'
            }}>
              ₹{product.price.toLocaleString()}
            </span>
            
            <button
              onClick={handleAddToCart}
              style={{
                background: 'linear-gradient(90deg, #6366F1 0%, #818CF8 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: 'clamp(6px, 2vw, 10px) clamp(10px, 3vw, 16px)',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
