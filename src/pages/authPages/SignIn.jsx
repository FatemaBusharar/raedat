import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useTranslation } from "react-i18next"
import "./SignIn.css"

const SignIn = ({ setUser }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/sign-in",
        formValues
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userID", res.data.user.id)
      setUser(res.data.user)
      navigate("/")
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || t("signin.errorDefault"))
    }
  }

  return (
    <div className="venice-signin-page">
      <header className="venice-signin-hero">
        <div className="hero-text-side">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            className="signin-mini-logo"
          />
          <h1 className="hero-main-title">{t("signin.heroTitle")}</h1>
          <p className="hero-tagline">{t("signin.heroTagline")}</p>
        </div>

        <div className="hero-image-frame">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070"
            alt="Professional Workspace"
            className="signin-hero-img"
          />
        </div>
      </header>

      <div className="intro-accent-bar">
        <span>{t("signin.authorizedNotice")}</span>
      </div>

      <main className="venice-signin-main">
        <section className="signin-info-content">
          <h2 className="venice-heading">
            {t("signin.welcomeTitle").split(" ")[0]} <br />
            {t("signin.welcomeTitle").split(" ")[1]}
          </h2>

          <p className="venice-description">{t("signin.description")}</p>

          <div className="gold-accent-line"></div>
        </section>

        <section className="signin-form-section">
          <div className="form-decorative-box">
            <form className="venice-login-form" onSubmit={handleSubmit}>
              <h3 className="form-internal-title">{t("signin.formTitle")}</h3>

              <div className="venice-input-group">
                <label>{t("signin.emailLabel")}</label>
                <input
                  name="email"
                  type="email"
                  placeholder={t("signin.emailPlaceholder")}
                  onChange={handleChange}
                  value={formValues.email}
                  required
                />
              </div>

              <div className="venice-input-group">
                <label>{t("signin.passwordLabel")}</label>
                <input
                  name="password"
                  type="password"
                  placeholder={t("signin.passwordPlaceholder")}
                  onChange={handleChange}
                  value={formValues.password}
                  required
                />
              </div>

              {errorMessage && (
                <p className="venice-error-msg">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="venice-access-btn"
                disabled={!formValues.email || !formValues.password}
              >
                {t("signin.submitButton")}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SignIn
