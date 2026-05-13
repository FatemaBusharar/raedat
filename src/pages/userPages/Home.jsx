import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "./Home.css"

// --- DND KIT IMPORTS ---
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const Home = ({ user }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === "ar"
  const token = localStorage.getItem("token")

  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLayoutPicker, setShowLayoutPicker] = useState(false)
  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    type: "alert",
    onConfirm: null,
  })

  // --- DND SENSORS ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

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

  // --- DRAG & DROP HANDLER ---
  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s._id === active.id)
      const newIndex = sections.findIndex((s) => s._id === over.id)

      const reordered = arrayMove(sections, oldIndex, newIndex)
      setSections(reordered)

      try {
        await axios.put(
          "http://localhost:3000/content/reorder",
          { sections: reordered },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      } catch (err) {
        console.error("Failed to sync new order", err)
      }
    }
  }

  // --- ADMIN ACTIONS ---
  const showConfirm = (message, onConfirm) => {
    setPopup({ isOpen: true, message, type: "confirm", onConfirm })
  }

  const closePopup = () => {
    setPopup({ isOpen: false, message: "", type: "alert", onConfirm: null })
  }

  const addNewSection = async (layoutType) => {
    try {
      const newBlock = {
        page: "home",
        layoutType,
        header: layoutType === "standard" ? "New Section" : "New Collection",
        text: layoutType === "standard" ? "Standard layout description." : "",
        image:
          "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
        items:
          layoutType !== "standard"
            ? [
                {
                  image: "https://placehold.co/800x600",
                  title: "Feature One",
                  desc: "Detail one.",
                },
                {
                  image: "https://placehold.co/800x600",
                  title: "Feature Two",
                  desc: "Detail two.",
                },
              ]
            : [],
      }

      const res = await axios.post("http://localhost:3000/content", newBlock, {
        headers: { Authorization: `Bearer ${token}` },
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
          headers: { Authorization: `Bearer ${token}` },
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
      {/* 1. POPUP SYSTEM */}
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
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
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

      {/* 2. ADMIN BAR */}
      {user?.admin && (
        <div className="admin-add-bar">
          <div className="admin-status">
            <span className="dot"></span> {isAr ? "لوحة التحكم" : "ADMIN"}
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
                Grid (Text)
              </button>
              <button onClick={() => addNewSection("grid-header")}>
                Grid (Header)
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

      {/* 3. STATIC HERO SECTION */}
      <section className="hero-section">
        <div className="hero-wrapper">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>
              {t("home.title_unlock")}   <span>{t("home.raedat")}</span>
            </h1>

            <p className="hero-desc">{t("home.desc_initiative")}</p><br /> <br />

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
            </div><br />

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
                src="/public/images/raedat_mokupApp.png"
                alt="app"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. STATIC HELLO SECTION */}
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

      {/* 5. DYNAMIC DRAGGABLE SECTIONS */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s._id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section, index) => (
            <SortableSection
              key={section._id}
              section={section}
              index={index}
              user={user}
              onDelete={deleteSection}
              navigate={navigate}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

// --- SORTABLE SECTION SUB-COMPONENT ---
const SortableSection = ({ section, index, user, onDelete, navigate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section._id })

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.4 : 1,
    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f5f5f7",
  }

  return (
    <div ref={setNodeRef} style={dndStyle} className="sortable-row">
      <section
        className={`about-section-custom section-layout-${section.layoutType || "standard"}`}
      >
        {/* DRAG HANDLE FOR ADMINS */}
        {user?.admin && (
          <div className="drag-handle-bar" {...attributes} {...listeners}>
            <div className="handle-pill">⠿ DRAG TO REORDER SECTION</div>
          </div>
        )}

        {/* CONTENT RENDERING */}
        {!section.layoutType || section.layoutType === "standard" ? (
          <div
            className="standard-flex"
            style={{ flexDirection: index % 2 !== 0 ? "row-reverse" : "row" }}
          >
            <div className="about-text-content">
              <h2 className="section-title-alt">{section.header}</h2>
              <p className="description-p">{section.text}</p>
              {user?.admin && (
                <div className="admin-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${section._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(section._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="about-image-content">
              <img src={section.image} className="about-main-img" alt="" />
            </div>
          </div>
        ) : (
          <div className="grid-layout-container">
            <h2 className="section-title-alt center-title">{section.header}</h2>
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
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit/${section._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(section._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
