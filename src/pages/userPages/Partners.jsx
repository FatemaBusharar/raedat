import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "./Partners.css"

// --- ANIMATIONS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemReveal = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const Partners = ({ user }) => {
  const { t, i18n } = useTranslation()

  const isAr = i18n.language === "ar"

  const token = localStorage.getItem("token")

  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)

  const [message, setMessage] = useState({
    text: "",
    type: "",
  })

  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    onConfirm: null,
  })

  // ✅ UPDATED
  const [formData, setFormData] = useState({
    image: "",
    buttonLink: "",
    partnerType: "strategic",
  })

  // --- STATIC DATA ---
  const staticMedia = [
    {
      link: "https://360moms.net/ar",
      img: "moms.png",
    },
    {
      link: "https://www.albiladpress.com/",
      img: "albilad.png",
    },
    {
      link: "https://alroya.om/",
      img: "alroyaOm.png",
    },
  ]

  const staticStrategic = [
    {
      link: "https://www.kaaf.bh/ar",
      img: "kaaf.png",
    },
    {
      link: "https://www.unido.org/",
      img: "unido.png",
    },
    {
      link: "https://thinksmartgulf.com/",
      img: "thinksmart.png",
    },
    {
      link: "https://www.instagram.com/alrawibooks/",
      img: "alrawi.png",
    },
    {
      link: "https://kipinakids.com/",
      img: "kipina.png",
    },
    {
      link: "https://www.fywedo.com/",
      img: "fywedo.png",
    },
    {
      link: "https://gtrust.org/",
      img: "goldenTrust.png",
    },
  ]

  const staticSponsors = [
    {
      link: "https://gfh.com/",
      img: "gfh.png",
    },
    {
      link: "https://benefit.bh/",
      img: "benefit.png",
    },
  ]

  // --- FETCH ---
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/content/page/partners")

      setPartners(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.log(err)
      setPartners([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // --- TOAST ---
  const showToast = (text, type = "success") => {
    setMessage({ text, type })

    setTimeout(() => {
      setMessage({
        text: "",
        type: "",
      })
    }, 3000)
  }

  // --- SAVE ---
  const handleSave = async (e) => {
    e.preventDefault()

    try {
      const payload = {
        image: formData.image,
        buttonLink: formData.buttonLink,
        partnerType: formData.partnerType,
        page: "partners",
      }

      console.log("SENDING:", payload)

      const res = await axios.post("http://localhost:3000/content", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("SUCCESS:", res.data)

      showToast(
        isAr ? "تمت إضافة الشريك بنجاح ✨" : "Partner added successfully ✨"
      )

      setShowModal(false)

      // ✅ RESET
      setFormData({
        image: "",
        buttonLink: "",
        partnerType: "strategic",
      })

      fetchData()
    } catch (err) {
      console.log("FULL ERROR:", err)

      console.log("SERVER RESPONSE:", err.response?.data)

      showToast(err.response?.data?.message || "Server Error", "error")
    }
  }

  // --- DELETE ---
  const handleDelete = (id) => {
    setPopup({
      isOpen: true,
      message: isAr ? "هل تريد حذف هذا الشريك؟" : "Delete this partner?",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:3000/content/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          showToast(isAr ? "تم حذف الشريك" : "Partner deleted", "error")

          setPopup({
            isOpen: false,
            message: "",
            onConfirm: null,
          })

          fetchData()
        } catch (err) {
          console.log(err)

          setPopup({
            isOpen: false,
            message: "",
            onConfirm: null,
          })
        }
      },
    })
  }

  // ✅ UPDATED
  const getDynamic = (type) => {
    return partners.filter((p) => p.partnerType === type)
  }

  if (loading) {
    return <div className="loading-screen">...</div>
  }

  return (
    <div className={`venice-partners-page ${isAr ? "rtl-theme" : ""}`}>
      {/* POPUP */}
      <AnimatePresence>
        {popup.isOpen && (
          <div className="custom-popup-overlay">
            <motion.div
              className="custom-popup-box"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <p>{popup.message}</p>

              <div className="popup-actions">
                <button
                  className="popup-btn popup-cancel"
                  onClick={() =>
                    setPopup({
                      isOpen: false,
                      message: "",
                      onConfirm: null,
                    })
                  }
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>

                <button
                  className="popup-btn popup-confirm"
                  onClick={popup.onConfirm}
                >
                  {isAr ? "تأكيد" : "Confirm"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            className={`toast-notification ${message.type}`}
            initial={{
              y: -50,
              x: "-50%",
            }}
            animate={{
              y: 30,
              x: "-50%",
            }}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN BAR */}
      {user?.admin && (
        <div className="admin-add-bar premium-card">
          <div className="admin-status">
            <span className="dot"></span>

            {isAr ? "إدارة الشركاء" : "PARTNERS ADMIN"}
          </div>

          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + {isAr ? "إضافة شريك" : "Add Partner"}
          </button>
        </div>
      )}

      {/* HERO */}
      <header className="partners-hero">
        <h1 className="hero-title">{t("partners.heroTitle")}</h1>

        <div className="gold-accent-line"></div>
      </header>

      <div className="partners-content-wrapper">
        {/* MEDIA */}
        <section className="venice-section">
          <h2 className="section-heading">{t("partners.media_title")}</h2>

          <motion.div
            className="luxury-logos-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {staticMedia.map((p, i) => (
              <motion.div
                key={i}
                variants={itemReveal}
                className="logo-card-wrapper"
              >
                <Link to={p.link} target="_blank" className="logo-card">
                  <img src={`/src/assets/partners/${p.img}`} alt="" />
                </Link>
              </motion.div>
            ))}

            {getDynamic("media").map((p) => (
              <motion.div
                key={p._id}
                variants={itemReveal}
                className="logo-card-wrapper"
              >
                <Link to={p.buttonLink} target="_blank" className="logo-card">
                  <img src={p.image} alt="" />
                </Link>

                {user?.admin && (
                  <button
                    className="delete-overlay-btn"
                    onClick={() => handleDelete(p._id)}
                  >
                    ×
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* STRATEGIC */}
        <section className="venice-section alt-bg">
          <h2 className="section-heading">{t("partners.strategic_title")}</h2>

          <motion.div
            className="luxury-logos-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {staticStrategic.map((p, i) => (
              <motion.div
                key={i}
                variants={itemReveal}
                className="logo-card-wrapper"
              >
                <Link to={p.link} target="_blank" className="logo-card">
                  <img src={`/src/assets/partners/${p.img}`} alt="" />
                </Link>
              </motion.div>
            ))}

            {getDynamic("strategic").map((p) => (
              <motion.div
                key={p._id}
                variants={itemReveal}
                className="logo-card-wrapper"
              >
                <Link to={p.buttonLink} target="_blank" className="logo-card">
                  <img src={p.image} alt="" />
                </Link>

                {user?.admin && (
                  <button
                    className="delete-overlay-btn"
                    onClick={() => handleDelete(p._id)}
                  >
                    ×
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SPONSORS */}
        <section className="venice-section">
          <h2 className="section-heading">{t("partners.sponsors_title")}</h2>

          <motion.div
            className="luxury-logos-grid centered-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {staticSponsors.map((p, i) => (
              <motion.div
                key={i}
                variants={itemReveal}
                className="logo-card-wrapper"
              >
                <Link to={p.link} target="_blank" className="logo-card">
                  <img src={`/src/assets/partners/${p.img}`} alt="" />
                </Link>
              </motion.div>
            ))}

            {getDynamic("sponsor").map((p) => (
              <motion.div
                key={p._id}
                variants={itemReveal}
                className="logo-card-wrapper"
              >
                <Link to={p.buttonLink} target="_blank" className="logo-card">
                  <img src={p.image} alt="" />
                </Link>

                {user?.admin && (
                  <button
                    className="delete-overlay-btn"
                    onClick={() => handleDelete(p._id)}
                  >
                    ×
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="custom-popup-overlay">
            <motion.div
              className="admin-modal-box small-modal"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              <h3>{isAr ? "إضافة شريك جديد" : "Add New Partner"}</h3>

              <form onSubmit={handleSave} className="admin-form">
                <input
                  className="clean-input"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.value,
                    })
                  }
                  required
                />

                <input
                  className="clean-input"
                  placeholder="Website Link"
                  value={formData.buttonLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buttonLink: e.target.value,
                    })
                  }
                />

                {/* ✅ UPDATED */}
                <select
                  className="clean-input"
                  value={formData.partnerType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      partnerType: e.target.value,
                    })
                  }
                >
                  <option value="strategic">Strategic Partner</option>

                  <option value="media">Media Partner</option>

                  <option value="sponsor">Sponsor</option>
                </select>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setShowModal(false)}
                  >
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>

                  <button type="submit" className="btn-primary">
                    {isAr ? "حفظ" : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Partners
