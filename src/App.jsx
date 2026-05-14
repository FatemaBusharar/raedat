import "./App.css"
import { useState, useEffect } from "react"
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"
import axios from "axios"
import { useTranslation } from "react-i18next"

// USER PAGES
import Home from "./pages/userPages/Home"
import About from "./pages/userPages/About"
import Activities from "./pages/userPages/Activities"
import Community from "./pages/userPages/Community"
import ContactUs from "./pages/userPages/ContactUs"
import Newsletter from "./pages/userPages/Newsletter"
import Partners from "./pages/userPages/Partners"

// AUTH / ADMIN PAGES
import SignIn from "./pages/authPages/SignIn"
import UpdatePassword from "./pages/authPages/UpdatePassword"
import AdminMessages from "./pages/adminPages/AdminMessages"
import AdminForm from "./pages/adminPages/AdminForm"
import EditContent from "./pages/adminpages/EditContent"

// COMPONENTS
import Nav from "./components/Nav"
import Footer from "./components/Footer"

const App = () => {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const { i18n } = useTranslation()

  const isArabic = i18n.language === "ar"

  const checkToken = async () => {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const res = await axios.get("http://localhost:3000/auth/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser(res.data)
      } catch (error) {
        console.log(error)

        localStorage.clear()
        setUser(null)
      }
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate("/")
  }

  return (
    <div
      className={`App ${isArabic ? "lang-ar" : "lang-en"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Nav user={user} handleLogOut={handleLogOut} />

      <main style={{ marginTop: "100px" }}>
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home user={user} />} />

          <Route path="/about" element={<About user={user} />} />

          <Route path="/activities" element={<Activities user={user} />} />

          <Route path="/activities/:id" element={<Activities user={user} />} />

          <Route path="/community" element={<Community user={user} />} />

          <Route path="/contactUs" element={<ContactUs user={user} />} />

          <Route path="/newsletter" element={<Newsletter user={user} />} />

          <Route path="/partners" element={<Partners user={user} />} />

          {/* AUTH */}
          <Route path="/admin" element={<SignIn setUser={setUser} />} />

          <Route
            path="/update-password"
            element={<UpdatePassword user={user} />}
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/messages"
            element={
              user?.admin ? (
                <AdminMessages user={user} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/admin/create-admin"
            element={user?.admin ? <AdminForm /> : <Navigate to="/" replace />}
          />
          <Route
            path="/edit/:id"
            element={
              user?.admin ? <EditContent /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
