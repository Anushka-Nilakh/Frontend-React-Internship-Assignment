# Photo Gallery Web App

A responsive Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS**. Fetches photos from the Picsum Photos API, displays them in a responsive grid, provides real-time author search, and manages favourites persisted across browser sessions with `useReducer` and `localStorage`.

---

## How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production build
```bash
npm run build
```

---

## React Hooks Used & Where

| Hook | File / Location | Purpose |
| :--- | :--- | :--- |
| `useState` | `src/hooks/useFetchPhotos.js` | Manages `photos` (`[]`), `loading` (`true`), and `error` (`null`) state. |
| `useState` | `src/components/Gallery.jsx` | Manages `searchTerm` input state for real-time author filtering. |
| `useEffect` | `src/hooks/useFetchPhotos.js` | Fetches 30 photos on component mount with `isMounted` cleanup to avoid state updates after unmount. |
| `useEffect` | `src/components/Gallery.jsx` | Persists `favourites` array into `localStorage` whenever favourites change. |
| `useReducer` | `src/components/Gallery.jsx` | Manages favourite photo IDs (`favouritesReducer.js`) via declarative action dispatch (`TOGGLE_FAVOURITE`) with lazy initialization (`initFavourites`) from `localStorage`. |
| `useCallback` | `src/components/Gallery.jsx` | Memoizes `handleSearchChange` and `handleToggleFavourite` function references to preserve referential equality and optimize re-renders. |
| `useMemo` | `src/components/Gallery.jsx` | Memoizes the filtered photo list based on `[photos, searchTerm]`. Prevents re-running filter calculations when favourite states toggle. |

---

## Project Structure
```text
src/
├── components/
│   ├── ErrorMessage.jsx    # User-friendly error message alert
│   ├── Gallery.jsx         # Gallery container coordinating search, fetch hook, and grid
│   ├── PhotoCard.jsx       # Card displaying photo, author, and favourite heart button
│   ├── SearchBar.jsx       # Controlled search input
│   └── Spinner.jsx         # Accessible Tailwind loading spinner
├── hooks/
│   └── useFetchPhotos.js   # Custom hook returning { photos, loading, error }
├── reducers/
│   └── favouritesReducer.js# Pure reducer handling TOGGLE_FAVOURITE
├── App.jsx                 # Top-level application layout
├── index.css               # Tailwind CSS import
└── main.jsx                # React root mount
```

---

## Requirements Checklist
- [x] **Setup**: React + Vite + Tailwind CSS v4 only (no UI libraries like MUI/Bootstrap).
- [x] **API Fetch**: Fetches 30 photos on mount from Picsum API with loading spinner and error message.
- [x] **Responsive Grid**: 4 columns (desktop `lg:`), 2 columns (tablet `md:`), 1 column (mobile).
- [x] **Real-Time Search**: Filters by author name instantly without extra API calls.
- [x] **Favourites State**: Strictly uses `useReducer` (no `useState`), persistent in `localStorage`.
- [x] **Custom Hook**: `useFetchPhotos` encapsulates fetch logic returning `{ photos, loading, error }`.
- [x] **Performance Hooks**: `useCallback` for event handlers and `useMemo` for filtered list computation.
- [x] **Clean Architecture**: Functional components with hooks only, no console errors or warnings, no unused files.
