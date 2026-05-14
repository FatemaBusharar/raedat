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
          <h1>{t("community.hero.title")}</h1>

          <p>{t("community.hero.description")}</p>
        </div>
      </div>

      <div className="community-inner-content">
        <div className="color-strip"></div>

        <div className="section-badge">{t("community.platform.badge")}</div>

        <h2 className="sec-title">
          {t("community.platform.title1")}{" "}
          <span>{t("community.platform.title2")}</span>
        </h2>

        <div className="pillars-small-grid">
          <div className="vcard-mini">
            <div className="v-icon-mini">:film_projector:</div>
            <h4>{t("community.platform.items.0")}</h4>
          </div>

          <div className="vcard-mini">
            <div className="v-icon-mini">:date:</div>
            <h4>{t("community.platform.items.1")}</h4>
          </div>

          <div className="vcard-mini">
            <div className="v-icon-mini">:mortar_board:</div>
            <h4>{t("community.platform.items.2")}</h4>
          </div>

          <div className="vcard-mini">
            <div className="v-icon-mini">:shopping_bags:</div>
            <h4>{t("community.platform.items.3")}</h4>
          </div>

          <div className="vcard-mini">
            <div className="v-icon-mini">
              :rightwards_hand::skin-tone-2:‍:leftwards_hand::skin-tone-2:
            </div>
            <h4>{t("community.platform.items.4")}</h4>
          </div>
        </div>

        <div className="section-badge">{t("community.individuals.badge")}</div>

        <h2 className="sec-title">
          {t("community.individuals.title1")}{" "}
          <span>{t("community.individuals.title2")}</span>
        </h2>

        <div className="values-grid">
          <div className="vcard">
            <div className="v-icon">:seedling:</div>

            <h4>{t("community.individuals.cards.0.title")}</h4>

            <p>{t("community.individuals.cards.0.description")}</p>
          </div>

          <div className="vcard">
            <div className="v-icon">:handshake:</div>

            <h4>{t("community.individuals.cards.1.title")}</h4>

            <p>{t("community.individuals.cards.1.description")}</p>
          </div>

          <div className="vcard">
            <div className="v-icon">:art:</div>

            <h4>{t("community.individuals.cards.2.title")}</h4>

            <p>{t("community.individuals.cards.2.description")}</p>
          </div>
        </div>

        <div className="section-badge">{t("community.communities.badge")}</div>

        <h2 className="sec-title">
          {t("community.communities.title1")}{" "}
          <span>{t("community.communities.title2")}</span>
        </h2>

        <div className="values-grid">
          <div className="vcard">
            <div className="v-icon">:rocket:</div>

            <h4>{t("community.communities.cards.0.title")}</h4>

            <p>{t("community.communities.cards.0.description")}</p>
          </div>

          <div className="vcard">
            <div className="v-icon">:classical_building:</div>

            <h4>{t("community.communities.cards.1.title")}</h4>

            <p>{t("community.communities.cards.1.description")}</p>
          </div>

          <div className="vcard">
            <div className="v-icon">:earth_africa:</div>

            <h4>{t("community.communities.cards.2.title")}</h4>

            <p>{t("community.communities.cards.2.description")}</p>
          </div>
        </div>

        <div className="users-wrap">
          <div className="section-badge">{t("community.network.badge")}</div>

          <h2 className="sec-title">
            {t("community.network.title1")}{" "}
            <span>{t("community.network.title2")}</span>
          </h2>

          <div className="users-grid">
            <div className="utag">
              <span className="u-icon">:convenience_store:</span>
              <span>{t("community.network.users.0")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">:book:</span>
              <span>{t("community.network.users.1")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">:trophy:</span>
              <span>{t("community.network.users.2")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">:performing_arts:</span>
              <span>{t("community.network.users.3")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">:rocket:</span>
              <span>{t("community.network.users.4")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">:briefcase:</span>
              <span>{t("community.network.users.5")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">:female-technologist:</span>
              <span>{t("community.network.users.6")}</span>
            </div>

            <div className="utag">
              <span className="u-icon">:handshake:</span>
              <span>{t("community.network.users.7")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
