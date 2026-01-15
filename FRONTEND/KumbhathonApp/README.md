# Aasray - Trustworthy Stays & Accommodation Experience

## 🏆 Hackathon Project for Kumbh Mela 2027, Nashik

A complete accommodation booking platform addressing the critical challenges pilgrims face when seeking housing during the Kumbh Mela.

---

## 🎯 Problem Statement (ID: 09)

**"Trustworthy Stays & Accommodation Experience"**

Addressing multi-faceted problems involving:
- Trust and safety in accommodation
- Transparent pricing and information
- Logistical uncertainty for pilgrims
- Easy access to verified properties

---

## ✨ Features

### 🏠 **Landing Page**
- Hero section with continuous scrolling images
- Smart search bar (Location, Check-in, Check-out, Guests)
- Three accommodation categories:
  - Hotels (Luxury & Budget)
  - Homestays (Local Family Experience)
  - Tents (Authentic Kumbh Experience)
- Horizontal scrolling carousels with arrow navigation
- Login/Signup authentication system

### 📋 **Category Listings Page**
- **Left Panel**: Grid view of all accommodations
  - Property images and details
  - Price per night
  - Ratings and reviews
  - Location information
  - Amenities list
  
- **Right Panel (Sticky)**:
  - **Google Maps Integration**: View property locations
  - **AI Itinerary Planner**: 
    - Input number of days
    - Select interests (Religious Sites, Cultural Heritage, Wine Tours, Nature)
    - Generate personalized travel plans

### 🏨 **Property Detail Page**
- **Left Panel**:
  - Photo gallery (4+ images)
  - Detailed property description
  - Host information with verification
  - Amenities & features grid
  - Sanitation & hygiene badges
  - Bathroom facility photos
  - "Connect with Host" button

- **Right Panel (Sticky)**:
  - **Suggested Itinerary**: Timeline with distances to key locations
  - **Booking Form**:
    - Date pickers (Check-in/Check-out)
    - Guest selection
    - Dynamic price calculation
    - Reserve & Book Now buttons

---

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Pure CSS (Modular component-based)
- **Icons**: Font Awesome 6.4.0
- **Maps**: Google Maps Embed API

---

## 📁 Project Structure

```
AasrayApp/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx & Header.css
│   │   │   ├── Footer.jsx & Footer.css
│   │   │   └── AuthModal.jsx & AuthModal.css
│   │   ├── landing/
│   │   │   ├── HeroSection.jsx & HeroSection.css
│   │   │   ├── SearchBar.jsx & SearchBar.css
│   │   │   └── CategoryCarousel.jsx & CategoryCarousel.css
│   │   └── shared/
│   │       └── AccommodationCard.jsx & AccommodationCard.css
│   ├── pages/
│   │   ├── LandingPage.jsx & LandingPage.css
│   │   ├── CategoryListingsPage.jsx & CategoryListingsPage.css
│   │   └── PropertyDetailPage.jsx & PropertyDetailPage.css
│   ├── data/
│   │   └── accommodations.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Navigate to project directory**
   ```bash
   cd D:\VSfiles\Aasray\FRONTEND\KumbhathonApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#FF9933)
- **Primary Light**: #FFD9B3
- **Primary Dark**: #E68A00
- **Background**: White (#FFFFFF)
- **Text**: Gray shades (#1F2937, #6B7280)

### Typography
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Headings**: Bold, 1.5rem - 2.5rem
- **Body**: Regular, 0.875rem - 1rem

---

## 🔄 Navigation Flow

```
Landing Page
    ↓ (Click arrow or accommodation card)
Category Listings Page (Hotels/Homestays/Tents)
    ↓ (Click on any listing)
Property Detail Page
    ↓ (Back button)
Category Listings Page
    ↓ (Back button)
Landing Page
```

---

## 📊 Data Structure

### Accommodation Object
```javascript
{
  id: Number,
  name: String,
  price: String (₹X,XXX),
  rating: Number (0-5),
  image: String (URL),
  location: String,
  amenities: String,
  description: String
}
```

### Categories
- **Hotels**: 7 properties
- **Homestays**: 7 properties
- **Tents**: 7 properties

---

## 🎯 Key Differentiators

1. **Trust & Safety Focus**
   - Host verification system
   - Sanitation badges
   - Safety certifications

2. **AI-Powered Planning**
   - Personalized itinerary generation
   - Distance calculations
   - Time-based scheduling

3. **Comprehensive Information**
   - Multiple property photos
   - Detailed amenities
   - Bathroom facility images
   - Host information

4. **User Experience**
   - Smooth animations
   - Responsive design
   - Intuitive navigation
   - Sticky sidebars for easy access

---

## 📱 Responsive Design

- **Desktop**: Full layout with sidebars
- **Tablet**: Adjusted grid layouts
- **Mobile**: Single column, stacked layout

---

## 🔮 Future Enhancements

1. **Backend Integration**
   - User authentication
   - Real-time availability
   - Booking management
   - Payment gateway

2. **Advanced Features**
   - Reviews and ratings system
   - Wishlist/Favorites
   - Search filters (price, rating, amenities)
   - Multi-language support (Hindi, Marathi, English)
   - Real AI itinerary generation
   - Chat with host
   - Emergency contacts section

3. **Analytics**
   - User behavior tracking
   - Popular properties
   - Booking trends

---

## 👥 Team

- **Your Name**: Frontend Development (Landing Page, Components)
- **Friend's Name**: Frontend Development (Listings & Detail Pages)

---

## 📄 License

This project is created for Aasray Hackathon 2027.

---

## 🙏 Acknowledgments

- Kumbh Mela Nashik 2027 Organizing Committee
- Unsplash for property images
- Font Awesome for icons
- Google Maps for location services

---

## 📞 Contact

For queries regarding this project:
- Email: support@aasray2027.com
- Phone: +91 1800 123 4567

---

**Built with ❤️ for Kumbh Mela 2027, Nashik**
