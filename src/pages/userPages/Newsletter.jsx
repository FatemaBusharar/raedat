import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "./Newsletter.css"

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const Newsletter = ({ user }) => {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isAr = i18n.language === "ar"
  const token = localStorage.getItem("token")

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editLang, setEditLang] = useState("en")
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ text: "", type: "" })

  const [formData, setFormData] = useState({
    header: "",
    headerAr: "",
    text: "",
    textAr: "",
    image: "",
    buttonLink: "",
  })

  const fetchData = async () => {
    try {
      const newsRes = await axios.get("http://localhost:3000/content/page/newsletter")
      setNews(newsRes.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const showToast = (text, type = "success") => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: "", type: "" }), 3000)
  }

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

  const handleSaveNews = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/content/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        showToast(isAr ? "تم التحديث ✨" : "Updated ✨")
      } else {
        await axios.post("http://localhost:3000/content", {
          ...formData,
          page: "newsletter",
          layoutType: "standard",
        }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        showToast(isAr ? "تمت الإضافة ✅" : "Added ✅")
      }
      setShowModal(false)
      resetForm()
      fetchData()
    } catch (err) {
      showToast("Save Error ❌", "error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      showToast(isAr ? "تم الحذف 🗑️" : "Deleted 🗑️", "error")
      fetchData()
    } catch (err) {
      console.log(err)
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

  if (loading) return <div className="loading-screen">Loading...</div>

  return (
    <div className={`newsletter-wrapper ${isAr ? "rtl-theme" : ""}`}>
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`toast-notification ${message.type}`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {user?.admin && (
        <div className="admin-add-bar">
          <button
            className="btn-primary"
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
          >
            + {isAr ? "إضافة خبر" : "Add News"}
          </button>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="custom-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="admin-modal-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="modal-header-flex">
                <h3>{isAr ? "إضافة/تعديل خبر" : "News Editor"}</h3>
                <div className="lang-switch">
                  <button type="button" className={editLang === "en" ? "active" : ""} onClick={() => setEditLang("en")}>EN</button>
                  <button type="button" className={editLang === "ar" ? "active" : ""} onClick={() => setEditLang("ar")}>AR</button>
                </div>
              </div>

              <form onSubmit={handleSaveNews} className="admin-form">
                <input
                  className="clean-input"
                  placeholder={editLang === "en" ? "Title" : "العنوان"}
                  value={editLang === "en" ? formData.header : formData.headerAr}
                  onChange={(e) => setFormData(editLang === "en" ? { ...formData, header: e.target.value } : { ...formData, headerAr: e.target.value })}
                />
                <textarea
                  className="clean-input"
                  placeholder={editLang === "en" ? "Content" : "المحتوى"}
                  value={editLang === "en" ? formData.text : formData.textAr}
                  onChange={(e) => setFormData(editLang === "en" ? { ...formData, text: e.target.value } : { ...formData, textAr: e.target.value })}
                />
                <input
                  className="clean-input"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                <input
                  className="clean-input"
                  placeholder="Link (URL or Route)"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                />
                <div className="modal-footer">
                  <button type="button" onClick={() => setShowModal(false)}>{isAr ? "إلغاء" : "Cancel"}</button>
                  <button type="submit" className="btn-primary">{isAr ? "حفظ" : "Save"}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="news-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {news.map((item) => (
          <motion.div key={item._id} variants={itemReveal} className="news-card">
            <div className="news-img-wrapper">
              <img src={item.image} alt="" />
            </div>

            <div className="news-content">
              <span className="news-date">
                {new Date(item.createdAt || Date.now()).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
              </span>
              <h3 className="news-title">{isAr ? item.headerAr : item.header}</h3>
              <p className="news-excerpt">{isAr ? item.textAr : item.text}</p>

              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <button
                  className="read-more-btn"
                  onClick={() => {
                    if (!item.buttonLink) return
                    item.buttonLink.startsWith("http") ? window.open(item.buttonLink, "_blank") : navigate(item.buttonLink)
                  }}
                >
                  {isAr ? "اقرأ المزيد" : "Read More"}
                </button>

                {user?.admin && (
                  <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.8rem' }} onClick={() => openEditModal(item)}>
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                )}
              </div>
            </div>

            {user?.admin && (
              <div className="admin-card-actions">
                <button className="action-circle-btn delete" onClick={() => handleDelete(item._id)}>🗑️</button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Newsletter
