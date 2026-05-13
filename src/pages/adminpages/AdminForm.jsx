import React, { useState } from "react"
import axios from "axios"
import { useTranslation } from "react-i18next"
import "./AdminForm.css"

const AdminForm = () => {
  const { t } = useTranslation()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [status, setStatus] = useState("") // idle | loading | success | error
  const [message, setMessage] = useState("")
  const [showPass, setShowPass] = useState(false)

  const resetMessage = () => {
    setStatus("")
    setMessage("")
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    resetMessage()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (status === "loading") return

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setStatus("error")
      setMessage(t("adminForm.messages.fillAllFields"))
      return
    }

    if (form.password !== form.confirmPassword) {
      setStatus("error")
      setMessage(t("adminForm.messages.passwordMismatch"))
      return
    }

    try {
      setStatus("loading")

      const token = localStorage.getItem("token")

      if (!token) {
        setStatus("error")
        setMessage(t("adminForm.messages.loginRequired"))
        return
      }

      const { data } = await axios.post(
        "http://localhost:3000/auth/create-admin",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "admin",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      console.log(data)

      setStatus("success")
      setMessage(t("adminForm.messages.success"))

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.log("CREATE ADMIN ERROR:", error)

      setStatus("error")
      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          t("adminForm.messages.serverError")
      )
    }
  }

  return (
    <div className="create-admin-page">
      <div className="create-admin-container">
        <h1 className="create-admin-title">{t("adminForm.title")}</h1>

        <form className="create-admin-form" onSubmit={handleSubmit}>
          {/* NAME */}
          <input
            autoFocus
            type="text"
            name="name"
            placeholder={t("adminForm.placeholders.name")}
            value={form.name}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder={t("adminForm.placeholders.email")}
            value={form.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder={t("adminForm.placeholders.password")}
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showPass ? "text" : "password"}
              name="confirmPassword"
              placeholder={t("adminForm.placeholders.confirmPassword")}
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* TOGGLE PASSWORD */}
          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPass((prev) => !prev)}
          >
            {showPass
              ? t("adminForm.buttons.hidePassword")
              : t("adminForm.buttons.showPassword")}
          </button>

          {/* MESSAGE */}
          {message && <p className={`message ${status}`}>{message}</p>}

          {/* SUBMIT */}
          <button
            type="submit"
            className="create-admin-btn"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? t("adminForm.buttons.loading")
              : t("adminForm.buttons.submit")}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminForm
