import ReviewTemplate from '../../components/reviewTemplate'
import { GetServerSideProps } from 'next';
import { checkFolderExists } from '../../utils/checkFolderExists';
import reviews from '../../public/reviews/reviews.json'

export const getServerSideProps: GetServerSideProps = async (context) => {

    const photoFolderExists = checkFolderExists(reviews["Head Porsche 8 series"].brand, reviews["Head Porsche 8 series"].model);

    return {
        props: {
        photoFolderExists,
        },
    };
    };

interface ReviewProps {
  skiName: string;
  photoFolderExists: boolean;
}

export default function Review({ photoFolderExists }: ReviewProps) {
    return ReviewTemplate("Head Porsche 8 series", photoFolderExists)
}