import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/home.css";

import accessories from "@/assets/images/Accessories.png";
import earBand from "@/assets/images/EarBand.png";
import headBand from "@/assets/images/HeadBand.png";
import hurryUpMan from "@/assets/images/HurryUpMan.png";
import iphone14pro from "@/assets/images/Iphone14pro.png";
import iphoneCarousel from "@/assets/images/iphoneCarousel.png";
import samsungCarousel from "@/assets/images/samsungCarousel.png";
import honorCarousel from "@/assets/images/honorCarousel.png";
import popularHeadphones from "@/assets/images/popularHeadphones.png";
import ipadPro from "@/assets/images/ipadPro.png";
import samsungGalaxy from "@/assets/images/samsungGalaxy.png";
import macbookPro from "@/assets/images/macbookPro.png";


export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(".reveal-section");

    sections.forEach((sec, i) => {
      gsap.fromTo(
        sec,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 85%" },
        }
      );

      const items = sec.querySelectorAll(
        ".card, .product-card, .tile, .promo-right, .special-hero"
      );
      if (items.length) {
        gsap.fromTo(
          items,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: sec, start: "top 90%" },
          }
        );
      }
    });
  }, []);

  return (
    <main>
      <section className="section reveal-section" id="homecarousel">
        <div className="container">
          <div className="row g-4 feedback-row">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={i}
                    className={i === 0 ? "active" : ""}
                    aria-current={i === 0 ? "true" : undefined}
                  ></button>
                ))}
              </div>

              <div className="carousel-inner rounded-4 overflow-hidden shadow-sm">
                <div className="carousel-item active">
                  <img src={iphoneCarousel} className="d-block w-100" alt="iPhone" />
                </div>
                <div className="carousel-item">
                  <img src={samsungCarousel} className="d-block w-100" alt="Samsung" />
                </div>
                <div className="carousel-item">
                  <img src={honorCarousel} className="d-block w-100" alt="Honor" />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal-section" id="collectionSection">
        <div className="container">
          <div className="section-sub">Featured</div>
          <div className="section-title">Shop Collection</div>

          <div className="collection-grid">
            <div className="tile big">
              <div className="tile-image">
                <img src={headBand} alt="Headband" />
              </div>
              <div className="tile-text">
                <h5>Headband</h5>
                <small>Collection →</small>
              </div>
            </div>

            <div className="tile">
              <div className="tile-image">
                <img src={earBand} alt="Earbuds" />
              </div>
              <div className="tile-text">
                <h6>Earbuds</h6>
                <small>Collection →</small>
              </div>
            </div>

            <div className="tile">
              <div className="tile-image">
                <img src={accessories} alt="Accessories" />
              </div>
              <div className="tile-text">
                <h6>Accessories</h6>
                <small>Collection →</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal-section" id="promoSection">
        <div className="container">
          <div className="section-sub">Featured</div>
          <div className="section-title">Promotion</div>

          <div className="promo-split mt-4">
            <div className="promo-left" style={{ backgroundImage: `url(${hurryUpMan})` }}></div>
            <div className="promo-right">
              <div>
                <div className="small text-uppercase text-muted">Promotion</div>
                <h3>Hurry up! 40% OFF</h3>
                <p className="small text-muted">
                  Thousands of high tech are waiting for you
                </p>

                <div className="promo-countdown">
                  {[
                    ["02", "Days"],
                    ["12", "Hours"],
                    ["45", "Minutes"],
                    ["05", "Seconds"],
                  ].map(([num, label], i) => (
                    <div key={i} className="bg-white text-dark p-2 rounded text-center">
                      <div style={{ fontWeight: 700, fontSize: 20 }}>{num}</div>
                      <div className="small text-muted">{label}</div>
                    </div>
                  ))}
                </div>

                <a className="btn btn-dark btn-sm mt-3" href="/shop">
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="specialSection" className="reveal-section mb-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <div className="small text-muted">Our Products</div>
              <h3 className="section-title">Special promotion</h3>
            </div>
          </div>

          <div className="special-hero">
            <div className="hero-content">
              <div className="small text-uppercase text-muted">Pro.Beyond</div>
              <h2 className="hero-title">IPhone 14 Pro</h2>
              <p className="hero-sub">
                Created to change everything for the better. For everyone.
              </p>
              <a className="btn btn-outline-light" href="/shop">
                Shop Now
              </a>
            </div>

            <div className="hero-image-wrap">
              <div
                className="hero-image"
                style={{ backgroundImage: `url(${iphone14pro})` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white reveal-section" id="productsSection">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <div className="small text-muted">Our Products</div>
              <div className="section-title">Explore Our Products</div>
            </div>
            <a className="btn btn-outline-secondary btn-sm" href="#">
              View All
            </a>
          </div>

 
          <div className="row g-4">
            {[
              { img: popularHeadphones, title: "Popular Products", desc: "High-quality sound with long battery life.", dark: false },
              { img: ipadPro, title: "Ipad Pro", desc: "Powerful performance in a sleek design.", dark: false },
              { img: samsungGalaxy, title: "Samsung Galaxy", desc: "Stunning display and great camera.", dark: false },
              { img: macbookPro, title: "Macbook Pro", desc: "Creative powerhouse for professionals.", dark: true },
            ].map((p, i) => (
              <div className="col-md-3" key={i}>
                <div
                  className="product-card"
                  style={p.dark ? { background: "#2b2b2b", color: "#fff" } : undefined}
                >
                  <img src={p.img} alt={p.title} style={p.dark ? { background: "#2b2b2b" } : {}} />
                  <div className="card-body">
                    <h6 className="mb-1">{p.title}</h6>
                    <p
                      className="small"
                      style={{ color: p.dark ? "rgba(255,255,255,0.75)" : "var(--muted)" }}
                    >
                      {p.desc}
                    </p>
                    <a
                      className={`btn btn-sm mt-2 ${
                        p.dark ? "btn-outline-light" : "btn-light text-dark border"
                      }`}
                      href="/shop"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
