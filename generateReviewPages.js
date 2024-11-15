// import reviews from './components/reviews.json' assert {type: "json"}
// import { emptyDirSync } from 'fs-extra'

const fs = require('fs-extra')
const reviews = require('./public/reviews/reviews.json')
const reviewNames = Object.keys(reviews)



fs.emptyDirSync('./pages/reviews')

reviewNames.map((skiName, index) => {
    const reviewPage = 
    `import ReviewTemplate from '../../components/reviewTemplate'
import { GetServerSideProps } from 'next';
import { checkFolderExists } from '../../utils/checkFolderExists';
import reviews from '../../public/reviews/reviews.json'

export const getServerSideProps: GetServerSideProps = async (context) => {

    const photoFolderExists = checkFolderExists(reviews["${skiName}"].brand, reviews["${skiName}"].model);

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
    return ReviewTemplate("${skiName}", photoFolderExists)
}`
    

    fs.writeFile(`./pages${reviews[skiName].href}.tsx`, reviewPage, function(error) {
        if (error) throw error
        console.log("created")
    }, )
})

