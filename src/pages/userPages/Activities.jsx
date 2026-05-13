import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "./Activities.css"

const Activities = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isAr = i18n.language === "ar"
  const token = localStorage.getItem("token")

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editLang, setEditLang] = useState("en")

  const [formData, setFormData] = useState({
    header: "",
    headerAr: "",
    text: "",
    textAr: "",
    image: "",
  })

  const resetForm = () => {
    setFormData({ header: "", headerAr: "", text: "", textAr: "", image: "" })
    setEditingId(null)
  }

  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/content/page/activities"
      )
      setActivities(
        res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const handleSave = async (e) => {
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
      } else {
        await axios.post(
          "http://localhost:3000/content",
          { ...formData, page: "activities" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      }
      await fetchActivities()
      setShowModal(false)
      resetForm()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (actId) => {
    if (
      !window.confirm(
        isAr
          ? "هل أنت متأكد من حذف هذا النشاط؟"
          : "Are you sure you want to delete this activity?"
      )
    )
      return
    try {
      await axios.delete(`http://localhost:3000/content/${actId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      await fetchActivities()
    } catch (err) {
      console.error(err)
    }
  }

  const currentActivity = activities.find((a) => a._id === id)

  if (loading)
    return (
      <div className="loading-screen">
        {isAr ? "جاري التحميل..." : "Loading..."}
      </div>
    )

  // --- 🌟 DETAIL VIEW 🌟 ---
  if (id && currentActivity) {
    return (
      <motion.div
        className={`activity-detail-page ${isAr ? "rtl-theme" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="detail-hero">
          <img
            src={currentActivity.image || "https://placehold.co/1200x600"}
            alt=""
            className="detail-hero-img"
          />
          <button
            className="back-nav-btn"
            onClick={() => navigate("/activities")}
          >
            {isAr ? "← العودة للأنسطة" : "← Back to Activities"}
          </button>
        </div>

        <div className="detail-content-container premium-card">
          <span className="activity-badge">{isAr ? "نشاط" : "Activity"}</span>
          <h1 className="detail-main-title">
            {isAr ? currentActivity.headerAr : currentActivity.header}
          </h1>
          <p className="detail-date">
            {new Date(currentActivity.createdAt).toLocaleDateString(
              isAr ? "ar-EG" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
          <div className="detail-body-text">
            {isAr ? currentActivity.textAr : currentActivity.text}
          </div>
        </div>
      </motion.div>
    )
  }

  // --- 🌟 LIST VIEW 🌟 ---
  return (
    <div className={`activities-hub ${isAr ? "rtl-theme" : ""}`}>
      {user?.admin && (
        <div className="admin-add-bar premium-card">
          <div className="admin-status">
            <span className="dot"></span>{" "}
            {isAr ? "إدارة الأنشطة" : "ACTIVITY ADMIN"}
          </div>
          <button
            className="btn-primary"
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
          >
            + {isAr ? "نشاط جديد" : "New Activity"}
          </button>
        </div>
      )}

      {/* Admin Modal */}
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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="modal-header-flex">
                <h3>
                  {editingId
                    ? isAr
                      ? "تعديل النشاط"
                      : "Edit Activity"
                    : isAr
                      ? "نشاط جديد"
                      : "New Activity"}
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
              <form onSubmit={handleSave} className="admin-form">
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
                  rows="5"
                  placeholder={editLang === "en" ? "Description" : "الوصف"}
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

      <section className="news-header">
        <div className="news-header-content">
          <h1 className="heading-primary">
            {isAr ? "أنشطتنا" : "Our Activities"}
          </h1>
          <p className="description-p">
            {isAr
              ? "تصفح آخر الفعاليات والمبادرات التي نقوم بها."
              : "The latest events and initiatives shaping our community."}
          </p>
        </div>
      </section>

      <section className="activities-grid-section">
        <div className="activities-grid">
          {activities.map((item) => (
            <motion.div
              key={item._id}
              className="activity-card premium-card"
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/activities/${item._id}`)}
            >
              {user?.admin && (
                <div
                  className="admin-card-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="action-circle-btn edit"
                    onClick={() => {
                      setFormData(item)
                      setEditingId(item._id)
                      setShowModal(true)
                    }}
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
              <div className="activity-img-box">
                <img src={item.image} alt="" />
              </div>
              <div className="activity-info">
                <h3 className="activity-title">
                  {isAr ? item.headerAr : item.header}
                </h3>
                <p className="activity-preview">
                  {isAr ? item.textAr : item.text}
                </p>
                <span className="activity-link-btn">
                  {isAr ? "تفاصيل النشاط" : "View Activity"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Activities
