import React, { useEffect } from "react";
import Header from "../components/Header";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div>
        <style>{`
          .terms-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem .9rem;
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }

          .content-wrapper {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            padding: 3rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .header-section {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 2px solid rgba(102, 126, 234, 0.1);
          }

          h1 {
            font-size: clamp(1.8rem, 5vw, 3.5rem);
            font-weight: 600;
            color:#3448c5;
            margin-bottom: .9rem;
            line-height: 1.2;
          }

          .subtitle {
            font-size: clamp(.9rem, 2vw, 1.2rem);
            color: #6b7280;
            font-weight: 500;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .intro-text {
            font-size: clamp(.9rem, 1.8vw, 1..9rem);
            line-height: 1.7;
            color: #374151;
            text-align: center;
            max-width: 600px;
            margin: 0 auto 3rem;
            padding: 2rem;
            background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
            border-radius: 16px;
            border-left: 4px solid #667eea;
   
          }

          .terms-section {
            margin-bottom: 1.8rem;
            background: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
          }

          .terms-section:hover {
            transform: translateY(-2px);
    
          }

          h2 {
            font-size: clamp(1.4rem, 2.5vw, 1.8rem);
            font-weight: 700;
            color: #1f2937;
            margin-bottom: .9rem;
            display: flex;
            align-items: center;
            gap: .9rem;
            position: relative;
          }

          .section-number {
            background-color: #3448c5;
            color: white;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            font-weight: 600;
            flex-shrink: 0;
          }

          .section-title {
            flex: 1;
          }

          p {
            font-size: clamp(0.95rem, 1.6vw, 1.05rem);
            line-height: 1.7;
            color: #4b5563;
            margin: .9rem 0;
            text-align: justify;
          }

          ul {
            margin: .9rem 0;
            padding-left: 0;
            list-style: none;
          }

          li {
            font-size: clamp(0.95rem, 1.6vw, 1.05rem);
            line-height: 1.7;
            color: #4b5563;
            margin: 0.8rem 0;
            padding: .9rem .9rem;
            background: linear-gradient(135deg, #f8fafc, #e2e8f0);
            border-radius: 12px;
            border-left: 3px solid #667eea;
            position: relative;
            transition: all 0.3s ease;
          }

          li:hover {
            transform: translateX(8px);
            background: linear-gradient(135deg, #f0f9ff, #dbeafe);
            border-left-color: #3b82f6;
          }

          li::before {
            content: '✓';
            position: absolute;
            left: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
            color: #667eea;
            font-weight: bold;
            font-size: 1.2rem;
          }

          .highlight-section {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            border-left-color: #f59e0b;
          }

          .highlight-section:hover {
            background: linear-gradient(135deg, #fef3c7, #fcd34d);
          }

          .contact-section {
            background: linear-gradient(135deg, #3448c5,rgb(101, 149, 254));
            color: white;
            text-align: center;
            margin-top: 3rem;
          }

          .contact-section h2 {
            color: white;
            justify-content: center;
          }

          .contact-section .section-number {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
          }

          .contact-section p {
            color: rgba(255, 255, 255, 0.9);
            text-align: center;
            font-size: clamp(.9rem, 1.8vw, 1..9rem);
          }

          .contact-info {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: .9rem 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50px;
            margin-top: .9rem;
            font-weight: 600;
            font-size: clamp(.9rem, 1.8vw, 1..9rem);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          }

          .contact-info:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
          }

          .warning-banner {
            background: linear-gradient(135deg, #fef2f2, #fee2e2);
            border: 2px solid #fca5a5;
            border-radius: 16px;
            padding: .9rem;
            margin: 2rem 0;
            text-align: center;
          }

          .warning-banner .icon {
            font-size: 2rem;
            margin-bottom: .9rem;
          }

          .warning-banner p {
            color: #dc2626;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }

          @media (max-width: 768px) {
            .content-wrapper {
              padding: 2rem .9rem;
              margin: .9rem;
            }

            .terms-section {
              padding: .9rem;
            }

            h2 {
              flex-direction: column;
              text-align: center;
              gap: 0.5rem;
            }

            .section-number {
              margin-bottom: 0.5rem;
            }

            li {
              padding: .9rem;
              padding-left: 1.8rem;
            }
          }

          @media (max-width: 480px) {
            .terms-container {
              padding: .9rem 0.5rem;
            }

            .content-wrapper {
              padding: .9rem .9rem;
              margin: 0.5rem;
            }

            .intro-text {
              padding: .9rem;
            }

            .terms-section {
              padding: 1.2rem;
            }

            .contact-info {
              padding: 0.8rem .9rem;
              flex-direction: column;
              gap: 0.3rem;
            }
          }
        `}</style>

        <div className="content-wrapper">
          <div className="header-section">
            <h1>Terms & Conditions</h1>
            <p className="subtitle" style={{ textAlign: "center" }}>
              Please read these terms carefully before using our platform
            </p>
          </div>

          <div className="intro-text">
            <strong>Welcome to Gosu Family Store!</strong> By accessing or using
            our website and making purchases, you agree to be bound by these
            Terms and Conditions. If you do not agree with any part of these
            terms, we kindly ask that you refrain from using our services.
          </div>

          <div className="terms-section">
            <h2>
              <span className="section-number">1</span>
              <span className="section-title">General Information</span>
            </h2>
            <p>
              Gosu Family Store is a user-operated digital marketplace
              specializing in gaming-related digital items and services. We
              operate as an independent platform that connects users with
              digital gaming content, providing a secure and convenient
              purchasing experience.
            </p>
          </div>

          <div className="terms-section">
            <h2>
              <span className="section-number">2</span>
              <span className="section-title">User Responsibility</span>
            </h2>
            <ul>
              <li>
                You are solely responsible for all purchases and actions taken
                on our platform
              </li>
              <li>
                Ensure all account information and purchase details are accurate
                before confirming orders
              </li>
              <li>
                Use our platform responsibly and in accordance with applicable
                laws and regulations
              </li>
              <li>
                Maintain the confidentiality of your account credentials and
                notify us of any unauthorized access
              </li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>
              <span className="section-number">3</span>
              <span className="section-title">Digital Item Purchases</span>
            </h2>
            <ul>
              <li>
                All products are digital items including in-game currencies,
                credits, skins, and virtual goods
              </li>
              <li>
                Purchases are generally final and non-refundable unless
                otherwise specified or required by law
              </li>
              <li>
                Digital goods are delivered based on the account information you
                provide - verify details carefully
              </li>
              <li>
                Delivery times may vary depending on the specific game or
                platform requirements
              </li>
            </ul>
          </div>

          <div className="terms-section highlight-section">
            <h2>
              <span className="section-number">4</span>
              <span className="section-title">
                Game Publisher Relationships
              </span>
            </h2>
            <div className="warning-banner">
              <div className="icon">⚠️</div>
              <p>Important: We operate as an independent digital reseller</p>
            </div>
            <p>
              Gosu Family Store operates as an independent reseller platform.
              While we source digital items through authorized distribution
              channels, we are not directly affiliated with any specific game
              developer, publisher, or gaming platform. All trademarks, game
              names, and related content belong to their respective owners.
            </p>
          </div>

          <div className="terms-section">
            <h2>
              <span className="section-number">5</span>
              <span className="section-title">Payment & Security</span>
            </h2>
            <ul>
              <li>
                We utilize secure, industry-standard payment processing systems
              </li>
              <li>
                No payment or banking information is stored on our servers
              </li>
              <li>
                All transactions are processed through encrypted third-party
                payment gateways
              </li>
              <li>
                We implement multiple security measures to protect your personal
                and financial data
              </li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>
              <span className="section-number">6</span>
              <span className="section-title">Limitation of Liability</span>
            </h2>
            <p>
              Our platform is provided "as-is" without warranties of any kind.
              We are not liable for any direct, indirect, incidental, or
              consequential damages arising from the use of our website or
              services. Users acknowledge that they use our platform at their
              own risk and discretion.
            </p>
          </div>

          <div className="terms-section">
            <h2>
              <span className="section-number">7</span>
              <span className="section-title">Terms Updates</span>
            </h2>
            <p>
              We reserve the right to modify, update, or change these Terms and
              Conditions at any time. When changes are made, we will update the
              last modified date and notify users when appropriate. Continued
              use of our platform after changes indicates acceptance of the
              updated terms.
            </p>
          </div>

          <div className="terms-section contact-section">
            <h2>
              <span className="section-number">8</span>
              <span className="section-title">Contact & Support</span>
            </h2>
            <p>
              Have questions about our Terms and Conditions or need assistance
              with your account? Our support team is here to help!
            </p>
            <div>
              <strong>- Email - askgosufamilystore@gmail.com</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
