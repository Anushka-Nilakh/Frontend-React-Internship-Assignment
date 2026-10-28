import { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import favouritesReducer, { FAVOURITES_ACTIONS } from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

/**
 * Lazy initializer for favourites state.
 * Reads saved favourite IDs from localStorage safely inside a try/catch.
 */
function initFavourites() {
  try {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Could not load favourites from localStorage:', err);
    return [];
  }
}

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * useReducer for Favourites State:
   * Why useReducer instead of useState here?
   * 1. Clear Separation of Logic: Array manipulations (adding/removing items immutably based on ID)
   *    live in an external pure reducer function (favouritesReducer) rather than scattered inside UI handlers.
   * 2. Predictable State Transitions: State transitions are explicit actions with deterministic results.
   * 3. Extensibility: New favourite-related actions (e.g. clear all, bulk favorite) can easily be added to the reducer.
   * 4. Requirement Compliance: Favourites state management strictly mandates useReducer rather than useState.
   */
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  /**
   * Persist favourites to localStorage whenever they change.
   */
  useEffect(() => {
    try {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    } catch (err) {
      console.error('Could not save favourites to localStorage:', err);
    }
  }, [favourites]);

  /**
   * Toggle favourite action handler.
   * Dispatches { type: 'TOGGLE_FAVOURITE', payload: photo.id }.
   */
  const handleToggleFavourite = useCallback((photo) => {
    dispatch({ type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE, payload: photo.id });
  }, []);

  /**
   * useCallback:
   * Problem it solves:
   * - Memoizes the handleSearchChange function reference so it does not get recreated
   *   on every single render.
   * - Keeps the prop passed to <SearchBar /> referentially stable, avoiding unnecessary
   *   re-renders of child components.
   * 
   * What would happen if removed:
   * - Functionally the search would still work, but JavaScript would allocate a new function
   *   instance on every render, breaking referential equality optimizations in child components.
   */
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  /**
   * useMemo:
   * Problem it solves:
   * - Memoizes the computed filtered photo array based on [photos, searchTerm].
   * - Only re-computes the array filtering (string trimming, lowercase conversion, and traversal)
   *   when either the `photos` dataset or `searchTerm` actually changes.
   * - When toggling a favourite, `favourites` state changes, causing Gallery to re-render to update
   *   heart icons. Because of useMemo, the search filter does NOT needlessly re-run!
   * 
   * What would happen if removed:
   * - The array filter loop would re-run on EVERY re-render of Gallery (including every favourite toggle),
   *   wasting CPU cycles recalculating the exact same filtered list.
   */
  const filteredPhotos = useMemo(() => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    if (!trimmedTerm) {
      return photos;
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmedTerm)
    );
  }, [photos, searchTerm]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section aria-label="Photo gallery" className="w-full">
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-lg font-semibold text-gray-700">No photos found</p>
          <p className="text-sm text-gray-500 mt-1">
            No authors match &ldquo;{searchTerm.trim()}&rdquo;. Try another search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Gallery;
