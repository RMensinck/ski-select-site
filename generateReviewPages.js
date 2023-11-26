// import reviews from './components/reviews.json' assert {type: "json"}
// import { emptyDirSync } from 'fs-extra'

const fs = require('fs-extra')
const reviews = require('./public/reviews/reviews.json')
const reviewNames = Object.keys(reviews)


fs.emptyDirSync('./pages/reviews')

reviewNames.map((skiName, index) => {
    const reviewPage = 
    `import ReviewTemplate from '../../components/reviewTemplate'

    export default function Review() {
        return ReviewTemplate("${skiName}")
    }`
    

    fs.writeFile(`./pages${reviews[skiName].href}.tsx`, reviewPage, function(error) {
        if (error) throw error
        console.log("created")
    }, )
})

