import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./EditContent.css"

const EditContent = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    header: "",
    headerAr: "",
    text: "",
    textAr: "",
    image: "",
    items: [],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editLang, setEditLang] = useState("ar")

  const token = localStorage.getItem("token")

  useEffect(() => {
    const getSection = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/content/${id}`)
        const data = res.data?.data || res.data
        setFormData({
          ...data,
          items: data?.items || [],
          header: data?.header || "",
          headerAr: data?.headerAr || "",
          text: data?.text || "",
          textAr: data?.textAr || "",
        })
      } catch (err) {
        console.error("Fetch Error:", err)
        setError("Could not load section data.")
      } finally {
        setLoading(false)
      }
    }

    if (id) getSection()
    else {
      setError("Invalid ID")
      setLoading(false)
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3000/content/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("تم الحفظ بنجاح!")
      navigate("/")
    } catch (err) {
      console.error("Save Error:", err)
      alert(err.response?.data?.message || "فشل الحفظ.")
    }
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...(formData.items || [])]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setFormData((prev) => ({ ...prev, items: updatedItems }))
  }

  if (loading) {
    return (
      <div className="edit-center">
        <div className="edit-spinner" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="edit-center">
        <p className="edit-error">{error}</p>
      </div>
    )
  }

  const isAr = editLang === "ar"

  return (
    <div className="edit-page">
      <div className="edit-card">
        <div
          className="edit-card-header"
          style={{ flexDirection: isAr ? "row" : "row-reverse" }}
        >
          <div className="edit-status">
            <span className="edit-status-dot" />
            <span className="edit-status-text">تعديل القسم</span>
          </div>
          <h2 className="edit-title">
            {isAr ? "تعديل المحتوى" : "Edit Content"}
          </h2>
        </div>

        <div className="edit-toggle-wrap">
          <div className="edit-toggle-box">
            <button
              onClick={() => setEditLang("ar")}
              className={`edit-lang-btn ${editLang === "ar" ? "active" : ""}`}
            >
              AR
            </button>
            <button
              onClick={() => setEditLang("en")}
              className={`edit-lang-btn ${editLang === "en" ? "active" : ""}`}
            >
              EN
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="edit-form"
          dir={isAr ? "rtl" : "ltr"}
        >
          <input
            value={isAr ? formData.headerAr : formData.header}
            onChange={(e) =>
              setFormData({
                ...formData,
                [isAr ? "headerAr" : "header"]: e.target.value,
              })
            }
            placeholder={isAr ? "العنوان" : "Section Header"}
            className="edit-input"
          />

          {(!formData.layoutType || formData.layoutType === "standard") && (
            <>
              <textarea
                value={isAr ? formData.textAr : formData.text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [isAr ? "textAr" : "text"]: e.target.value,
                  })
                }
                placeholder={isAr ? "الوصف" : "Description"}
                className="edit-textarea"
              />
              <input
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="Image URL"
                className="edit-input ltr"
              />
            </>
          )}

          {formData.items?.length > 0 && (
            <div>
              <h3 className="edit-items-label">{isAr ? "العناصر" : "Items"}</h3>
              {formData.items.map((item, index) => (
                <div key={index} className="edit-item-box">
                  <input
                    value={item.image || ""}
                    onChange={(e) =>
                      handleItemChange(index, "image", e.target.value)
                    }
                    placeholder="Image URL"
                    className="edit-input ltr"
                  />
                  <input
                    value={item.title || item.desc || ""}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        formData.layoutType === "grid-header"
                          ? "title"
                          : "desc",
                        e.target.value
                      )
                    }
                    placeholder={isAr ? "النص" : "Text"}
                    className="edit-input"
                  />
                </div>
              ))}
            </div>
          )}

          <div
            className="edit-btn-row"
            style={{ flexDirection: isAr ? "row" : "row-reverse" }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              className="edit-cancel-btn"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
            <button type="submit" className="edit-save-btn">
              {isAr ? "حفظ" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditContent
