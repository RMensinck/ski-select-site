import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

export const useFirebaseImage = (imagePath) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imagePath) {
      setLoading(false);
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