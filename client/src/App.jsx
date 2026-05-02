import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import {
  CalendarCheck,
  ChefHat,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Star,
  Utensils,
  Wine,
  X,
} from 'lucide-react';
import { api } from './api.js';

const fallbackMenu = [
  {
    id: 1,
    category: 'Appetizers',
    name: 'Crispy Calamari',
    description: 'Lightly fried calamari served with zesty marinara and herb aioli.',
    price: '14.00',
    image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    is_featured: true,
  },
  {
    id: 2,
    category: 'Main Courses',
    name: 'Grilled Salmon',
    description: 'Perfectly grilled salmon with asparagus, lemon butter, and sea salt.',
    price: '22.00',
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
    is_featured: true,
  },
  {
    id: 3,
    category: 'Desserts',
    name: 'Tiramisu',
    description: 'Classic coffee-soaked layers with mascarpone cream and cocoa dust.',
    price: '9.00',
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    is_featured: true,
  },
];

const fallbackTestimonials = [
  {
    id: 1,
    customer_name: 'Jane Doe',
    quote: 'The food was absolutely divine. Every course felt curated and memorable.',
    avatar_url: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 5,
  },
  {
    id: 2,
    customer_name: 'John Smith',
    quote: 'Exceptional service and atmosphere. The filet mignon was cooked perfectly.',
    avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
];

const fallbackGallery = [
  {
    id: 1,
    title: 'Signature Steak',
    image_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
    alt_text: 'Plated steak on a dark table',
  },
  {
    id: 2,
    title: 'Dining Room',
    image_url: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=900&q=80',
    alt_text: 'Restaurant dining interior with warm lights',
  },
  {
    id: 3,
    title: 'Fresh Pasta',
    image_url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=900&q=80',
    alt_text: 'Fresh pasta served on white plate',
  },
  {
    id: 4,
    title: 'Seasonal Dessert',
    image_url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
    alt_text: 'Dessert with berries and cream',
  },
];

function useApiData(loader, fallback) {
  const [data, setData] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    loader()
      .then((payload) => {
        if (isMounted) setData(payload.data);
      })
      .catch(() => {
        if (isMounted) setData(fallback);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [loader, fallback]);

  return { data, isLoading };
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand" onClick={closeMenu}>
          Savory Bites
        </Link>

        <button className="icon-button menu-toggle" type="button" aria-label="Open navigation menu" onClick={() => setIsOpen(true)}>
          <MenuIcon size={24} />
        </button>

        <nav className={isOpen ? 'active' : ''} aria-label="Primary navigation">
          <button className="icon-button menu-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}>
            <X size={24} />
          </button>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/gallery" onClick={closeMenu}>Gallery</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          <NavLink to="/reservation" className="btn nav-cta" onClick={closeMenu}>Book Table</NavLink>
        </nav>
      </header>

      <button className={`menu-overlay ${isOpen ? 'active' : ''}`} type="button" aria-label="Close navigation menu" onClick={closeMenu} />
    </>
  );
}

function HomePage() {
  const { data: menu } = useApiData(api.getMenu, fallbackMenu);
  const { data: testimonials } = useApiData(api.getTestimonials, fallbackTestimonials);
  const featuredMenu = menu.filter((item) => item.is_featured).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Fine Dining Experience</p>
          <h1>Crafted Flavors. Warm Hospitality.</h1>
          <p>From intimate dinners to family moments, we serve seasonal dishes made with fresh, locally sourced ingredients.</p>
          <div className="hero-icons" aria-hidden="true">
            <Utensils />
            <Wine />
            <ChefHat />
            <CalendarCheck />
          </div>
          <div className="hero-actions">
            <Link to="/menu" className="btn">Explore Menu</Link>
            <Link to="/reservation" className="btn btn-secondary">Reserve Now</Link>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading label="Featured Dishes" />
        <MenuGrid items={featuredMenu} />
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Our Story</p>
          <h2>Seasonal cooking with a dining room that feels personal.</h2>
          <p>Savory Bites blends timeless techniques with modern creativity. Our chefs curate every plate with precision, warmth, and a deep respect for great ingredients.</p>
          <Link to="/about" className="text-link">Meet the team</Link>
        </div>
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" alt="Restaurant interior view" />
      </section>

      <section className="testimonials">
        <SectionHeading label="Guest Notes" />
        <TestimonialsGrid items={testimonials.slice(0, 2)} />
      </section>
    </>
  );
}

