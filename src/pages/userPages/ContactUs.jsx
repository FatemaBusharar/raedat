import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import "./ContactUs.css"

const ContactUs = () => {
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/contact", formData)
      setSuccess(t("contact.success"))
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="contact-page">
      {/* ── HERO ── */}
      <div className="contact-hero">
        <div className="contact-hero-inner">
          <h1>{t("contact.company")}</h1>

          <div className="contact-hero-meta">
            <div className="contact-meta-item">
              <div className="contact-meta-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-meta-text">
                <span className="contact-meta-label">
                  {t("contact.address_label") || "Address"}
                </span>
                <span className="contact-meta-value">
                  {t("contact.address")}
                </span>
              </div>
            </div>

            <div className="contact-meta-item">
              <div className="contact-meta-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-meta-text">
                <span className="contact-meta-label">
                  {t("contact.email_label") || "Email"}
                </span>
                <span className="contact-meta-value">{t("contact.email")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="contact-body">
        {/* LEFT — Info */}
        <div className="contact-info">
          <p className="contact-info-eyebrow">
            {t("contact.reach_out") || "Reach out"}
          </p>
          <h2 className="contact-info-title">
            {t("contact.form_title") || "We'd love to hear from you"}
          </h2>
          <p className="contact-info-desc">
            {t("contact.form_desc") ||
              "Fill in the form and we'll get back to you as soon as possible."}
          </p>
          <div className="contact-divider" />
        </div>

        {/* RIGHT — Form */}
        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>{t("contact.full_name")}</label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.full_name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>{t("contact.email_placeholder")}</label>
                <input
                  type="email"
                  name="email"
                  placeholder={t("contact.email_placeholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>{t("contact.phone")}</label>
                <input
                  type="number"
                  name="phone"
                  placeholder={t("contact.phone")}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>{t("contact.subject")}</label>
                <input
                  type="text"
                  name="subject"
                  placeholder={t("contact.subject")}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>{t("contact.message")}</label>
              <textarea
                name="message"
                placeholder={t("contact.message")}
                value={formData.message}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.style.height = ""
                  e.target.style.height = `${e.target.scrollHeight}px`
                }}
                required
              />
            </div>

            <div className="form-submit-row">
              <button type="submit" className="contact-submit-btn">
                {t("contact.submit")}
              </button>
              {success && <p className="contact-success">{success}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
