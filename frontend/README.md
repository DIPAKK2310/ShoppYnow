# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


### ⚒️Tech Stack and Setup

 - React.js 18.3.1
 - Bootstrap 5.3.3
 - Axios 1.7.9
 - React-Redux 9.2.0
 - React-Icons 5.4.0
 - React-Hot-Toast 2.5.2
 - @emotion/styled 11.14.0
 - @mui/icons-material 6.3.1
 - @reduxjs/toolkit 2.5.0
 - react-router-dom 7.0.2
 ## DevDependencies 
 -  @eslint/js 9.15.0
 -  @types/react 18.3.12
 -   @types/react-dom 18.3.1
 -   @vitejs/plugin-react 4.3.4
 -   eslint 9.15.0
 -   eslint-plugin-react 7.37.-2
 -   eslint-plugin-react-hooks 5.0.0
 -   eslint-plugin-react-refresh 0.4.14
 -   globals 15.12.0
 -   vite 6.0.1"
 -   Framer Motion
 -   env
 -   vercel.json
 -   redux

# Frontend Folder Structure (React + Vite)

frontend/
│
├── public/                     # Static files
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── src/
│   │
│   ├── assets/                 # Images, fonts, svg, videos
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │
│   ├── components/             # Reusable UI components
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Input.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── ui/
│   │       ├── Card.jsx
│   │       └── Modal.jsx
│   │
│   ├── pages/                  # Main pages/routes
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   └── Admin/
│   │       ├── Dashboard.jsx
│   │       └── AddProduct.jsx
│   │
│   ├── routes/                 # React Router setup
│   │   └── AppRoutes.jsx
│   │
│   ├── context/                # Context API state management
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   │
│   ├── services/               # API calls
│   │   ├── axiosInstance.js
│   │   ├── authService.js
│   │   └── productService.js
│   │
│   ├── utils/                  # Utility/helper functions
│   │   ├── formatPrice.js
│   │   └── validators.js
│   │
│   ├── constants/              # Static data/constants
│   │   └── index.js
│   │
│   ├── animations/             # GSAP / Framer Motion animations
│   │   └── fadeAnimations.js
│   │
│   ├── styles/                 # Global styles
│   │   ├── index.css
│   │   └── variables.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── README.md
└── eslint.config.js