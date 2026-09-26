# NovaTech E-Commerce — Interactive ReactJS Application

**Course:** Full Stack Web Development  
**Task:** Task 2 — Interactive JavaScript and ReactJS Application Development  
**Assessment/Submission Due:** 01.10.2026  
**Bloom's Taxonomy Level:** K3 (Apply), K4 (Analyze)  
**Location:** `d:\FS asi\task-2-interactive-react\`  
**Task 1 Separation:** Task 1 code remains isolated under `d:\FS asi\task-1-responsive-web\`.

---

## 1. Project Overview & Objectives

**NovaTech React Application** is an interactive, stateful Single-Page Application (SPA) built using **React 18** and **Vite**, evolving from the static HTML5/CSS3 prototype of Task 1.

This implementation incorporates modern declarative UI principles, functional components with hooks, centralized context management for cart operations, multi-facet dynamic filtering, and client-side routing with zero page reloads.

### Bloom's Taxonomy Competencies Demonstrated:
- **K3 (Apply):**
  - Constructing functional components using **JSX syntax**.
  - Utilizing standard React Hooks:
    - `useState` for local component state (search term, category pills, slider values, quantity steppers, active tabs, form fields).
    - `useEffect` for synchronization with `localStorage` and dynamic route changes (scroll-to-top).
    - `useContext` for global application state (shopping cart and toast notifications).
  - Controlled inputs for forms and range sliders with real-time UI synchronization.
- **K4 (Analyze):**
  - Designing a clear component hierarchy separating stateful container views (`pages/`) from reusable presentational UI elements (`components/`).
  - Optimizing computational performance using `useMemo` for multi-criteria filtering algorithms (combining substring keyword search, category radio, price upper-bound, brand checklist, minimum star rating, and stock availability).
  - Architecting state persistence and immutable state updates across disjoint application views.

---

## 2. Directory & Component Architecture

```
d:/FS asi/task-2-interactive-react/
├── index.html                   # HTML root entry point
├── package.json                 # Node dependencies (React 18, Vite)
├── vite.config.js               # Vite build configuration
├── dist/                        # Production optimized build bundle
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application orchestrator & SPA router
│   ├── context/
│   │   └── CartContext.jsx      # Global Cart state, calculations & LocalStorage sync
│   ├── data/
│   │   └── products.js          # Structured product dataset (8 rich tech products)
│   ├── components/
│   │   ├── Navbar.jsx           # Responsive header, search bar, active route pills, cart badge
│   │   ├── ProductCard.jsx      # Reusable product card with wishlist & quick add
│   │   ├── StarRating.jsx       # Dynamic star rating display
│   │   ├── Accordion.jsx        # Accessible collapsible FAQ component
│   │   ├── Toast.jsx            # Animated notification toast
│   │   └── Footer.jsx           # Multi-column footer
│   ├── pages/
│   │   ├── Home.jsx             # Hero banner, department pills, trending deals, testimonials
│   │   ├── Products.jsx         # Multi-criteria filterable catalog with live sorting
│   │   ├── ProductDetail.jsx    # Flagship view with gallery switcher, color picker & tabs
│   │   ├── Cart.jsx             # Line items table, coupon code validator & checkout modal
│   │   └── Contact.jsx          # Controlled support form & FAQ accordion
│   ├── styles/                  # Modular CSS tokens and stylesheets
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   └── responsive.css
│   └── assets/
│       └── images/              # High-resolution SVG product assets
└── README.md                    # Project documentation & evaluation guide
```

---

## 3. Interactive Features & State Implementation

### 1. Global Shopping Cart (`src/context/CartContext.jsx`)
- **Immutable Operations:** `addToCart(product, quantity, color)`, `removeFromCart(id, color)`, `updateQuantity(id, color, qty)`, and `clearCart()`.
- **LocalStorage Sync:** The cart automatically preserves items across browser reloads via a custom `useEffect` hook.
- **Dynamic Coupon Engine:** Applying promo code `TECH20` dynamically recalculates the order with a 20% discount; `SAVE10` applies 10%.
- **Live Calculations:** Real-time computation of item count badge, subtotal, tax (8%), free shipping eligibility threshold ($50), and total payable.
- **Simulated Checkout Flow:** Clicking "Proceed to Checkout" opens an interactive modal with customer details, order confirmation, and automated cart clearance.

### 2. Multi-Facet Product Filtering (`src/pages/Products.jsx`)
Implemented with `useMemo` for optimal re-render efficiency:
- **Instant Search:** Case-insensitive substring matching against product name, description, brand, and category label.
- **Category Filter:** Radio selection across Audio, Wearables, Computing, Gaming, and Cameras.
- **Interactive Price Slider:** Range input from $50 to $2,000 updating upper-bound in real time.
- **Multi-Brand Checkbox Matrix:** Toggle selection across NovaTech, Aether, Zenith, SonicAir, and Lumina.
- **Rating Filter:** Thresholds for 4.0★ and 4.8★ and above.
- **Dynamic Sorting:** Sort by Featured, Price (Low to High), Price (High to Low), Customer Rating, or Newest Arrivals.
- **Reset State:** Instantly returns all controls to default states.

### 3. Product Gallery & Tab Switching (`src/pages/ProductDetail.jsx`)
- **Interactive Thumbnail Switcher:** Clicking thumbnails seamlessly updates the main high-resolution preview.
- **Color Finish Picker:** Updates active color state with visual feedback.
- **Quantity Stepper:** Increments and decrements quantities with bounds checking (1 to 99).
- **Tab Controller:** Switch between "Technical Specifications" table, "Detailed Overview", and "Customer Reviews".

### 4. Controlled Support Form (`src/pages/Contact.jsx`)
- Fully controlled React inputs (`name`, `email`, `phone`, `department`, `orderId`, `message`, `agree`).
- Live state handling and submission feedback with automated timeout reset.
- Interactive FAQ accordion with animated expand/collapse states.

---

## 4. How to Run & Verify

### Option A: Development Server (Hot Module Replacement)
```powershell
cd "d:\FS asi\task-2-interactive-react"
npm run dev
```
Open the provided local URL (typically `http://localhost:5173/`).

### Option B: Production Preview
```powershell
cd "d:\FS asi\task-2-interactive-react"
npm run preview
```

### Option C: Production Build
The pre-compiled production build is already generated in `d:\FS asi\task-2-interactive-react\dist\`.

---

## 5. Transition to Tasks 3 & 4

- **Task 3 (Database Connectivity with Spring Boot & SQL/JDBC):**
  The static dataset in [`src/data/products.js`](file:///d:/FS%20asi/task-2-interactive-react/src/data/products.js) will be replaced with asynchronous `fetch()` / `axios` calls to backend Spring Boot REST endpoints (`GET /api/v1/products`, `POST /api/v1/orders`).
- **Task 4 (Full Stack Microservices):**
  The application will route requests through an API Gateway to microservices for Catalog, Inventory, Auth, and Orders.