function MenuPage() {
  const { data: menu, isLoading } = useApiData(api.getMenu, fallbackMenu);
  const grouped = menu.reduce((groups, item) => {
    groups[item.category] = groups[item.category] || [];
    groups[item.category].push(item);
    return groups;
  }, {});

  return (
    <main className="page-shell">
      <PageHero eyebrow="Signature Menu" title="A polished menu built around freshness and technique." />
      {isLoading && <p className="status-text">Loading live menu...</p>}
      <div className="menu-container">
        {Object.entries(grouped).map(([category, items]) => (
          <article className="menu-category" key={category}>
            <h2>{category}</h2>
            <MenuGrid items={items} compact />
          </article>
        ))}
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page-shell">
      <PageHero eyebrow="About Savory Bites" title="A modern restaurant shaped by care, craft, and generous hospitality." />
      <section className="features about-features">
        <Feature icon={<ChefHat />} title="Expert Chefs" text="Our culinary team brings fine dining discipline and global kitchen experience." />
        <Feature icon={<Utensils />} title="Fresh Ingredients" text="We source seasonal produce and premium proteins from trusted suppliers." />
        <Feature icon={<Clock />} title="Warm Rhythm" text="Lunch, dinner, private dining, and weekend celebrations are handled with polish." />
      </section>
      <section className="hours-section">
        <HoursCard />
        <div className="reservation-card">
          <h2>Private Dining</h2>
          <p>Host birthdays, family gatherings, and business dinners in a room designed for calm conversation and excellent service.</p>
          <Link to="/contact" className="btn">Plan an Event</Link>
        </div>
      </section>
    </main>
  );
}

