# Backend - Kumbhathon 2027

## 🚧 Backend API (Coming Soon)

This folder will contain the backend API for the Kumbhathon accommodation platform.

---

## 📋 Planned Features

- User authentication and authorization
- Property management CRUD operations
- Booking system
- Payment gateway integration
- AI itinerary generation API
- Reviews and ratings system
- Host verification system
- Real-time availability checking

---

## 🛠️ Planned Tech Stack

- **Framework**: Node.js/Express or Python/Django (TBD)
- **Database**: MongoDB or PostgreSQL (TBD)
- **Authentication**: JWT
- **Payment**: Razorpay/Stripe
- **AI Integration**: OpenAI API or custom model

---

## 📝 API Endpoints (Planned)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property (host only)
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:userId` - Get user bookings
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### AI Itinerary
- `POST /api/itinerary/generate` - Generate AI itinerary

---

## 🚀 Setup Instructions (When Available)

```bash
cd BACKEND

# Install dependencies
npm install  # or pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate  # or python manage.py migrate

# Start server
npm start  # or python manage.py runserver
```

---

## 📞 Contact

For backend development queries, contact the backend team.

---

**Status**: 🚧 In Development
