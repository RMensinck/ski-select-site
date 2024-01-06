import { useState } from 'react';
import { db } from '@/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import standardTexts from '@/texts/standardTexts';
import { useRouter } from 'next/router'

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const router = useRouter()
  const { locale } = router 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!feedback.trim()) return;

    const skiRef = doc(db, 'feedback', "homepage");

    try {
      await updateDoc(skiRef, {
        opinions: arrayUnion({
          text: feedback,
          createdAt: new Date()
        })
      });
      setFeedback(''); 
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (

    <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
      <textarea
        className="min-w-[300px] lg:min-w-[400px] rounded-lg"
        placeholder={standardTexts.feedbackPlaceholder[locale]}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        type="submit"
        className="bg-dark-blue text-custom-white py-2 px-4 rounded-full max-w-[200px] shadow-lg"
      >
        {standardTexts.submitFeedback[locale]}
      </button>
    </form>


  );
}

export default FeedbackForm;