import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "./Nav.css"
import logo from "../assets/logo.png"

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate()

  const { t, i18n } = useTranslation()

  const [open, setOpen] = useState(false)

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992

      setIsMobile(mobile)

      if (!mobile) {
        setOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLinkClick = () => {
    setOpen(false)
  }

  // HIDE CONTACT PAGE FOR ADMIN
  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    {
      to: "/activities",
      label: t("nav.activities"),
    },
    {
      to: "/community",
      label: t("nav.community"),
    },
    {
      to: "/newsletter",
      label: t("nav.newsletter"),
    },
    {
      to: "/partners",
      label: t("nav.partners"),
    },

    // ONLY SHOW CONTACT FOR NON ADMIN
    ...(!user?.admin
      ? [
          {
            to: "/contactUs",
            label: t("nav.contact"),
          },
        ]
      : []),
  ]

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-pinterest-p"></i>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar-main">
        <div className="nav-container">
          {/* TOP */}
          <div className="nav-top-row">
            {/* LANGUAGE */}
            <div className="lang-switch">
              <button
                className={i18n.language === "ar" ? "active" : ""}
                onClick={() => i18n.changeLanguage("ar")}
              >
                AR
              </button>

              <button
                className={i18n.language === "en" ? "active" : ""}
                onClick={() => i18n.changeLanguage("en")}
              >
                EN
              </button>
            </div>

            {/* LOGO */}
            <div className="logo-center">
              <img
                src={logo}
                alt="logo"
                className="logo-main"
                onClick={() => navigate("/")}
              />
            </div>

            {/* MOBILE BTN */}
            {isMobile ? (
              <button
                className={`menu-btn ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <div className="nav-placeholder"></div>
            )}
          </div>

          {/* LINKS */}
          <div
            className={`nav-links ${isMobile ? "mobile" : "desktop"} ${
              isMobile && open ? "active" : ""
            }`}
          >
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={handleLinkClick}>
                {link.label}
              </Link>
            ))}

            {/* ADMIN LINKS */}
            {user?.admin && (
              <>
                <Link to="/admin/messages" onClick={handleLinkClick}>
                  {t("nav.adminMessages") || "Admin Messages"}
                </Link>

                <Link to="/admin/create-admin" onClick={handleLinkClick}>
                  {t("nav.createAdmin") || "Create Admin"}
                </Link>
              </>
            )}

            {/* USER LINKS */}
            {user && (
              <>
                <Link to="/update-password" onClick={handleLinkClick}>
                  {t("nav.updatePassword") || "Update Password"}
                </Link>

                <button className="logout-btn" onClick={handleLogOut}>
                  {t("nav.logout") || "Logout"}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
