import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterChoice = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)'
    }}>
      <h2 style={{ color: '#3b82f6', marginBottom: '2rem' }}>Register</h2>
      <button
        style={{
          padding: '1rem 2rem', margin: '1rem', fontSize: '1.2rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,102,241,0.15)'
        }}
        onClick={() => navigate('/register-seller')}
      >
        Register as Seller
      </button>
      <button
        style={{
          padding: '1rem 2rem', margin: '1rem', fontSize: '1.2rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(59,130,246,0.15)'
        }}
        onClick={() => navigate('/register-buyer')}
      >
        Register as Buyer
      </button>
    </div>
  );
};

export default RegisterChoice;
