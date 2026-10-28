import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch 30 photos from Picsum API once on component mount.
 * 
 * Returns:
 * - { photos, loading, error }
 *   - photos (Array): List of photo objects fetched from the API.
 *   - loading (boolean): True while the network request is pending, false once completed.
 *   - error (string|null): Readable error message if the fetch fails, null on success.
 * 
 * When the API fails:
 * - If response.ok is false or network fails, an Error is thrown and caught in the catch block.
 * - The error state is set to a readable error message.
 * - In the finally block, loading is set to false so the UI knows fetching has ended.
 * - If the component has unmounted during the request, isMounted prevents updating unmounted state.
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30');

        if (!response.ok) {
          throw new Error(`Failed to fetch photos (HTTP ${response.status})`);
        }

        const data = await response.json();

        if (isMounted) {
          setPhotos(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch photos. Please check your network connection.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;
