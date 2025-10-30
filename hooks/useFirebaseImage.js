import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

export const useFirebaseImage = (imagePath) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Handle null/undefined imagePath
    if (!imagePath) {
      setLoading(false);
      setError(new Error('No image path provided'));
      return;
    }

    const getImage = async () => {
      try {
        setLoading(true);
        setError(null);
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        console.log("Fetched image URL from Firebase:", url);
        setImageUrl(url);
      } catch (err) {
        console.error('Error getting image URL:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getImage();
  }, [imagePath]);

  return { imageUrl, loading, error };
};