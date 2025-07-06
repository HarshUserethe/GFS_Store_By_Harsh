import { useNavigate } from 'react-router-dom';


const NotAvailable = () => {
      const navigate = useNavigate();
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      color: '#0277bd',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight:"500" }}>
        Not available at this moment!
      </h1>
      <div>
          <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 24px',
          backgroundColor: '#0288d1',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'background 0.3s ease'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#0277bd'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#0288d1'}
      >
        Go Back Home
      </button>
      </div>
    </div>
  );
};

export default NotAvailable;
