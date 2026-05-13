import React from "react"
import { useTranslation } from "react-i18next"
import "./Community.css"

const Community = () => {
  const { t } = useTranslation()

  return (
    <div className="community-page-wrapper">
      <div className="video-hero">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/videos/meeting_video.mp4" type="video/mp4" />
        </video>

        <div className="video-overlay-filter"></div>

        <div className="hero-content">
          <h1>{t("community.title")}</h1>
          <p>{t("community.description")}</p>
        </div>
      </div>

      <div className="community-inner-content">
        <div className="color-strip"></div>

        {/* Pillars Section */}
        <div className="section-badge">{t("community.pillars_title")}</div>

        <h2 className="sec-title">
          {t("community.pillars_heading_start")}{" "}
          <span className="o">{t("community.pillars_heading_highlight")}</span>
        </h2>

        <p className="sec-sub">{t("community.pillars_sub")}</p>

        <div className="pillars-row">
          <div className="pillar-pill">
            <span className="gem">📽️</span>
            {t("community.pillars.live_streaming")}
          </div>

          <div className="pillar-pill">
            <span className="gem">📅</span>
            {t("community.pillars.events_management")}
          </div>

          <div className="pillar-pill">
            <span className="gem">🎓</span>
            {t("community.pillars.online_courses")}
          </div>

          <div className="pillar-pill">
            <span className="gem">🛍️</span>
            {t("community.pillars.souq")}
          </div>

          <div className="pillar-pill">
            <span className="gem">🫱🏻‍🫲🏻</span>
            {t("community.pillars.community_support")}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Values / Individuals Section */}
        <div className="section-badge">{t("community.values_title")}</div>

        <h2 className="sec-title">
          {t("community.individuals_heading_start")}{" "}
          <span className="p">
            {t("community.individuals_heading_highlight")}
          </span>
        </h2>

        <p className="sec-sub">{t("community.individuals_sub")}</p>

        <div className="values-grid">
          <div className="vcard lavender">
            <div className="v-icon">🌱</div>

            <h4>{t("community.individuals.personal_growth_title")}</h4>

            <p>{t("community.individuals.personal_growth_text")}</p>
          </div>

          <div className="vcard soft">
            <div className="v-icon">🤝</div>

            <h4>{t("community.individuals.networking_title")}</h4>

            <p>{t("community.individuals.networking_text")}</p>
          </div>

          <div className="vcard peach">
            <div className="v-icon">🎨</div>

            <h4>{t("community.individuals.creative_expression_title")}</h4>

            <p>{t("community.individuals.creative_expression_text")}</p>
          </div>
        </div>

        {/* Users Section */}
        <div className="users-wrap">
          <div className="section-badge">{t("community.users_title")}</div>

          <h2 className="sec-title">
            {t("community.users_heading_start")}{" "}
            <span className="o">{t("community.users_heading_highlight")}</span>{" "}
            {t("community.users_heading_end")}
          </h2>

          <p className="sec-sub">{t("community.users_sub")}</p>

          <div className="users-grid">
            <div className="utag">
              <span className="u-icon">🏪</span>
              <span>{t("community.users.businesses")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">📖</span>
              <span>{t("community.users.educators")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">🏆</span>
              <span>{t("community.users.coaches")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">🎭</span>
              <span>{t("community.users.creators")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">🚀</span>
              <span>{t("community.users.startups")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
