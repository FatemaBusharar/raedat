import React from "react";
import { useTranslation } from "react-i18next";
import "./Community.css";

const Community = () => {
  const { t } = useTranslation();

  return (
    <div className="community-page-wrapper">
      <div className="video-hero">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/videos/meeting_video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay-filter"></div>
        <div className="hero-content">
          <h1>A Creative Community</h1>
          <p>
            The platform will harness women's potential by integrating the orange economy into our pillars,
            empowering Arab women while fostering economic growth.
          </p>
        </div>
      </div>

      <div className="community-inner-content">
        <div className="color-strip"></div>

        <div className="section-badge">Platform Pillars</div>
        <h2 className="sec-title">What We <span>Offer</span></h2>

        <div className="pillars-small-grid">
          <div className="vcard-mini">
            <div className="v-icon-mini">📽️</div>
            <h4>Live Streaming</h4>
          </div>
          <div className="vcard-mini">
            <div className="v-icon-mini">📅</div>
            <h4>Events Management</h4>
          </div>
          <div className="vcard-mini">
            <div className="v-icon-mini">🎓</div>
            <h4>Online Courses</h4>
          </div>
          <div className="vcard-mini">
            <div className="v-icon-mini">🛍️</div>
            <h4>Souq ra'edat</h4>
          </div>
          <div className="vcard-mini">
            <div className="v-icon-mini">🫱🏻‍🫲🏻</div>
            <h4>Community Support</h4>
          </div>
        </div>

        <div className="section-badge">Our Values</div>
        <h2 className="sec-title">For <span>Individuals</span></h2>
        <div className="values-grid">
          <div className="vcard">
            <div className="v-icon">🌱</div>
            <h4>Personal Growth</h4>
            <p>Access to tailored educational resources, workshops, and expert mentorship enhances skills critical for success.</p>
          </div>
          <div className="vcard">
            <div className="v-icon">🤝</div>
            <h4>Networking Opportunities</h4>
            <p>Connect with like-minded women and industry leaders to share experiences and collaborate on projects.</p>
          </div>
          <div className="vcard">
            <div className="v-icon">🎨</div>
            <h4>Creative Expression</h4>
            <p>Engage in a community that celebrates unique talents through various initiatives, including the marketplace.</p>
          </div>
        </div>

        <div className="section-badge">Community Impact</div>
        <h2 className="sec-title">For <span>Communities</span></h2>
        <div className="values-grid">
          <div className="vcard">
            <div className="v-icon">🚀</div>
            <h4>Empowerment</h4>
            <p>Investing in women's entrepreneurship strengthens local economies and fosters innovation across the creative sector.</p>
          </div>
          <div className="vcard">
            <div className="v-icon">🏛️</div>
            <h4>Cultural Heritage</h4>
            <p>Promotes cultural pride and sustainable growth by highlighting women's achievements and contributions.</p>
          </div>
          <div className="vcard">
            <div className="v-icon">🌍</div>
            <h4>Collective Growth</h4>
            <p>Workshops and panel discussions cultivate a collaborative spirit and knowledge exchange among members.</p>
          </div>
        </div>

        <div className="users-wrap">
          <div className="section-badge">Our Network</div>
          <h2 className="sec-title">Who We <span>Cater To</span></h2>
          <div className="users-grid">
            <div className="utag"><span className="u-icon">🏪</span><span>Businesses</span></div>
            <div className="utag"><span className="u-icon">📖</span><span>Educators</span></div>
            <div className="utag"><span className="u-icon">🏆</span><span>Coaches/Mentors</span></div>
            <div className="utag"><span className="u-icon">🎭</span><span>Creators</span></div>
            <div className="utag"><span className="u-icon">🚀</span><span>Startups</span></div>
            <div className="utag"><span className="u-icon">💼</span><span>Entrepreneurs</span></div>
            <div className="utag"><span className="u-icon">👩‍💻</span><span>Solopreneurs</span></div>
            <div className="utag"><span className="u-icon">🤝</span><span>Non-profit Organizations</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
