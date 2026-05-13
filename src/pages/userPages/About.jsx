import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import axios from "axios"
import {
  FaEdit, FaUsers, FaStore, FaMobileAlt,
  FaUserEdit, FaRocket, FaGamepad
} from "react-icons/fa"
import "./About.css"

const About = () => {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === "ar"
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  const teamMembers = [
    {
      name: "Maryam Buzaboon",
      role: "Business Development Manager",
      image: "https://www.raedat.online/MediaManager/Library/11/Maryam%20Buzaboon.png",
    },
    {
      name: "Oday Adel",
      role: "Marketing Executive",
      image: "https://www.raedat.online/MediaManager/Library/11/Oday%20Adel.png",
    },
    {
      name: "Fayeza Ahmed",
      role: "Graphic Designer / Content Creator",
      image: "https://www.raedat.online/MediaManager/Library/11/Fayeza%20Ahmed%20.png",
    },
  ]

  const features = [
    { icon: <FaEdit />, text: "Create posts, articles, polls, events, and courses." },
    { icon: <FaUsers />, text: "Build community groups and sub-groups for organisations." },
    { icon: <FaStore />, text: "Support for creating a branded e-marketplace." },
    { icon: <FaMobileAlt />, text: "Native app available for Android and iOS devices." },
    { icon: <FaUserEdit />, text: "Customisable experiences for community members." },
    { icon: <FaRocket />, text: "Enjoyable and straightforward technological experience." },
    { icon: <FaGamepad />, text: "Enhance gamification features to boost engagement." }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/content/page/about")
        setSections(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="loading-state">Loading...</div>

  return (
    <div className={`about-wrapper ${isAr ? "rtl" : ""}`}>

      <section className="about-hero">
        <div className="hero-overlay">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-label">Say Hello to ra'edat</span>
            <h1>Inspiring Social Progress</h1>
            <p className="hero-desc">
              ra'edat is a pioneering platform dedicated to unleashing the transformative
              potential of Arab women within the orange economy.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container">
        <section className="vision-mission-grid">
          <motion.div className="info-card" whileHover={{ y: -5 }}>
            <div className="card-accent gold" />
            <h2>Vision</h2>
            <p>To ignite the creative potential of Arab women in the orange economy, fostering a vibrant community of innovative thinkers and changemakers who inspire social progress and economic development.</p>
          </motion.div>

          <motion.div className="info-card" whileHover={{ y: -5 }}>
            <div className="card-accent deep-purple" />
            <h2>Mission</h2>
            <p>To empower Arab women by providing tools, mentorship, and opportunities to thrive in the orange economy.</p>
          </motion.div>
        </section>

        <section className="content-block">
          <div className="text-side">
            <span className="section-label">A Creative Revolution</span>
            <h2 className="purple-title">The Orange Economy</h2>
            <p>
              The Orange Economy encompasses creative industries that blend culture, knowledge, and innovation to drive economic growth.
              This vibrant sector includes art, music, design, fashion, film, literature, technology, and digital media.
            </p>
            <p style={{ marginTop: '15px' }}>
              This dynamic economy fosters collaboration among entrepreneurs, artists, and innovators, paving the way for new business models and sustainable development.
            </p>
          </div>
          <div className="image-side">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800" alt="Orange Economy" />
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-container">
            <p className="main-quote">"ra'edat is not just a tool; it’s a catalyst for change."</p>
          </div>
        </section>

        <section className="content-block inverted">
          <div className="text-side">
            <span className="section-label">Why We Stand Out</span>
            <h2 className="purple-title">Our Uniqueness</h2>
            <p>
              ra'edat stands out by creating an inclusive platform specifically designed for Arab women.
              Our commitment to nurturing their talents within the orange economy empowers them to overcome
              barriers and maximize their creative potential.
            </p>
            <p style={{ marginTop: '15px', fontWeight: 'bold', color: 'var(--purple-deep)' }}>
              With pioneering features like AI-powered matchmaking and a dedicated marketplace, ra'edat transforms not just individual lives but entire communities.
            </p>
          </div>
          <div className="image-side">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800" alt="Our Uniqueness" />
          </div>
        </section>

        <section className="features-grid">
          {features.map((item, i) => (
            <motion.div key={i} className="feature-item" whileHover={{ y: -5 }}>
              <div className="feature-icon">{item.icon}</div>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </section>

        {sections.map((item) => (
          <div key={item._id} className="content-block">
            <div className="text-side">
              <h2 className="purple-title">{isAr ? item.headerAr : item.header}</h2>
              <p>{isAr ? item.textAr : item.text}</p>
            </div>
            <div className="image-side">
              <img src={item.image} alt={item.header} />
            </div>
          </div>
        ))}
      </div>

      <section className="team-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
             <span className="section-label">Our Team</span>
             <h2 className="purple-title">Meet Our Experts</h2>
          </div>
          <div className="team-grid">
            {teamMembers.map((m, i) => (
              <motion.div key={i} className="team-card">
                <div className="team-img-wrapper">
                  <img src={m.image} alt={m.name} />
                </div>
                <h3>{m.name}</h3>
                <p className="role-text">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
