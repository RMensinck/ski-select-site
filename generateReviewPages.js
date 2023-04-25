// import reviews from './components/reviews.json' assert {type: "json"}
// import { emptyDirSync } from 'fs-extra'

const fs = require('fs-extra')
const reviews = require('./components/reviews.json')


fs.emptyDirSync('./pages/reviews')

reviews.map((review, index) => {
    const reviewPage = 
    `import ReviewTemplate from '../../components/reviewTemplate'

    export default function Review() {
        return ReviewTemplate("${review.fullName}")
    }`
    

    fs.writeFile(`./pages${review.href}.tsx`, reviewPage, function(error) {
        if (error) throw error
        console.log("created")
    }, )
})

