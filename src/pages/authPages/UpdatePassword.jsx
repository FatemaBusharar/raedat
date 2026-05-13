import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "./UpdatePassword.css"

const UpdatePassword = ({ user }) => {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language.startsWith("ar")

  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  const [password, setPassword] = useState(initialState)

  const navigate = useNavigate()

  const id = localStorage.getItem("userID")
  const token = localStorage.getItem("token")

  const handleChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!id || id === "null") {
      alert(t("updatePassword.sessionExpired"))
      return navigate("/sign-in")
    }

    if (password.newPassword !== password.confirmPassword) {
      return alert(t("updatePassword.passwordMismatch"))
    }

    try {
      const { oldPassword, newPassword } = password

      await axios.put(
        `http://localhost:3000/auth/update-password/${id}`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      alert(t("updatePassword.success"))

      setPassword(initialState)

      navigate("/")
    } catch (error) {
      alert(error.response?.data || t("updatePassword.failed"))
    }
  }

  useEffect(() => {
    if (!token) navigate("/sign-in")
  }, [token, navigate])

  if (!token) return null

  return (
    <div className={`venice-page-wrapper ${isAr ? "rtl" : ""}`}>
      <header className="venice-hero">
        <div className="hero-text-container">
          <h1 className="hero-main-title">{t("updatePassword.heroTitle")}</h1>

          <p className="hero-tagline">{t("updatePassword.heroSubtitle")}</p>
        </div>

        <div className="hero-image-frame">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
            alt={t("updatePassword.heroImageAlt")}
            className="professional-security-img"
          />
        </div>
      </header>

      <div className="intro-bar">
        <span>{t("updatePassword.introBar")}</span>
      </div>

      <main className="venice-main">
        <section className="venice-info-section">
          <h2 className="venice-heading">
            {t("updatePassword.headingLine1")}
            <br />
            {t("updatePassword.headingLine2")}
          </h2>

          <p className="venice-description">
            {t("updatePassword.description")}
          </p>

          <div className="gold-accent-line"></div>
        </section>

        <section className="venice-form-section">
          <div className="form-bg-box">
            <form className="venice-secure-form" onSubmit={handleSubmit}>
              <div className="venice-input-field">
                <label>{t("updatePassword.currentPassword")}</label>

                <input
                  type="password"
                  name="oldPassword"
                  placeholder={t("updatePassword.currentPasswordPlaceholder")}
                  onChange={handleChange}
                  value={password.oldPassword}
                  required
                />
              </div>

              <div className="venice-input-field">
                <label>{t("updatePassword.newPassword")}</label>

                <input
                  type="password"
                  name="newPassword"
                  placeholder={t("updatePassword.newPasswordPlaceholder")}
                  onChange={handleChange}
                  value={password.newPassword}
                  required
                />
              </div>

              <div className="venice-input-field">
                <label>{t("updatePassword.confirmPassword")}</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t("updatePassword.confirmPasswordPlaceholder")}
                  onChange={handleChange}
                  value={password.confirmPassword}
                  required
                />
              </div>

              <button type="submit" className="venice-submit-btn">
                {t("updatePassword.submitButton")}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default UpdatePassword
