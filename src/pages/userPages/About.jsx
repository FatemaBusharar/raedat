import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import axios from "axios"
import {
  FaEdit,
  FaUsers,
  FaStore,
  FaMobileAlt,
  FaUserEdit,
  FaRocket,
  FaGamepad,
} from "react-icons/fa"
import "./About.css"

const About = () => {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === "ar"
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  // مصفوفة الفريق مع ربط المسميات الوظيفية بالترجمة
  const teamMembers = [
    {
      name: "Maryam Buzaboon",
      role: t("about.team.roles.bizDev"),
      image:
        "https://www.raedat.online/MediaManager/Library/11/Maryam%20Buzaboon.png",
    },
    {
      name: "Oday Adel",
      role: t("about.team.roles.marketing"),
      image:
        "https://www.raedat.online/MediaManager/Library/11/Oday%20Adel.png",
    },
    {
      name: "Fayeza Ahmed",
      role: t("about.team.roles.creative"),
      image:
        "https://www.raedat.online/MediaManager/Library/11/Fayeza%20Ahmed%20.png",
    },
  ]

  // مصفوفة المميزات مع ربط النصوص بالترجمة
  const features = [
    { icon: <FaEdit />, text: t("about.features.posts") },
    { icon: <FaUsers />, text: t("about.features.groups") },
    { icon: <FaStore />, text: t("about.features.marketplace") },
    { icon: <FaMobileAlt />, text: t("about.features.mobile") },
    { icon: <FaUserEdit />, text: t("about.features.custom") },
    { icon: <FaRocket />, text: t("about.features.tech") },
    { icon: <FaGamepad />, text: t("about.features.gamification") },
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

  if (loading) return <div className="loading-state">{t("about.loading")}</div>

  return (
    <div className={`about-wrapper ${isAr ? "rtl" : ""}`}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">{t("about.hero.label")}</span>
            <h1>{t("about.hero.title")}</h1>
            <p className="hero-desc">{t("about.hero.description")}</p>
          </motion.div>
        </div>
      </section>

      <div className="container">
        {/* Vision & Mission */}
        <section className="vision-mission-grid">
          <motion.div className="info-card" whileHover={{ y: -5 }}>
            <div className="card-accent gold" />
            <h2>{t("about.vision.title")}</h2>
            <p>{t("about.vision.desc")}</p>
          </motion.div>

          <motion.div className="info-card" whileHover={{ y: -5 }}>
            <div className="card-accent deep-purple" />
            <h2>{t("about.mission.title")}</h2>
            <p>{t("about.mission.desc")}</p>
          </motion.div>
        </section>

        {/* Orange Economy Block */}
        <section className="content-block">
          <div className="text-side">
            <span className="section-label">
              {t("about.orange_economy.label")}
            </span>
            <h2 className="purple-title">{t("about.orange_economy.title")}</h2>
            <p>{t("about.orange_economy.p1")}</p>
            <p style={{ marginTop: "15px" }}>{t("about.orange_economy.p2")}</p>
          </div>
          <div className="image-side">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800"
              alt="Orange Economy"
            />
          </div>
        </section>

        {/* Quote Section */}
        <section className="quote-section">
          <div className="quote-container">
            <p className="main-quote">"{t("about.quote")}"</p>
          </div>
        </section>

        {/* Uniqueness Block */}
        <section className="content-block inverted">
          <div className="text-side">
            <span className="section-label">{t("about.uniqueness.label")}</span>
            <h2 className="purple-title">{t("about.uniqueness.title")}</h2>
            <p>{t("about.uniqueness.p1")}</p>
            <p
              style={{
                marginTop: "15px",
                fontWeight: "bold",
                color: "var(--purple-deep)",
              }}
            >
              {t("about.uniqueness.p2")}
            </p>
          </div>
          <div className="image-side">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
              alt="Our Uniqueness"
            />
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-grid">
          {features.map((item, i) => (
            <motion.div key={i} className="feature-item" whileHover={{ y: -5 }}>
              <div className="feature-icon">{item.icon}</div>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </section>

        {/* Dynamic Sections from Backend */}
        {sections.map((item) => (
          <div key={item._id} className="content-block">
            <div className="text-side">
              <h2 className="purple-title">
                {isAr ? item.headerAr : item.header}
              </h2>
              <p>{isAr ? item.textAr : item.text}</p>
            </div>
            <div className="image-side">
              <img src={item.image} alt={item.header} />
            </div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="section-label">{t("about.team.label")}</span>
            <h2 className="purple-title">{t("about.team.title")}</h2>
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
