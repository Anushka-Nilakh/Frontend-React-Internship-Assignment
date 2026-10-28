import { useState, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');

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
   * 
   * What would happen if removed:
   * - The array filter loop would re-run on EVERY re-render of Gallery (e.g. when toggling
   *   favourites or other parent/sibling state changes occur), causing unnecessary CPU computation.
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
              isFavourite={false}
              onToggleFavourite={() => {}}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Gallery;
