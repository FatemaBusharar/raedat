import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTranslation } from "react-i18next"
import "./AdminMessages.css"

const AdminMessages = () => {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get("http://localhost:3000/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const sortedMessages = res.data.sort((a, b) =>
        a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1
      )

      setMessages(sortedMessages)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(t("adminMessages.confirmDelete"))

    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("token")

      await axios.delete(`http://localhost:3000/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMessages(messages.filter((msg) => msg._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const toggleRead = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token")

      const newStatus = !Boolean(currentStatus)

      await axios.put(
        `http://localhost:3000/contact/read/${id}`,
        { isRead: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const updatedMessages = messages.map((msg) =>
        msg._id === id ? { ...msg, isRead: newStatus } : msg
      )

      updatedMessages.sort((a, b) =>
        a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1
      )

      setMessages([...updatedMessages])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="admin-messages-page">
      <div className="messages-container">
        <h1 className="messages-title">{t("adminMessages.title")}</h1>

        <div className="table-wrapper">
          <table className="messages-table">
            <thead>
              <tr>
                <th>{t("adminMessages.read")}</th>
                <th>{t("adminMessages.name")}</th>
                <th>{t("adminMessages.email")}</th>
                <th>{t("adminMessages.phone")}</th>
                <th>{t("adminMessages.subject")}</th>
                <th>{t("adminMessages.message")}</th>
                <th>{t("adminMessages.action")}</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className={msg.isRead ? "read-row" : "unread-row"}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={Boolean(msg.isRead)}
                      onChange={() => toggleRead(msg._id, msg.isRead)}
                    />
                  </td>

                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.phone}</td>
                  <td>{msg.subject}</td>
                  <td className="message-cell">{msg.message}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      {t("adminMessages.delete")}
                    </button>
                  </td>
                </tr>
              ))}

              {messages.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-text">
                    {t("adminMessages.empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminMessages
