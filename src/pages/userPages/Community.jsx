import React from "react"
import { useTranslation } from "react-i18next"
import "./Community.css"

const Community = () => {
  const { t } = useTranslation()

  return (
    <div className="community-page-wrapper">
      {/* قسم الفيديو الرئيسي */}
      <div className="video-hero">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/videos/meeting_video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay-filter"></div>
        <div className="hero-content">
          <h1>{t("community.hero.title")}</h1>
          <p>{t("community.hero.description")}</p>
        </div>
      </div>

      <div className="community-inner-content">
        <div className="color-strip"></div>

        {/* ركائز المنصة */}
        <div className="section-badge">{t("community.pillars.badge")}</div>
        <h2 className="sec-title">
          {t("community.pillars.title")}{" "}
          <span>{t("community.pillars.titleSpan")}</span>
        </h2>

        <div className="pillars-small-grid">
          <div className="vcard-mini">
            <div className="v-icon-mini">📽️</div>
            <h4>{t("community.pillars.items.liveStreaming")}</h4>
          </div>
          <div className="vcard-mini">
            <div className="v-icon-mini">📅</div>
            <h4>{t("community.pillars.items.eventsManagement")}</h4>
          </div>
          <div className="vcard-mini">
            <div className="v-icon-mini">🎓</div>
            <h4>{t("community.pillars.items.onlineCourses")}</h4>
          </div>
          <div className="vcard-mini">
            <div className="v-icon-mini">🛍️</div>
            <h4>{t("community.pillars.items.souqRaedat")}</h4>
          </div>
          <div className="vcard-mini">
            <div className="v-icon-mini">🫱🏻‍🫲🏻</div>
            <h4>{t("community.pillars.items.communitySupport")}</h4>
          </div>
        </div>

        {/* قسم الأفراد - القيم */}
        <div className="section-badge">{t("community.values.badge")}</div>
        <h2 className="sec-title">
          {t("community.values.title")}{" "}
          <span>{t("community.values.titleSpan")}</span>
        </h2>
        <div className="values-grid">
          <div className="vcard">
            <div className="v-icon">🌱</div>
            <h4>{t("community.values.growth.title")}</h4>
            <p>{t("community.values.growth.desc")}</p>
          </div>
          <div className="vcard">
            <div className="v-icon">🤝</div>
            <h4>{t("community.values.networking.title")}</h4>
            <p>{t("community.values.networking.desc")}</p>
          </div>
          <div className="vcard">
            <div className="v-icon">🎨</div>
            <h4>{t("community.values.expression.title")}</h4>
            <p>{t("community.values.expression.desc")}</p>
          </div>
        </div>

        {/* قسم المجتمعات - الأثر */}
        <div className="section-badge">{t("community.impact.badge")}</div>
        <h2 className="sec-title">
          {t("community.impact.title")}{" "}
          <span>{t("community.impact.titleSpan")}</span>
        </h2>
        <div className="values-grid">
          <div className="vcard">
            <div className="v-icon">🚀</div>
            <h4>{t("community.impact.empowerment.title")}</h4>
            <p>{t("community.impact.empowerment.desc")}</p>
          </div>
          <div className="vcard">
            <div className="v-icon">🏛️</div>
            <h4>{t("community.impact.heritage.title")}</h4>
            <p>{t("community.impact.heritage.desc")}</p>
          </div>
          <div className="vcard">
            <div className="v-icon">🌍</div>
            <h4>{t("community.impact.collective.title")}</h4>
            <p>{t("community.impact.collective.desc")}</p>
          </div>
        </div>

        {/* شبكة المستخدمين */}
        <div className="users-wrap">
          <div className="section-badge">{t("community.network.badge")}</div>
          <h2 className="sec-title">
            {t("community.network.title")}{" "}
            <span>{t("community.network.titleSpan")}</span>
          </h2>
          <div className="users-grid">
            <div className="utag">
              <span className="u-icon">🏪</span>
              <span>{t("community.network.tags.businesses")}</span>
            </div>
            <div className="utag">
              <span className="u-icon">📖</span>
              <span>{t("community.network.tags.educators")}</span>
            </div>
            <div className="utag">
              <span className="u-icon">🏆</span>
              <span>{t("community.network.tags.mentors")}</span>
            </div>
            <div className="utag">
              <span className="u-icon">🎭</span>
              <span>{t("community.network.tags.creators")}</span>
            </div>
            <div className="utag">
              <span className="u-icon">🚀</span>
              <span>{t("community.network.tags.startups")}</span>
            </div>
            <div className="utag">
              <span className="u-icon">💼</span>
              <span>{t("community.network.tags.entrepreneurs")}</span>
            </div>
            <div className="utag">
              <span className="u-icon">👩‍💻</span>
              <span>{t("community.network.tags.solopreneurs")}</span>
            </div>
            <div className="utag">
              <span className="u-icon">🤝</span>
              <span>{t("community.network.tags.nonProfit")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
