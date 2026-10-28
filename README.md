# Photo Gallery Web App

A clean and responsive Photo Gallery application built with **React**, **Vite**, and **Tailwind CSS**.

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4 using `@tailwindcss/vite`)

## Planned Architecture & Structure
```text
src/
├── components/
│   ├── ErrorMessage.jsx    # Error state display
│   ├── Gallery.jsx          # Responsive photo grid
│   ├── LoadingSpinner.jsx  # Loading state indicator
│   ├── PhotoCard.jsx       # Individual photo card with favourite toggle
│   └── SearchBar.jsx       # Real-time search filter input
├── hooks/
│   └── useFetchPhotos.js   # Custom hook for data fetching
├── reducers/
│   └── favouritesReducer.js# Reducer for managing favourite photos with localStorage persistence
├── App.jsx                 # Main application component
├── main.jsx                # Application root entry point
└── index.css               # Tailwind CSS entry point
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
