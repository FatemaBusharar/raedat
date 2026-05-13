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

const About = ({ user }) => {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === "ar"

  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("token")

  const teamMembers = [
    {
      name: "Maryam Buzaboon",
      role: "Business Development Manager",
      image:
        "https://www.raedat.online/MediaManager/Library/11/Maryam%20Buzaboon.png",
    },
    {
      name: "Oday Adel",
      role: "Marketing Executive",
      image:
        "https://www.raedat.online/MediaManager/Library/11/Oday%20Adel.png",
    },
    {
      name: "Fayeza Ahmed",
      role: "Graphic Designer / Content Creator",
      image:
        "https://www.raedat.online/MediaManager/Library/11/Fayeza%20Ahmed%20.png",
    },
  ]

  const featuresKeys = [
    "post_content",
    "groups",
    "marketplace",
    "mobile_app",
    "customizable",
    "tech",
    "gamification",
  ]

  const featuresIcons = [
    <FaEdit />,
    <FaUsers />,
    <FaStore />,
    <FaMobileAlt />,
    <FaUserEdit />,
    <FaRocket />,
    <FaGamepad />,
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

  if (loading) return <div>{t("about.loading")}</div>

  return (
    <div className={`about-wrapper ${isAr ? "rtl" : ""}`}>
      {/* HERO */}
      <section className="about-hero">
        <div className="hero-overlay">
          <span className="section-label">{t("about.hero_label")}</span>
          <h1>{t("about.hero_title")}</h1>
          <p className="hero-desc">{t("about.hero_text")}</p>
        </div>
      </section>

      <div className="container">
        {/* VISION / MISSION */}
        <section className="vision-mission-grid">
          <motion.div className="info-card" whileHover={{ y: -5 }}>
            <div className="card-accent gold" />
            <h2>{t("about.vision_title")}</h2>
            <p>{t("about.vision_text")}</p>
          </motion.div>

          <motion.div className="info-card" whileHover={{ y: -5 }}>
            <div className="card-accent deep-purple" />
            <h2>{t("about.mission_title")}</h2>
            <p>{t("about.mission_text")}</p>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="features-grid">
          {featuresKeys.map((key, i) => (
            <motion.div key={i} className="feature-item" whileHover={{ y: -5 }}>
              <div className="feature-icon">{featuresIcons[i]}</div>
              <p>{t(`about.features.${key}`)}</p>
            </motion.div>
          ))}
        </section>

        {/* TEAM */}
        <section className="team-grid">
          {teamMembers.map((m, i) => (
            <motion.div key={i} className="team-card" whileHover={{ y: -10 }}>
              <div className="team-img-wrapper">
                <img src={m.image} alt={m.name} />
              </div>
              <h3>{m.name}</h3>
              <p className="role-text">{m.role}</p>
            </motion.div>
          ))}
        </section>

        {/* DYNAMIC CONTENT (API) */}
        {sections.map((item) => (
          <motion.div key={item._id} className="content-block">
            <div className="text-side">
              <h2 className="purple-title">
                {isAr ? item.headerAr : item.header}
              </h2>
              <p>{isAr ? item.textAr : item.text}</p>
            </div>

            <div className="image-side">
              <img src={item.image} alt="" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default About
