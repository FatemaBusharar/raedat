import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "./Newsletter.css"

// --- ANIMATION ---
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
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [editLang, setEditLang] = useState("en")
  const [editingId, setEditingId] = useState(null)

  const [message, setMessage] = useState({ text: "", type: "" })

  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    onConfirm: null,
  })

  const [formData, setFormData] = useState({
    header: "",
    headerAr: "",
    text: "",
    textAr: "",
    image: "",
    buttonLink: "",
  })

  // --- FETCH ---
  const fetchData = async () => {
    try {
      const newsRes = await axios.get(
        "http://localhost:3000/content/page/newsletter"
      )

      const actRes = await axios.get(
        "http://localhost:3000/content/page/activities"
      )

      setNews(newsRes.data)
      setActivities(actRes.data)
    } catch (err) {
      console.log(err)
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
    setTimeout(() => setMessage({ text: "", type: "" }), 3000)
  }

  // --- RESET ---
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

  // --- SAVE ---
  const handleSaveNews = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/content/${editingId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        showToast(isAr ? "تم التحديث ✨" : "Updated ✨")
      } else {
        await axios.post(
          "http://localhost:3000/content",
          {
            ...formData,
            page: "newsletter",
            layoutType: "standard",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        showToast(isAr ? "تمت الإضافة ✅" : "Added ✅")
      }

      setShowModal(false)
      resetForm()
      fetchData()
    } catch (err) {
      console.log(err)
      showToast("Save Error ❌", "error")
    }
  }

  // --- DELETE ---
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

  // --- EDIT ---
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

  // --- LOADING ---
  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  return (
    <div className={`newsletter-wrapper ${isAr ? "rtl-theme" : ""}`}>
      {/* TOAST */}
      <AnimatePresence>
        {message.text && (
          <motion.div className={`toast-notification ${message.type}`}>
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN BAR */}
      {user?.admin && (
        <div className="admin-add-bar premium-card">
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

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="custom-popup-overlay">
            <motion.div className="admin-modal-box premium-card">
              {/* HEADER + LANG SWITCH */}
              <div className="modal-header-flex">
                <h3>{isAr ? "خبر" : "News"}</h3>

                <div className="lang-switch">
                  <button
                    type="button"
                    className={editLang === "en" ? "active" : ""}
                    onClick={() => setEditLang("en")}
                  >
                    EN
                  </button>

                  <button
                    type="button"
                    className={editLang === "ar" ? "active" : ""}
                    onClick={() => setEditLang("ar")}
                  >
                    AR
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveNews} className="admin-form">
                {/* TITLE */}
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
                />

                {/* TEXT */}
                <textarea
                  className="clean-input"
                  placeholder={editLang === "en" ? "Content" : "المحتوى"}
                  value={editLang === "en" ? formData.text : formData.textAr}
                  onChange={(e) =>
                    setFormData(
                      editLang === "en"
                        ? { ...formData, text: e.target.value }
                        : { ...formData, textAr: e.target.value }
                    )
                  }
                />

                {/* IMAGE */}
                <input
                  className="clean-input"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />

                {/* LINK (EXTERNAL + INTERNAL) */}
                <input
                  className="clean-input"
                  placeholder="https://link.com or /activities/123"
                  value={formData.buttonLink}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonLink: e.target.value })
                  }
                />

                {/* FOOTER */}
                <div className="modal-footer">
                  <button type="button" onClick={() => setShowModal(false)}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>

                  <button type="submit">{isAr ? "حفظ" : "Save"}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEWS LIST */}
      <motion.div className="news-grid" variants={staggerContainer}>
        {news.map((item) => (
          <motion.div
            key={item._id}
            variants={itemReveal}
            className="news-card"
          >
            <img src={item.image} alt="" />

            <h3>{isAr ? item.headerAr : item.header}</h3>

            <p>{isAr ? item.textAr : item.text}</p>

            {/* FIXED LINK HANDLER */}
            <button
              onClick={() => {
                if (!item.buttonLink) return

                if (item.buttonLink.startsWith("http")) {
                  window.open(item.buttonLink, "_blank")
                } else {
                  navigate(item.buttonLink)
                }
              }}
            >
              {isAr ? "اقرأ المزيد" : "Read More"}
            </button>

            {user?.admin && (
              <button onClick={() => openEditModal(item)}>Edit</button>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Newsletter