function GalleryPage() {
  const { data: gallery } = useApiData(api.getGallery, fallbackGallery);

  return (
    <main className="page-shell">
      <PageHero eyebrow="Gallery" title="A look inside the plates, room, and details guests remember." />
      <div className="gallery-grid">
        {gallery.map((image) => (
          <figure key={image.id}>
            <img src={image.image_url} alt={image.alt_text} />
            <figcaption>{image.title}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}

function ReservationPage() {
  const [form, setForm] = useState({
    guestName: '',
    phone: '',
    email: '',
    partySize: '2',
    reservationDate: '',
    reservationTime: '',
    notes: '',
  });
  const [status, setStatus] = useState('');

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitReservation = async (event) => {
    event.preventDefault();
    setStatus('Sending reservation request...');

    try {
      await api.createReservation(form);
      setStatus('Reservation request received. Our team will confirm shortly.');
      setForm({ guestName: '', phone: '', email: '', partySize: '2', reservationDate: '', reservationTime: '', notes: '' });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <main className="page-shell">
      <PageHero eyebrow="Reservations" title="Book a table for lunch, dinner, or a special evening." />
      <section className="hours-section form-layout">
        <HoursCard />
        <div className="reservation-card">
          <h2>Request Booking</h2>
          <form className="reservation-form" onSubmit={submitReservation}>
            <input name="guestName" value={form.guestName} onChange={updateField} placeholder="Full Name" required />
            <input name="phone" value={form.phone} onChange={updateField} placeholder="Phone Number" required />
            <input type="email" name="email" value={form.email} onChange={updateField} placeholder="Email Address" />
            <div className="reservation-grid">
              <input type="number" min="1" max="20" name="partySize" value={form.partySize} onChange={updateField} aria-label="Party size" required />
              <input type="date" name="reservationDate" value={form.reservationDate} onChange={updateField} required />
            </div>
            <input type="time" name="reservationTime" value={form.reservationTime} onChange={updateField} required />
            <textarea name="notes" value={form.notes} onChange={updateField} placeholder="Notes or occasion" rows="4" />
            <button type="submit" className="btn">Request Booking</button>
          </form>
          {status && <p className="form-status">{status}</p>}
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitMessage = async (event) => {
    event.preventDefault();
    setStatus('Sending message...');

    try {
      await api.createContactMessage(form);
      setStatus('Message sent. We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <main className="page-shell">
      <PageHero eyebrow="Contact" title="Questions, events, or special requests are welcome here." />
      <section className="contact-layout">
        <div className="contact-panel">
          <h2>Visit Us</h2>
          <ContactLine icon={<MapPin />} text="123 Food Street, Your City" />
          <ContactLine icon={<Phone />} text="+880 1234-567890" />
          <ContactLine icon={<Mail />} text="info@savorybites.com" />
          <img src="https://images.unsplash.com/photo-1502920917128-1aa500764b6b?auto=format&fit=crop&w=1200&q=80" alt="Location map placeholder" />
        </div>
        <form className="contact-form" onSubmit={submitMessage}>
          <input name="name" value={form.name} onChange={updateField} placeholder="Your Name" required />
          <input type="email" name="email" value={form.email} onChange={updateField} placeholder="Your Email" required />
          <input name="subject" value={form.subject} onChange={updateField} placeholder="Subject" />
          <textarea name="message" value={form.message} onChange={updateField} placeholder="Your Message" rows="6" required />
          <button type="submit" className="btn">Send Message</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </section>
    </main>
  );
}

function SectionHeading({ label }) {
  return <h2 className="section-title">{label}</h2>;
}

function PageHero({ eyebrow, title }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
    </section>
  );
}

function MenuGrid({ items, compact = false }) {
  return (
    <div className={compact ? 'menu-list' : 'dish-grid'}>
      {items.map((item) => (
        <article className="menu-item" key={item.id}>
          <img src={item.image_url} alt={item.name} />
          <div>
            <div className="menu-item-heading">
              <h3>{item.name}</h3>
              <strong>${Number(item.price).toFixed(0)}</strong>
            </div>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function TestimonialsGrid({ items }) {
  return (
    <div className="testimonial-cards">
      {items.map((item) => (
        <article className="testimonial-card" key={item.id}>
          <img src={item.avatar_url} alt={item.customer_name} />
          <div className="stars" aria-label={`${item.rating} star rating`}>
            {Array.from({ length: item.rating }).map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
          </div>
          <p>"{item.quote}"</p>
          <h3>{item.customer_name}</h3>
        </article>
      ))}
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <article className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function HoursCard() {
  return (
    <div className="hours-card">
      <h2>Opening Hours</h2>
      <ul className="hours-list">
        <li><span>Monday - Thursday</span><span>11:00 AM - 10:00 PM</span></li>
        <li><span>Friday - Saturday</span><span>11:00 AM - 11:30 PM</span></li>
        <li><span>Sunday</span><span>12:00 PM - 9:00 PM</span></li>
      </ul>
    </div>
  );
}

function ContactLine({ icon, text }) {
  return (
    <p className="contact-line">
      {icon}
      <span>{text}</span>
    </p>
  );
}

function Footer() {
  return (
    <footer>
      <p><strong>Savory Bites Restaurant</strong></p>
      <p>123 Food Street, Your City</p>
      <p>Phone: +880 1234-567890</p>
      <p>Email: info@savorybites.com</p>
      <div className="social-icons">
        <Facebook />
        <Instagram />
      </div>
      <p>&copy; 2026 All Rights Reserved</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}
