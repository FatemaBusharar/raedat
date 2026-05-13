import React from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "./Partners.css"

const Partners = () => {
  const { t } = useTranslation()

  const strategicPartners = [
    { link: "https://www.kaaf.bh/ar", img: "kaaf.png", alt: "kaaf_alt" },
    { link: "https://www.unido.org/", img: "unido.png", alt: "unido_alt" },
    {
      link: "https://thinksmartgulf.com/",
      img: "thinksmart.png",
      alt: "thinksmart_alt",
    },
    {
      link: "https://www.instagram.com/alrawibooks/?hl=ar",
      img: "alrawi.png",
      alt: "alrawi_alt",
    },
    {
      link: "https://kipinakids.com/kipina-nursery-school-bahrain/",
      img: "kipina.png",
      alt: "kipina_alt",
    },
    { link: "https://www.fywedo.com/", img: "fywedo.png", alt: "fywedo_alt" },
    {
      link: "https://www.instagram.com/bahwu/?hl=ar",
      img: "bahwu.png",
      alt: "bahwu_alt",
    },
    {
      link: "https://gtrust.org/",
      img: "goldenTrust.png",
      alt: "goldenTrust_alt",
    },
  ]

  return (
    <div className="venice-partners-page">
      {/* Hero Section */}
      <header className="partners-hero">
        <h1 className="hero-title">{t("partners.heroTitle")}</h1>

        <p className="hero-subtitle">{t("partners.heroSubtitle")}</p>

        <div className="gold-accent-line"></div>
      </header>

      <div className="partners-content-wrapper">
        {/* Media Partners */}
        <section className="venice-section">
          <div className="section-header">
            <span className="pre-title">{t("partners.media_preTitle")}</span>

            <h2 className="section-heading">{t("partners.media_title")}</h2>
          </div>

          <div className="luxury-logos-grid">
            <Link
              to="https://360moms.net/ar"
              target="_blank"
              className="logo-card"
            >
              <img
                src="src/assets/partners/moms.png"
                alt={t("partners.moms_alt")}
              />
            </Link>

            <Link
              to="https://www.albiladpress.com/"
              target="_blank"
              className="logo-card"
            >
              <img
                src="src/assets/partners/albilad.png"
                alt={t("partners.albilad_alt")}
              />
            </Link>

            <Link to="https://alroya.om/" target="_blank" className="logo-card">
              <img
                src="src/assets/partners/alroyaOm.png"
                alt={t("partners.alroya_alt")}
              />
            </Link>
          </div>
        </section>

        {/* Strategic Partners */}
        <section className="venice-section alt-bg">
          <div className="section-header">
            <span className="pre-title">
              {t("partners.strategic_preTitle")}
            </span>

            <h2 className="section-heading">{t("partners.strategic_title")}</h2>
          </div>

          <div className="luxury-logos-grid">
            {strategicPartners.map((p, index) => (
              <Link
                key={index}
                to={p.link}
                target="_blank"
                className="logo-card"
              >
                <img
                  src={`src/assets/partners/${p.img}`}
                  alt={t(`partners.${p.alt}`)}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section className="venice-section">
          <div className="section-header">
            <span className="pre-title">{t("partners.sponsors_preTitle")}</span>

            <h2 className="section-heading">{t("partners.sponsors_title")}</h2>
          </div>

          <div className="luxury-logos-grid centered-grid">
            <Link to="https://gfh.com/" target="_blank" className="logo-card">
              <img
                src="src/assets/partners/gfh.png"
                alt={t("partners.gfh_alt")}
              />
            </Link>

            <Link
              to="https://benefit.bh/"
              target="_blank"
              className="logo-card"
            >
              <img
                src="src/assets/partners/benefit.png"
                alt={t("partners.benefit_alt")}
              />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="partners-footer">
          <div className="footer-card">
            <p className="footer-statement">{t("partners.footerText")}</p>

            <div className="minimal-line"></div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Partners
