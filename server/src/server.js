import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { z } from 'zod';
import { query } from './db.js';
import { fallbackGalleryImages, fallbackMenuItems, fallbackTestimonials } from './fallbackData.js';

const app = express();
const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || origin === clientUrl || /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());
app.use(morgan('dev'));

const reservationSchema = z.object({
  guestName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(160).optional().or(z.literal('')),
  partySize: z.coerce.number().int().min(1).max(20),
  reservationDate: z.string().trim().min(1),
  reservationTime: z.string().trim().min(1),
  notes: z.string().trim().max(1000).optional().or(z.literal('')),
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(2000),
});

function asyncHandler(handler) {
  return (request, response, next) => Promise.resolve(handler(request, response, next)).catch(next);
}

function isDatabaseError(error) {
  return [
    'ECONNREFUSED',
    'ENOTFOUND',
    'ETIMEDOUT',
    'ECONNRESET',
    '3D000',
    '28P01',
  ].includes(error?.code);
}

const fallbackNotices = new Set();

function logFallbackNotice(key, action) {
  if (fallbackNotices.has(key)) return;
  fallbackNotices.add(key);
  console.info(`PostgreSQL is not connected. ${action} is using development fallback mode.`);
}

function sendDevFallback(response, data, error) {
  logFallbackNotice(error?.code || 'database-read', 'Read API');
  response.json({
    data,
    source: 'fallback',
    message: 'PostgreSQL is not connected, so the API returned development fallback data.',
  });
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'savory-bites-api' });
});

app.get('/api/menu', asyncHandler(async (_request, response) => {
  try {
    const { rows } = await query(
      'SELECT id, category, name, description, price, image_url, is_featured FROM menu_items ORDER BY category, id',
    );
    response.json({ data: rows, source: 'database' });
  } catch (error) {
    if (isDatabaseError(error)) {
      return sendDevFallback(response, fallbackMenuItems, error);
    }

    throw error;
  }
}));

app.get('/api/testimonials', asyncHandler(async (_request, response) => {
  try {
    const { rows } = await query(
      'SELECT id, customer_name, quote, avatar_url, rating FROM testimonials ORDER BY id',
    );
    response.json({ data: rows, source: 'database' });
  } catch (error) {
    if (isDatabaseError(error)) {
      return sendDevFallback(response, fallbackTestimonials, error);
    }

    throw error;
  }
}));

app.get('/api/gallery', asyncHandler(async (_request, response) => {
  try {
    const { rows } = await query(
      'SELECT id, title, image_url, alt_text FROM gallery_images ORDER BY id',
    );
    response.json({ data: rows, source: 'database' });
  } catch (error) {
    if (isDatabaseError(error)) {
      return sendDevFallback(response, fallbackGalleryImages, error);
    }

    throw error;
  }
}));

app.post('/api/reservations', asyncHandler(async (request, response) => {
  const data = reservationSchema.parse(request.body);
  try {
    const { rows } = await query(
      `INSERT INTO reservations
        (guest_name, phone, email, party_size, reservation_date, reservation_time, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, status, created_at`,
      [
        data.guestName,
        data.phone,
        data.email || null,
        data.partySize,
        data.reservationDate,
        data.reservationTime,
        data.notes || null,
      ],
    );

    return response.status(201).json({
      message: 'Reservation request received.',
      data: rows[0],
      source: 'database',
    });
  } catch (error) {
    if (!isDatabaseError(error)) throw error;

    logFallbackNotice(error?.code || 'reservation-write', 'Reservation form');
    return response.status(202).json({
      message: 'Reservation request received in demo mode. Connect PostgreSQL to persist bookings.',
      data: {
        id: Date.now(),
        status: 'demo',
        created_at: new Date().toISOString(),
      },
      source: 'fallback',
    });
  }
}));

app.post('/api/contact', asyncHandler(async (request, response) => {
  const data = contactSchema.parse(request.body);
  try {
    const { rows } = await query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [data.name, data.email, data.subject || null, data.message],
    );

    return response.status(201).json({
      message: 'Message received.',
      data: rows[0],
      source: 'database',
    });
  } catch (error) {
    if (!isDatabaseError(error)) throw error;

    logFallbackNotice(error?.code || 'contact-write', 'Contact form');
    return response.status(202).json({
      message: 'Message received in demo mode. Connect PostgreSQL to persist messages.',
      data: {
        id: Date.now(),
        created_at: new Date().toISOString(),
      },
      source: 'fallback',
    });
  }
}));

app.use((error, _request, response, _next) => {
  if (error instanceof z.ZodError) {
    return response.status(400).json({
      message: 'Please check the submitted fields.',
      errors: error.flatten().fieldErrors,
    });
  }

  console.error(error);
  return response.status(500).json({
    message: 'Server error. Please try again later.',
  });
});

app.listen(port, () => {
  console.log(`Savory Bites API running on http://localhost:${port}`);
});
