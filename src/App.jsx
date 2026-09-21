import React, { useMemo, useState } from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Search,
  X,
} from "lucide-react";


/* =========================================================
   MICASA DATA
========================================================= */

const PHONE = "+917310001609";

const ADDRESS =
  "Infront of Christ The King Academy, Civil Lines, Jhansi, Uttar Pradesh 284001";

const GOOGLE_MAPS =
  "https://www.google.com/maps/search/?api=1&query=MICASA+JHANSI";

const OFFICIAL_SITE = "https://micasajhansi.com/";

const ZOMATO =
  "https://www.zomato.com/jhansi/micasa-civil-lines";

const WEDDINGWIRE =
  "https://www.weddingwire.in/banquet-halls/micasa--e489235";


/*
  Replace these with MICASA's own downloaded photos later.

  Put your photos inside:

  public/images/

  Example:

  /images/hero.jpg
  /images/food-1.jpg
  /images/interior.jpg
*/

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90",

  food1:
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85",

  food2:
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=85",

  food3:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=85",

  interior:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=90",

  event:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=90",

  dessert:
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1400&q=85",
};


/* =========================================================
   MOVING TYPE
========================================================= */

const lines = [
  { text: "Creative", reverse: false },
  { text: "Design", reverse: true },
  { text: "Motion", reverse: false },
  { text: "Studio", reverse: true },
];


/* =========================================================
   MENU
========================================================= */

const menu = {
  "Signature": [
    "MICASA Signature Pizza",
    "Chef's Special Pasta",
    "Signature Mocktail",
    "House Special Platter",
  ],

  "Starters": [
    "Crispy Corn",
    "Paneer Tikka",
    "Cheese Balls",
    "Chicken Tikka",
    "Chicken Wings",
  ],

  "Pizza": [
    "Margherita",
    "Farmhouse",
    "Paneer Tikka Pizza",
    "Chicken Supreme",
    "MICASA Special Pizza",
  ],

  "Pasta": [
    "Arrabbiata",
    "Alfredo",
    "Pink Sauce Pasta",
    "Pesto Pasta",
    "Chicken Alfredo",
  ],

  "Main Course": [
    "Dal Makhani",
    "Paneer Butter Masala",
    "Kadhai Paneer",
    "Butter Chicken",
    "Chicken Curry",
  ],

  "Beverages": [
    "Fresh Lime",
    "Virgin Mojito",
    "Blue Lagoon",
    "Cold Coffee",
    "Chocolate Shake",
    "Fresh Fruit Shake",
  ],

  "Desserts": [
    "Brownie",
    "Chocolate Cake",
    "Ice Cream",
    "Gulab Jamun",
  ],
};


/* =========================================================
   LISTING DATA
========================================================= */

const listings = [
  {
    name: "Zomato",
    type: "ORDER ONLINE",
    description: "Menu · delivery · photos · table booking",
    href: ZOMATO,
    className: "zomato",
    letter: "Z",
  },

  {
    name: "WeddingWire",
    type: "EVENTS",
    description: "Weddings · celebrations · venue enquiries",
    href: WEDDINGWIRE,
    className: "weddingwire",
    letter: "W",
  },

  {
    name: "Google Maps",
    type: "FIND US",
    description: "Directions · location · reviews",
    href: GOOGLE_MAPS,
    className: "maps",
    letter: "G",
  },
];


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}


function MagneticButton({
  children,
  href,
  onClick,
  dark = false,
}) {
  const content = (
    <motion.span
      className={`magnetic-button ${dark ? "dark" : ""}`}
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick}>
      {content}
    </button>
  );
}


