import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "./Newsletter.css"

// --- PREMIUM ANIMATIONS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const Newsletter = ({ user }) => {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isAr = i18n.language === "ar"
  const token = localStorage.getItem("token")

  const [news, setNews] = useState([])
  const [activities, setActivities] = useState([]) // For the "Smart Link" dropdown
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editLang, setEditLang] = useState("en")
  const [editingId, setEditingId] = useState(null)

  // Initial Form State
  const [formData, setFormData] = useState({
    header: "",
    headerAr: "",
    text: "",
    textAr: "",
    image: "",
    buttonLink: "",
  })

  const resetForm = () => {
    setFormData({
      header: "",
      headerAr: "",
      text: "",
      textAr: "",
      image: "",
      buttonLink: "",
    })
    setEditingId(null)
    setEditLang("en")
  }

  // --- DATA FETCHING ---
  const fetchData = async () => {
    try {
      // 1. Fetch Newsletter Items
      const newsRes = await axios.get(
        "http://localhost:3000/content/page/newsletter"
      )
      setNews(
        newsRes.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      )

      // 2. Fetch Activities (To populate the dropdown link)
      const actRes = await axios.get(
        "http://localhost:3000/content/page/activities"
      )
      setActivities(actRes.data)
    } catch (err) {
      console.error("Fetch Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // --- ADMIN ACTIONS ---
  const handleSaveNews = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        // UPDATE
        await axios.put(
          `http://localhost:3000/content/${editingId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      } else {
        // ADD NEW
        const newEntry = {
          ...formData,
          page: "newsletter",
          layoutType: "standard",
        }
        await axios.post("http://localhost:3000/content", newEntry, {
          headers: { Authorization: `Bearer ${token}` },
        })
      }
      await fetchData() // Instant UI Refresh
      setShowModal(false)
      resetForm()
    } catch (err) {
      console.error("Save Error:", err)
      alert(isAr ? "فشل الحفظ" : "Save Failed")
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm(isAr ? "هل أنت متأكد من الحذف؟" : "Confirm deletion?"))
      return
    try {
      await axios.delete(`http://localhost:3000/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      await fetchData()
    } catch (err) {
      console.error("Delete Error:", err)
    }
  }

  const openEditModal = (item) => {
    setFormData({
      header: item.header || "",
      headerAr: item.headerAr || "",
      text: item.text || "",
      textAr: item.textAr || "",
      image: item.image || "",
      buttonLink: item.buttonLink || "",
    })
    setEditingId(item._id)
    setShowModal(true)
  }

  if (loading)
    return (
      <div className="loading-screen">
        {isAr ? "جاري التحميل..." : "Loading..."}
      </div>
    )

  return (
    <div className={`newsletter-wrapper ${isAr ? "rtl-theme" : ""}`}>
      {/* 1. ADMIN TOP BAR */}
      {user?.admin && (
        <div className="admin-add-bar premium-card">
          <div className="admin-status">
            <span className="dot"></span>{" "}
            {isAr ? "إدارة الأخبار" : "NEWS ADMIN"}
          </div>
          <button
            className="btn-primary"
            style={{ padding: "10px 20px" }}
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
          >
            + {isAr ? "إضافة خبر" : "Add News"}
          </button>
        </div>
      )}

      {/* 2. ADMIN SMART MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="custom-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="admin-modal-box premium-card"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="modal-header-flex">
                <h3>
                  {editingId
                    ? isAr
                      ? "تعديل الخبر"
                      : "Edit Article"
                    : isAr
                      ? "خبر جديد"
                      : "New Article"}
                </h3>
                <div className="lang-switch">
                  <button
                    type="button"
                    onClick={() => setEditLang("en")}
                    className={editLang === "en" ? "active" : ""}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditLang("ar")}
                    className={editLang === "ar" ? "active" : ""}
                  >
                    AR
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveNews} className="admin-form">
                <input
                  className="clean-input"
                  placeholder={editLang === "en" ? "Title" : "العنوان"}
                  value={
                    editLang === "en" ? formData.header : formData.headerAr
                  }
                  onChange={(e) =>
                    setFormData(
                      editLang === "en"
                        ? { ...formData, header: e.target.value }
                        : { ...formData, headerAr: e.target.value }
                    )
                  }
                  required
                />
                <textarea
                  className="clean-input"
                  rows="4"
                  placeholder={
                    editLang === "en" ? "Excerpt / Content" : "محتوى الخبر"
                  }
                  value={editLang === "en" ? formData.text : formData.textAr}
                  onChange={(e) =>
                    setFormData(
                      editLang === "en"
                        ? { ...formData, text: e.target.value }
                        : { ...formData, textAr: e.target.value }
                    )
                  }
                  required
                />
                <input
                  className="clean-input"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />

                {/* 🌟 SMART LINK SELECTOR */}
                <div className="link-selector-group">
                  <label>
                    {isAr ? "ربط بنشاط موجود:" : "Link to existing Activity:"}
                  </label>
                  <select
                    className="clean-input"
                    value={formData.buttonLink}
                    onChange={(e) =>
                      setFormData({ ...formData, buttonLink: e.target.value })
                    }
                  >
                    <option value="">
                      {isAr ? "-- لا يوجد رابط --" : "-- No Link --"}
                    </option>
                    {activities.map((act) => (
                      <option key={act._id} value={`/activities/${act._id}`}>
                        {isAr ? act.headerAr : act.header}
                      </option>
                    ))}
                  </select>
                </div>

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
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO HEADER */}
      <header className="news-header">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="news-header-content"
        >
          <motion.h1 variants={itemReveal} className="heading-primary">
            {isAr ? "أحدث " : "Latest "}
            <span className="text-accent">{isAr ? "الاخبار" : "Updates"}</span>
          </motion.h1>

          <motion.p variants={itemReveal} className="description-p">
            {isAr
              ? "كل ما هو جديد في عالم رائدات والمشاريع القادمة."
              : "The central hub for all news and project reveals."}
          </motion.p>
        </motion.div>
      </header>

      {/* 4. NEWS LISTING */}
      <section className="news-feed-section">
        <div className="news-container">
          <motion.div
            className="news-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {news.map((item, index) => {
              const displayTitle = isAr
                ? item.headerAr || item.header
                : item.header
              const displayDate = new Date(item.createdAt).toLocaleDateString(
                isAr ? "ar-EG" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )
              const isFeatured = index === 0

              return (
                <motion.article
                  variants={itemReveal}
                  key={item._id}
                  className={`news-card premium-card ${isFeatured ? "featured-news" : ""}`}
                >
                  {user?.admin && (
                    <div className="admin-card-actions">
                      <button
                        className="action-circle-btn edit"
                        onClick={() => openEditModal(item)}
                      >
                        ✏️
                      </button>
                      <button
                        className="action-circle-btn delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  )}

                  <div className="news-img-wrapper">
                    <img
                      src={
                        item.image || "https://placehold.co/800x500?text=News"
                      }
                      alt={displayTitle}
                    />
                  </div>

                  <div className="news-content">
                    <span className="news-date">{displayDate}</span>
                    <h2 className="news-title">{displayTitle}</h2>
                    <p className="news-excerpt">
                      {isAr
                        ? item.textAr?.substring(0, 150)
                        : item.text?.substring(0, 150)}
                      ...
                    </p>

                    {/* BUTTON LINK LOGIC */}
                    <button
                      className="read-more-btn"
                      onClick={() => {
                        if (item.buttonLink) {
                          // If admin linked it to /activities/:id, go there
                          navigate(item.buttonLink)
                        } else {
                          // Fallback: If no link exists, stay on newsletter or show a popup
                          console.log("No link attached to this news item.")
                        }
                      }}
                    >
                      {isAr ? "اقرأ المزيد" : "Read More"}
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Newsletter
