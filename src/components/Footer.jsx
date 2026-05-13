import React from "react"
import { Link } from "react-router-dom"
import "../components/Footer.css"

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="social-media-grid">
          <Link to="https://www.instagram.com/raedat.bh/" target="_blank">
            <img src="/images/social_madia/instagram.png" alt="Instagram" />
          </Link>
          <Link to="https://www.youtube.com/@raedat_bh" target="_blank">
            <img src="/images/social_madia/youtube.png" alt="YouTube" />
          </Link>
          <Link to="https://www.tiktok.com/@raedat.bh" target="_blank">
            <img src="/images/social_madia/tiktok.png" alt="TikTok" />
          </Link>
          <Link to="https://twitter.com/raedatbh" target="_blank">
            <img src="/images/social_madia/twitter.png" alt="Twitter" />
          </Link>
          <Link to="mailto:support@raedat.online">
            <img src="/images/social_madia/email.png" alt="Email" />
          </Link>
        </div>

        <div className="footer-bottom-info">
          <p className="copyright-text">
            © 2026 <strong>Raedat</strong> All Rights Reserved | Disclaimer
          </p>
          <p className="powered-by">
            Powered by <span>Atyaf eSolutions</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