/* =========================================================
   APP
========================================================= */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullMenu, setFullMenu] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState("Signature");
  const [search, setSearch] = useState("");

  const {
    scrollY,
  } = useScroll();


  /*
    Your original inverted scroll effect,
    corrected for Framer Motion's API.
  */

  const invertScroll = useTransform(
    scrollY,
    (value) => value * -1
  );


  const foregroundY = useTransform(
    scrollY,
    [0, 1],
    [0, 2],
    {
      clamp: false,
    }
  );


  const backgroundY = useTransform(
    scrollY,
    [0, 1],
    [0, 0.5],
    {
      clamp: false,
    }
  );


  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) {
      return menu[activeCategory] || [];
    }

    return Object.values(menu)
      .flat()
      .filter((item) =>
        item.toLowerCase().includes(q)
      );
  }, [search, activeCategory]);


  return (
    <div className="site">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar">

        <a
          href="#top"
          className="logo"
        >
          MI<span>CASA</span>
        </a>

        <nav className="desktop-nav">
          <a href="#experience">Experience</a>
          <a href="#menu">Menu</a>
          <a href="#events">Events</a>
          <a href="#gallery">Gallery</a>
          <a href="#visit">Visit</a>
        </nav>

        <div className="nav-right">

          <a
            href={`tel:${PHONE}`}
            className="nav-call"
          >
            <Phone size={15} />
            <span>Call</span>
          </a>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon size={22} />
          </button>

        </div>

      </header>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <AnimatePresence>

        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              y: "-100%",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: "-100%",
            }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            <button
              className="mobile-close"
              onClick={() => setMenuOpen(false)}
            >
              <X size={25} />
            </button>

            <div className="mobile-menu-inner">

              {[
                ["Experience", "#experience"],
                ["Menu", "#menu"],
                ["Events", "#events"],
                ["Gallery", "#gallery"],
                ["Visit", "#visit"],
              ].map(([label, href], index) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.06,
                  }}
                >
                  <span>0{index + 1}</span>
                  {label}
                </motion.a>
              ))}

            </div>

            <div className="mobile-bottom">
              <a href={`tel:${PHONE}`}>
                +91 73100 01609
              </a>

              <a
                href={GOOGLE_MAPS}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
            </div>

          </motion.div>
        )}

      </AnimatePresence>


      {/* =================================================
          HERO
      ================================================= */}

      <main id="top">

        <section className="hero">

          <motion.div
            className="hero-image"
            style={{
              y: backgroundY,
            }}
          >
            <img
              src={IMAGES.hero}
              alt="MICASA restaurant"
            />
          </motion.div>

          <div className="hero-overlay" />

          <div className="hero-top">

            <span>
              JHANSI · INDIA
            </span>

            <span>
              EST. 2025
            </span>

          </div>


          <div className="hero-content">

            <Reveal>

              <p className="eyebrow">
                RESTAURANT · EVENTS · EXPERIENCES
              </p>

              <h1>
                MICASA
              </h1>

              <p className="hero-subtitle">
                A place for good food,
                <br />
                beautiful moments
                <br />
                and long evenings.
              </p>

            </Reveal>

          </div>


          <div className="hero-bottom">

            <span>
              SCROLL TO EXPLORE
            </span>

            <motion.div
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <ArrowDown size={17} />
            </motion.div>

          </div>

        </section>


        {/* =================================================
            MOVING TYPE
        ================================================= */}

        <section className="marquee-section">

          {lines.map((line, index) => (

            <div
              className="marquee-row"
              key={line.text}
            >

              <motion.div
                className="marquee-track"
                style={{
                  x: line.reverse
                    ? invertScroll
                    : undefined,
                }}
                animate={
                  line.reverse
                    ? {}
                    : {
                        x: ["0%", "-50%"],
                      }
                }
                transition={{
                  duration: 22 + index * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >

                <span>
                  {line.text}
                </span>

                <i>✦</i>

                <span>
                  {line.text}
                </span>

                <i>✦</i>

                <span>
                  {line.text}
                </span>

                <i>✦</i>

              </motion.div>

            </div>

          ))}

        </section>


        {/* =================================================
            EXPERIENCE
        ================================================= */}

        <section
          id="experience"
          className="experience section"
        >

          <div className="section-label">
            <span>01</span>
            THE EXPERIENCE
          </div>

          <div className="experience-grid">

            <Reveal className="experience-copy">

              <p className="small-kicker">
                MORE THAN A MEAL
              </p>

              <h2>
                Come for the
                <em> food.</em>
                <br />
                Stay for the
                <em> feeling.</em>
              </h2>

              <p className="body-copy">
                MICASA brings together food,
                atmosphere and celebrations
                under one roof in Civil Lines,
                Jhansi.
              </p>

              <a
                href={GOOGLE_MAPS}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                FIND MICASA
                <ArrowUpRight size={17} />
              </a>

            </Reveal>


            <Reveal
              className="experience-image"
              delay={0.15}
            >

              <motion.img
                src={IMAGES.interior}
                alt="MICASA interior"
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.7,
                }}
              />

              <div className="image-caption">
                <span>MICASA</span>
                <span>CIVIL LINES, JHANSI</span>
              </div>

            </Reveal>

          </div>

        </section>


        {/* =================================================
            FOOD
        ================================================= */}

        <section className="food-section">

          <div className="food-intro">

            <div className="section-label">
              <span>02</span>
              FROM THE KITCHEN
            </div>

            <h2>
              Made to
              <br />
              <em>be remembered.</em>
            </h2>

          </div>


          <div className="food-grid">

            <motion.div
              className="food-card food-card-large"
              whileHover={{
                y: -8,
              }}
            >
              <img
                src={IMAGES.food1}
                alt="Food at MICASA"
              />

              <div className="food-card-overlay">
                <span>01</span>
                <h3>Fresh.</h3>
              </div>
            </motion.div>


            <motion.div
              className="food-card"
              whileHover={{
                y: -8,
              }}
            >
              <img
                src={IMAGES.food2}
                alt="Pizza at MICASA"
              />

              <div className="food-card-overlay">
                <span>02</span>
                <h3>Bold.</h3>
              </div>
            </motion.div>


            <motion.div
              className="food-card"
              whileHover={{
                y: -8,
              }}
            >
              <img
                src={IMAGES.food3}
                alt="Dish at MICASA"
              />

              <div className="food-card-overlay">
                <span>03</span>
                <h3>Unexpected.</h3>
              </div>
            </motion.div>

          </div>

        </section>


        {/* =================================================
            MENU
        ================================================= */}

        <section
          id="menu"
          className="menu-section section"
        >

          <div className="section-label">
            <span>03</span>
            THE MENU
          </div>


          <div className="menu-heading">

            <div>
              <p className="small-kicker">
                SOMETHING FOR EVERY MOOD
              </p>

              <h2>
                The
                <em> MICASA</em>
                <br />
                menu.
              </h2>
            </div>


            <button
              className="menu-open"
              onClick={() => setFullMenu(true)}
            >
              VIEW FULL MENU
              <ArrowUpRight size={18} />
            </button>

          </div>


          <div className="category-tabs">

            {Object.keys(menu).map(
              (category) => (

                <button
                  key={category}
                  className={
                    activeCategory === category
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setActiveCategory(category);
                    setSearch("");
                  }}
                >
                  {category}
                </button>

              )
            )}

          </div>


          <div className="menu-list">

            {menu[activeCategory]?.map(
              (item, index) => (

                <motion.div
                  className="menu-item"
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                >

                  <span className="menu-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="menu-name">
                    {item}
                  </span>

                  <span className="menu-dot" />

                </motion.div>

              )
            )}

          </div>

        </section>


        {/* =================================================
            ORDER
        ================================================= */}

        <section className="order-section">

          <div className="order-background">
            <img
              src={IMAGES.food3}
              alt=""
            />
          </div>

          <div className="order-overlay" />

          <div className="order-content">

            <p className="small-kicker">
              WHEN YOU CAN'T COME TO US
            </p>

            <h2>
              MICASA,
              <br />
              delivered.
            </h2>

            <p>
              Browse the menu and order
              through Zomato.
            </p>

            <MagneticButton href={ZOMATO}>
              ORDER ONLINE
              <ArrowUpRight size={18} />
            </MagneticButton>

          </div>

        </section>


        {/* =================================================
            EVENTS
        ================================================= */}

        <section
          id="events"
          className="events section"
        >

          <div className="section-label">
            <span>04</span>
            CELEBRATIONS
          </div>


          <div className="events-grid">

            <Reveal className="events-image">

              <img
                src={IMAGES.event}
                alt="MICASA event venue"
              />

              <div className="event-stamp">
                <span>MICASA</span>
                <strong>EVENTS</strong>
              </div>

            </Reveal>


            <Reveal
              className="events-copy"
              delay={0.1}
            >

              <p className="small-kicker">
                YOUR MOMENT. YOUR SPACE.
              </p>

              <h2>
                Make it
                <br />
                <em>memorable.</em>
              </h2>

              <p className="body-copy">
                From intimate gatherings to
                large celebrations, MICASA
                offers spaces designed for
                special occasions.
              </p>

              <div className="event-features">

                <div>
                  <strong>Serenity</strong>
                  <span>Intimate celebrations</span>
                </div>

                <div>
                  <strong>Majestic</strong>
                  <span>Large gatherings</span>
                </div>

                <div>
                  <strong>Open Air</strong>
                  <span>Lawn & poolside</span>
                </div>

              </div>

              <MagneticButton href={WEDDINGWIRE}>
                EVENT ENQUIRY
                <ArrowUpRight size={18} />
              </MagneticButton>

            </Reveal>

          </div>

        </section>


        {/* =================================================
            LISTINGS
        ================================================= */}

        <section className="listings-section">

          <div className="section-label">
            <span>05</span>
            FIND MICASA
          </div>

          <div className="listings-heading">

            <h2>
              We're
              <br />
              <em>out there.</em>
            </h2>

            <p>
              Find MICASA, explore the menu,
              order online or plan your next
              celebration.
            </p>

          </div>


          <div className="listing-grid">

            {listings.map(
              (listing, index) => (

                <motion.a
                  href={listing.href}
                  target="_blank"
                  rel="noreferrer"
                  className="listing-card"
                  key={listing.name}
                  whileHover={{
                    y: -7,
                  }}
                >

                  <div
                    className={`listing-logo ${listing.className}`}
                  >
                    {listing.letter}
                  </div>

                  <div className="listing-info">

                    <span>
                      {listing.type}
                    </span>

                    <h3>
                      {listing.name}
                    </h3>

                    <p>
                      {listing.description}
                    </p>

                  </div>

                  <ArrowUpRight
                    className="listing-arrow"
                    size={21}
                  />

                </motion.a>

              )
            )}

          </div>

        </section>


        {/* =================================================
            GALLERY
        ================================================= */}

        <section
          id="gallery"
          className="gallery-section section"
        >

          <div className="section-label">
            <span>06</span>
            GALLERY
          </div>


          <div className="gallery-heading">

            <h2>
              See you
              <br />
              <em>inside.</em>
            </h2>

            <a
              href={GOOGLE_MAPS}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              MORE PHOTOS
              <ArrowUpRight size={17} />
            </a>

          </div>


          <div className="gallery-grid">

            <motion.div
              className="gallery-photo tall"
              whileHover={{
                scale: 0.985,
              }}
            >
              <img
                src={IMAGES.interior}
                alt=""
              />
            </motion.div>

            <motion.div
              className="gallery-photo"
              whileHover={{
                scale: 0.985,
              }}
            >
              <img
                src={IMAGES.food1}
                alt=""
              />
            </motion.div>

            <motion.div
              className="gallery-photo"
              whileHover={{
                scale: 0.985,
              }}
            >
              <img
                src={IMAGES.dessert}
                alt=""
              />
            </motion.div>

            <motion.div
              className="gallery-photo wide"
              whileHover={{
                scale: 0.985,
              }}
            >
              <img
                src={IMAGES.event}
                alt=""
              />
            </motion.div>

          </div>

        </section>


        {/* =================================================
            VISIT
        ================================================= */}

        <section
          id="visit"
          className="visit-section"
        >

          <div className="visit-inner">

            <div className="section-label light">
              <span>07</span>
              VISIT MICASA
            </div>


            <div className="visit-heading">

              <h2>
                Your table
                <br />
                is <em>waiting.</em>
              </h2>

            </div>


            <div className="visit-details">

              <div className="visit-detail">

                <MapPin size={19} />

                <div>
                  <span>ADDRESS</span>

                  <p>
                    Infront of Christ The King
                    Academy,
                    <br />
                    Civil Lines, Jhansi
                  </p>
                </div>

              </div>


              <div className="visit-detail">

                <Clock3 size={19} />

                <div>
                  <span>HOURS</span>

                  <p>
                    Monday — Sunday
                    <br />
                    11:00 — 23:00
                  </p>
                </div>

              </div>


              <div className="visit-detail">

                <Phone size={19} />

                <div>
                  <span>PHONE</span>

                  <a href={`tel:${PHONE}`}>
                    +91 73100 01609
                  </a>
                </div>

              </div>

            </div>


            <div className="visit-actions">

              <MagneticButton href={`tel:${PHONE}`}>
                CALL MICASA
                <Phone size={17} />
              </MagneticButton>

              <MagneticButton
                href={GOOGLE_MAPS}
                dark
              >
                GET DIRECTIONS
                <ArrowUpRight size={17} />
              </MagneticButton>

            </div>

          </div>

        </section>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="footer">

          <div className="footer-top">

            <div className="footer-brand">

              <div className="footer-logo">
                MICASA
              </div>

              <p>
                Restaurant · Events · Experiences
              </p>

            </div>


            <div className="footer-social">

              <a
                href="#"
                aria-label="Instagram"
              >
                <Instagram size={19} />
              </a>

              <a
                href={ZOMATO}
                target="_blank"
                rel="noreferrer"
              >
                Z
              </a>

              <a
                href={GOOGLE_MAPS}
                target="_blank"
                rel="noreferrer"
              >
                G
              </a>

            </div>

          </div>


          <div className="footer-bottom">

            <span>
              © {new Date().getFullYear()} MICASA JHANSI
            </span>

            <a
              href={OFFICIAL_SITE}
              target="_blank"
              rel="noreferrer"
            >
              OFFICIAL WEBSITE
            </a>

            <span>
              JHANSI · INDIA
            </span>

          </div>

        </footer>

      </main>


      {/* =================================================
          FULL MENU MODAL
      ================================================= */}

      <AnimatePresence>

        {fullMenu && (

          <motion.div
            className="menu-modal"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >

            <motion.div
              className="menu-modal-inner"
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 50,
                opacity: 0,
              }}
            >

              <div className="modal-top">

                <div>
                  <span className="small-kicker">
                    MICASA
                  </span>

                  <h2>
                    Full <em>Menu</em>
                  </h2>
                </div>

                <button
                  className="modal-close"
                  onClick={() =>
                    setFullMenu(false)
                  }
                >
                  <X size={24} />
                </button>

              </div>


              <div className="menu-search">

                <Search size={18} />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search the menu..."
                />

              </div>


              {!search && (

                <div className="modal-tabs">

                  {Object.keys(menu).map(
                    (category) => (

                      <button
                        key={category}
                        className={
                          activeCategory === category
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setActiveCategory(category)
                        }
                      >
                        {category}
                      </button>

                    )
                  )}

                </div>

              )}


              <div className="modal-menu-list">

                {filteredItems.map(
                  (item, index) => (

                    <div
                      className="modal-menu-item"
                      key={`${item}-${index}`}
                    >

                      <span>
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <strong>
                        {item}
                      </strong>

                      <i />

                    </div>

                  )
                )}

              </div>


              <div className="modal-note">
                Menu items and availability may
                change. Please confirm with MICASA
                before ordering.
              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* =================================================
          FLOATING MOBILE ACTIONS
      ================================================= */}

      <div className="floating-actions">

        <a href={`tel:${PHONE}`}>
          <Phone size={17} />
        </a>

        <a
          href={ZOMATO}
          target="_blank"
          rel="noreferrer"
        >
          Z
        </a>

        <a
          href={GOOGLE_MAPS}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={17} />
        </a>

      </div>

    </div>
  );
}
