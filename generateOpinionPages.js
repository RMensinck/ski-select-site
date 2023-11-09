const fs = require('fs-extra')
const skis = require('./components/allSkisFrontend.json')


fs.emptyDirSync('./pages/opinions')

skis.map((ski, index) => {
    const opinionsPage = 
    `import opinionsTemplate from '../../components/opinionsTemplate'

    export default function Opinions() {
        return opinionsTemplate("${ski.name}")
    }`
    

    fs.writeFile(`./pages${ski.href}.tsx`, opinionsPage, function(error) {
        if (error) throw error
        console.log("created")
    }, )
})
