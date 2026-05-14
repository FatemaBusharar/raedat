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
  const [message, setMessage] = useState({ text: "", type: "" })

  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    type: "alert",
    onConfirm: null,
  })

  const [formData, setFormData] = useState({
    header: "",
    headerAr: "",
    text: "",
    textAr: "",
    image: "",
  })

  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/content/page/activities"
      )
      setActivities(
        res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const showToast = (text, type = "success") => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: "", type: "" }), 3000)
  }

  const closePopup = () => {
    setPopup({ isOpen: false, message: "", type: "alert", onConfirm: null })
  }

  const showConfirm = (message, onConfirm) => {
    setPopup({ isOpen: true, message, type: "confirm", onConfirm })
  }

  const resetForm = () => {
    setFormData({ header: "", headerAr: "", text: "", textAr: "", image: "" })
    setEditingId(null)
  }

  const openEditModal = (item) => {
    setFormData({
      header: item.header || "",
      headerAr: item.headerAr || "",
      text: item.text || "",
      textAr: item.textAr || "",
      image: item.image || "",
    })
    setEditingId(item._id)
    setShowModal(true)
  }

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
        showToast(isAr ? "تم التحديث بنجاح ✨" : "Updated successfully ✨")
      } else {
        await axios.post(
          "http://localhost:3000/content",
          { ...formData, page: "activities" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        showToast(isAr ? "تمت الإضافة بنجاح ✅" : "Added successfully ✅")
      }
      fetchActivities()
      setShowModal(false)
      resetForm()
    } catch (err) {
      showToast(isAr ? "حدث خطأ ❌" : "Error ❌", "error")
    }
  }

  const handleDelete = (actId) => {
    showConfirm(
      isAr ? "هل أنت متأكد من حذف هذا النشاط؟" : "Are you sure?",
      async () => {
        try {
          await axios.delete(`http://localhost:3000/content/${actId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          showToast(isAr ? "تم الحذف بنجاح 🗑️" : "Deleted 🗑️", "error")
          setActivities(activities.filter((a) => a._id !== actId))
          closePopup()
          if (id) navigate("/activities")
        } catch (err) {
          showToast("Error", "error")
          closePopup()
        }
      }
    )
  }

  const renderCustomPopup = () => (
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
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
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
  )

  const renderAdminModal = () => (
    <motion.div
      className="custom-popup-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="admin-modal-box"
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
        <form
          onSubmit={handleSave}
          className="admin-form"
          dir={editLang === "ar" ? "rtl" : "ltr"}
        >
          <input
            className="clean-input"
            placeholder={editLang === "en" ? "Title" : "العنوان"}
            value={editLang === "en" ? formData.header : formData.headerAr}
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
            rows="8"
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
            className="clean-input ltr"
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
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ backgroundColor: "#8e7dbe" }}
            >
              {isAr ? "حفظ" : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )

  if (loading)
    return (
      <div className="loading-screen">
        {isAr ? "جاري التحميل..." : "Loading..."}
      </div>
    )

  const currentActivity = activities.find((a) => a._id === id)

  // =========================================
  // DETAIL VIEW (Cinematic Article Layout)
  // =========================================
  if (id && currentActivity) {
    return (
      <motion.div
        className={`activity-detail-master ${isAr ? "rtl-theme" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {renderCustomPopup()}

        {/* 1. CINEMATIC HERO */}
        <div className="detail-cinematic-hero">
          <div className="hero-overlay-gradient"></div>
          <img
            src={currentActivity.image || "https://placehold.co/1200x600"}
            alt={isAr ? currentActivity.headerAr : currentActivity.header}
            className="detail-hero-img"
          />

          <button
            className="back-glass-btn"
            onClick={() => navigate("/activities")}
          >
            {isAr ? "← العودة للأنشطة" : "← Back to Activities"}
          </button>

          {user?.admin && (
            <div className="admin-floating-actions">
              <button
                className="action-circle-btn edit"
                onClick={() => openEditModal(currentActivity)}
              >
                ✏️
              </button>
              <button
                className="action-circle-btn delete"
                onClick={() => handleDelete(currentActivity._id)}
              >
                🗑️
              </button>
            </div>
          )}
        </div>

        {/* 2. PREMIUM ARTICLE CONTAINER */}
        <div className="detail-article-container">
          <div className="detail-meta-header">
            <span className="premium-badge">
              {isAr ? "نشاط مجتمعي" : "Community Activity"}
            </span>
            <span className="detail-date-pill">
              {new Date(currentActivity.createdAt).toLocaleDateString(
                isAr ? "ar-EG" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          </div>

          <h1 className="detail-display-title">
            {isAr ? currentActivity.headerAr : currentActivity.header}
          </h1>

          <div className="detail-prose">
            {isAr ? currentActivity.textAr : currentActivity.text}
          </div>
        </div>

        <AnimatePresence>{showModal && renderAdminModal()}</AnimatePresence>
      </motion.div>
    )
  }

  // =========================================
  // HUB VIEW (List Layout)
  // =========================================
  return (
    <div className={`activities-hub ${isAr ? "rtl-theme" : ""}`}>
      {renderCustomPopup()}
      <AnimatePresence>
        {message.text && (
          <motion.div
            className={`toast-notification ${message.type}`}
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 30, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {user?.admin && (
        <div className="admin-add-bar">
          <div className="admin-status">
            <span className="dot"></span>{" "}
            {isAr ? "إدارة الأنشطة" : "ACTIVITY ADMIN"}
          </div>
          <button
            className="btn-primary"
            style={{
              backgroundColor: "#8e7dbe",
              borderRadius: "50px",
              padding: "8px 24px",
              color: "white",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
          >
            + {isAr ? "نشاط جديد" : "New Activity"}
          </button>
        </div>
      )}

      <header className="news-header">
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
      </header>

      <section className="activities-grid">
        {activities.map((item) => (
          <motion.div
            key={item._id}
            className="activity-card-new"
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/activities/${item._id}`)}
          >
            <div className="activity-card-img">
              <img src={item.image || "https://placehold.co/400x300"} alt="" />
              {user?.admin && (
                <div
                  className="admin-card-actions-fixed"
                  onClick={(e) => e.stopPropagation()}
                >
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
            </div>

            <div className="activity-card-body">
              <span className="activity-card-date">
                {new Date(item.createdAt).toLocaleDateString(
                  isAr ? "ar-EG" : "en-US"
                )}
              </span>
              <h3 className="activity-card-title">
                {isAr ? item.headerAr : item.header}
              </h3>
              <p className="activity-card-text">
                {isAr
                  ? item.textAr?.substring(0, 100)
                  : item.text?.substring(0, 100)}
                ...
              </p>
              <button className="activity-card-btn">
                {isAr ? "تفاصيل النشاط" : "View Activity"}
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      <AnimatePresence>{showModal && renderAdminModal()}</AnimatePresence>
    </div>
  )
}

export default Activities
