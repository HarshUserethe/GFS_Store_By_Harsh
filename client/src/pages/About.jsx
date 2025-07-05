import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Underlay from '../components/Underlay';

const About = () => {
    const navigate = useNavigate();
    const handleTermsAndCondition = () => {
    navigate('/terms-and-condition')
    }
  return (
    <div className="aboutus" style={{backgroundColor:"#efeef3"}}>
     <Underlay />
      <Header />
      <style>{`
      body{
        font-family: 'poppins';
      }
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1a1a1a;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
         
        }

        .content-wrapper {
          background: #efeef3;
          backdrop-filter: blur(0px);
          border-radius: 0px;
          padding: 3rem;
         
        
        }

        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
        }

        h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          color: #dfdfdf;
          font-weight: 500;
          margin-bottom: 2rem;
        }

        .intro {
          font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.7;
          color: #fff;
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
          font-weight: 400;
          margin-top:-1rem;
        }

        .intro strong {
          color:rgb(68, 87, 214);
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .stat-card {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          
        }

        .stat-number {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #3448c5;
          display: block;
        }

        .stat-label {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          color: #6b7280;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .photo-section {
          margin: 4rem 0;
        }

        .photo-frame {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .photo-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .photo-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .photo-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .photo-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 1.5rem;
          font-weight: 600;
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
        }

        h2 {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #1f2937;
          margin: 3rem 0 2rem;
          text-align: center;
          position: relative;
        }

        h2::after {
          content: '';
          display: block;
          width: 80px;
          height: 4px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          margin: 1rem auto;
          border-radius: 2px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .feature-card {
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          padding: 2rem;
          border-radius: 16px;
          border-left: 4px solid #667eea;
          
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .feature-card:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          border-left-color: #764ba2;
        }

        .feature-icon {
          font-size: 1.5rem;
          min-width: 2rem;
          margin-top: 0.2rem;
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-size: clamp(1rem, 1.8vw, 1.1rem);
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .feature-description {
          font-size: clamp(0.85rem, 1.5vw, 0.95rem);
          color: #6b7280;
          line-height: 1.5;
        }

        .closing {
          font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.7;
          color: #374151;
          text-align: center;
          margin: 3rem auto 0;
          max-width: 600px;
          padding: 2rem;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border-radius: 16px;
          border: 1px solid rgba(14, 165, 233, 0.1);
        }

        .closing strong {
          color: #667eea;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .stat-card {
            padding: 1.5rem 1rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .feature-card {
            padding: 1.5rem;
          }

          .photo-frame {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .about-container {
            padding: 1rem 0.5rem;
          }

          .content-wrapper {
            padding: 1.5rem 1rem;
            margin: 0.5rem;
            margin-top: -.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="content-wrapper" style={{backgroundColor:"transparent"}}>
      
        <div className="hero-section">
          <h1 style={{fontSize:"1.8rem"}}>About Us</h1>
          <p className="subtitle" style={{fontSize:".9rem"}}>Your Gaming Paradise, Since 2020</p>
        </div>

        <p className="intro" style={{fontSize:".9rem"}}>
          Welcome to <strong>Gosu Family Store</strong> — your ultimate destination for premium gaming experiences at unbeatable prices. We're dedicated to empowering gamers worldwide with instant access to digital gaming content, from in-game currencies to exclusive items, all year round.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number" style={{fontSize:"1.8rem"}}>24/7</span>
            <span className="stat-label" style={{fontSize:".9rem"}}>Always Available</span>
          </div>
          <div className="stat-card">
            <span className="stat-number" style={{fontSize:"1.8rem"}}>2020</span>
            <span className="stat-label" style={{fontSize:".9rem"}}>Since Year</span>
          </div>
          <div className="stat-card">
            <span className="stat-number" style={{fontSize:"1.8rem"}}>100%</span>
            <span className="stat-label" style={{fontSize:".9rem"}}>Secure Transactions</span>
          </div>
        </div>

        <div className="photo-section">
          <div className="photo-frame">
            <div className="photo-card">
              <img src="https://res.cloudinary.com/da6pzcqcw/image/upload/v1751689175/67c597753236d97f8a97978d_cover_x8lk3y.png" alt="Mobile Legends" />
              <div className="photo-overlay">Mobile Legends Diamonds</div>
            </div>
            <div className="photo-card">
              <img src="https://res.cloudinary.com/da6pzcqcw/image/upload/v1751689173/GrH33zmX0AA_5G0_h9u5ww.webp" alt="PUBG UC" />
              <div className="photo-overlay">PUBG Mobile UC</div>
            </div>
            <div className="photo-card">
              <img src="https://res.cloudinary.com/da6pzcqcw/image/upload/v1751689173/mobile-legends-thumbnail-2_qhkijm.jpg" alt="Gaming Currency" />
              <div className="photo-overlay">In-Game Currency</div>
            </div>
          </div>
        </div>

        <h2 style={{fontSize:"1.8rem"}}>Why Choose Gosu Family Store?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <div className="feature-content">
              <div className="feature-title">Unbeatable Prices</div>
              <div className="feature-description">Get the best deals on premium gaming content with discounts available every single day of the year.</div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <div className="feature-content">
              <div className="feature-title">Instant Delivery</div>
              <div className="feature-description">Experience lightning-fast transactions with immediate delivery of your digital gaming items.</div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <div className="feature-content">
              <div className="feature-title">100% Secure</div>
              <div className="feature-description">Shop with confidence using our encrypted payment system and secure transaction processing.</div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <div className="feature-content">
              <div className="feature-title">Global Access</div>
              <div className="feature-description">Access digital gaming content from anywhere in the world, available 24/7, 365 days a year.</div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <div className="feature-content">
              <div className="feature-title">Expert Support</div>
              <div className="feature-description">Get friendly, knowledgeable assistance from our dedicated support team whenever you need help.</div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <div className="feature-content">
              <div className="feature-title">Wide Selection</div>
              <div className="feature-description">Discover an extensive catalog of gaming content for all your favorite mobile and PC games.</div>
            </div>
          </div>
        </div>

        <p className="closing" style={{fontSize:".9rem"}}>
          Join thousands of satisfied gamers who trust <strong>Gosu Family Store</strong> to enhance their gaming experience. Start your journey with us today and discover why we're the preferred choice for smart gamers worldwide!
        </p>
       <div onClick={handleTermsAndCondition} style={{width:"100%", textAlign:"center", marginTop:"15px", color:"Blue", cursor:"pointer"}}>
         <p style={{fontSize:".9rem"}}> Terms & Conditions</p>
       </div>
      </div>
    </div>
  );
};

export default About;