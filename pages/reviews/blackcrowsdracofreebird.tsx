import ReviewTemplate from '../../components/reviewTemplate'
import { GetServerSideProps } from 'next';
import { checkFolderExists } from '../../utils/checkFolderExists';
import reviews from '../../public/reviews/reviews.json'

export const getServerSideProps: GetServerSideProps = async (context) => {

    const photoFolderExists = checkFolderExists(reviews["Black crows Draco freebird"].brand, reviews["Black crows Draco freebird"].model);

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
    return ReviewTemplate("Black crows Draco freebird", photoFolderExists)
}