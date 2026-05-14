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

  const teamMembers = [
    {
      name: t("about.team.members.0.name"),
      role: t("about.team.members.0.role"),
      image:
        "https://www.raedat.online/MediaManager/Library/11/Maryam%20Buzaboon.png",
    },
    {
      name: t("about.team.members.1.name"),
      role: t("about.team.members.1.role"),
      image:
        "https://www.raedat.online/MediaManager/Library/11/Oday%20Adel.png",
    },
    {
      name: t("about.team.members.2.name"),
      role: t("about.team.members.2.role"),
      image:
        "https://www.raedat.online/MediaManager/Library/11/Fayeza%20Ahmed%20.png",
    },
  ]

  const features = [
    {
      icon: <FaEdit />,
      text: t("about.features.0"),
    },
    {
      icon: <FaUsers />,
      text: t("about.features.1"),
    },
    {
      icon: <FaStore />,
      text: t("about.features.2"),
    },
    {
      icon: <FaMobileAlt />,
      text: t("about.features.3"),
    },
    {
      icon: <FaUserEdit />,
      text: t("about.features.4"),
    },
    {
      icon: <FaRocket />,
      text: t("about.features.5"),
    },
    {
      icon: <FaGamepad />,
      text: t("about.features.6"),
    },
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
        <section className="vision-mission-grid">
          <motion.div className="info-card" whileHover={{ y: -5 }}>
            <div className="card-accent gold" />

            <h2>{t("about.vision.title")}</h2>

            <p>{t("about.vision.description")}</p>
          </motion.div>

          <motion.div className="info-card" whileHover={{ y: -5 }}>
            <div className="card-accent deep-purple" />

            <h2>{t("about.mission.title")}</h2>

            <p>{t("about.mission.description")}</p>
          </motion.div>
        </section>

        <section className="content-block">
          <div className="text-side">
            <span className="section-label">
              {t("about.orangeEconomy.label")}
            </span>

            <h2 className="purple-title">{t("about.orangeEconomy.title")}</h2>

            <p>{t("about.orangeEconomy.paragraph1")}</p>

            <p style={{ marginTop: "15px" }}>
              {t("about.orangeEconomy.paragraph2")}
            </p>
          </div>

          <div className="image-side">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800"
              alt="Orange Economy"
            />
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-container">
            <p className="main-quote">{t("about.quote.text")}</p>
          </div>
        </section>

        <section className="content-block inverted">
          <div className="text-side">
            <span className="section-label">{t("about.uniqueness.label")}</span>

            <h2 className="purple-title">{t("about.uniqueness.title")}</h2>

            <p>{t("about.uniqueness.paragraph1")}</p>

            <p
              style={{
                marginTop: "15px",
                fontWeight: "bold",
                color: "var(--purple-deep)",
              }}
            >
              {t("about.uniqueness.paragraph2")}
            </p>
          </div>

          <div className="image-side">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
              alt="Our Uniqueness"
            />
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
