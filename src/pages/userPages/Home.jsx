import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "./Home.css"

const Home = ({ user }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const isAr = i18n.language === "ar"

  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLayoutPicker, setShowLayoutPicker] = useState(false)

  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    type: "alert",
    onConfirm: null,
  })

  const token = localStorage.getItem("token")

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/content/page/home")

        setSections(res.data)
      } catch (err) {
        console.error("Error fetching content", err)
      } finally {
        setLoading(false)
      }
    }

    getHomeContent()
  }, [])

  const showAlert = (message) => {
    setPopup({
      isOpen: true,
      message,
      type: "alert",
    })
  }

  const showConfirm = (message, onConfirm) => {
    setPopup({
      isOpen: true,
      message,
      type: "confirm",
      onConfirm,
    })
  }

  const closePopup = () => {
    setPopup({
      isOpen: false,
      message: "",
      type: "alert",
      onConfirm: null,
    })
  }

  const addNewSection = async (layoutType) => {
    try {
      const newBlock = {
        page: "home",
        layoutType,
        header: layoutType === "standard" ? "New ra'edat Section" : "",
        text: layoutType === "standard" ? "Standard layout description." : "",
        image:
          "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
        items:
          layoutType !== "standard"
            ? [
                {
                  image: "https://placehold.co/800x600",
                  title: "Premium Feature",
                  desc: "Showcase your best tools here.",
                },
                {
                  image: "https://placehold.co/800x600",
                  title: "Dynamic Layout",
                  desc: "Adapts perfectly to any screen.",
                },
              ]
            : [],
      }

      const res = await axios.post("http://localhost:3000/content", newBlock, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setSections((prev) => [...prev, res.data])
      setShowLayoutPicker(false)
    } catch (error) {
      console.error("Failed to add section", error)
    }
  }

  const deleteSection = (id) => {
    showConfirm(isAr ? "حذف هذا القسم؟" : "Delete this section?", async () => {
      try {
        await axios.delete(`http://localhost:3000/content/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setSections(sections.filter((s) => s._id !== id))
      } catch (err) {
        console.error("Delete failed", err)
      }

      closePopup()
    })
  }

  if (loading) return <div className="loading-screen">Loading...</div>

  return (
    <div className={`home-page ${isAr ? "rtl-theme" : ""}`}>
      <AnimatePresence>
        {popup.isOpen && (
          <motion.div
            className="custom-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="custom-popup-box"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
            >
              <h3>{isAr ? "تنبيه" : "Notice"}</h3>

              <p>{popup.message}</p>

              <div className="popup-actions">
                {popup.type === "confirm" ? (
                  <>
                    <button
                      className="popup-btn popup-cancel"
                      onClick={closePopup}
                    >
                      {isAr ? "إلغاء" : "Cancel"}
                    </button>

                    <button
                      className="popup-btn popup-confirm"
                      onClick={popup.onConfirm}
                    >
                      {isAr ? "تأكيد" : "Confirm"}
                    </button>
                  </>
                ) : (
                  <button className="popup-btn popup-ok" onClick={closePopup}>
                    {isAr ? "حسناً" : "OK"}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {user?.admin && (
        <div className="admin-add-bar">
          <div className="admin-status">
            <span className="dot"></span>
            {isAr ? "لوحة التحكم" : "ADMIN"}
          </div>

          {!showLayoutPicker ? (
            <button
              className="add-btn"
              onClick={() => setShowLayoutPicker(true)}
            >
              + Add Section
            </button>
          ) : (
            <div className="layout-options">
              <button onClick={() => addNewSection("standard")}>
                Standard
              </button>

              <button onClick={() => addNewSection("grid-text")}>
                Image + Text
              </button>

              <button onClick={() => addNewSection("grid-header")}>
                Image + Header
              </button>

              <button
                className="popup-cancel"
                onClick={() => setShowLayoutPicker(false)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-wrapper">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>
              {t("home.title_unlock")} <span>{t("home.raedat")}</span>
            </h1>

            <p className="hero-desc">{t("home.desc_initiative")}</p>

            <div className="hero-buttons">
              <Link to="/community" className="join-btn">
                {t("home.Join")}
              </Link>

              <button
                className="read-more-btn"
                onClick={() => navigate("/about")}
              >
                {isAr ? "تعرفي علينا" : "Learn More"}
              </button>
            </div>

            <div className="store-links">
              <a
                href="https://apps.apple.com/us/app/raedat/id6742032306"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="store-img"
                  src="/src/assets/home/store.png"
                  alt="App Store"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=online.raedat.app"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="google-img"
                  src="/src/assets/home/google.png"
                  alt="Google Play"
                />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: isAr ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="phone-frame">
              <img
                className="app-img"
                src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
                alt="app"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* HELLO SECTION */}
      <section className="hello-section">
        <div className="hello-wrapper">
          <motion.div
            className="hello-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>{t("home.title_hello")}</h2>

            <p>{t("home.desc_initiative")}</p>

            <Link to="/about" className="read-more-btn">
              {t("home.btn_read_more")}
            </Link>
          </motion.div>

          <motion.div
            className="hello-image"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              className="home-img"
              src="https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg"
              alt="hello"
            />
          </motion.div>
        </div>
      </section>

      {/* DYNAMIC SECTIONS */}
      {sections.map((section, index) => (
        <motion.section
          key={section._id}
          className={`about-section-custom section-layout-${
            section.layoutType || "standard"
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f5f5f7",
          }}
        >
          {!section.layoutType || section.layoutType === "standard" ? (
            <div
              className="standard-flex"
              style={{
                flexDirection: index % 2 !== 0 ? "row-reverse" : "row",
              }}
            >
              <div className="about-text-content">
                <h2 className="section-title-alt">{section.header}</h2>

                <p className="description-p">{section.text}</p>

                {user?.admin && (
                  <AdminActions
                    id={section._id}
                    onDelete={deleteSection}
                    navigate={navigate}
                  />
                )}
              </div>

              <div className="about-image-content">
                <img src={section.image} className="about-main-img" alt="" />
              </div>
            </div>
          ) : (
            <div className="grid-layout-container">
              <h2 className="section-title-alt center-title">
                {section.header}
              </h2>

              <div className="custom-grid">
                {section.items?.map((item, i) => (
                  <div key={i} className="grid-item">
                    <img src={item.image} alt="" />

                    {section.layoutType === "grid-header" ? (
                      <h3>{item.title}</h3>
                    ) : (
                      <p>{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>

              {user?.admin && (
                <div className="center-actions">
                  <AdminActions
                    id={section._id}
                    onDelete={deleteSection}
                    navigate={navigate}
                  />
                </div>
              )}
            </div>
          )}
        </motion.section>
      ))}
    </div>
  )
}

const AdminActions = ({ id, onDelete, navigate }) => {
  return (
    <div className="admin-actions">
      <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)}>
        Edit
      </button>

      <button className="btn-delete" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  )
}

export default Home
