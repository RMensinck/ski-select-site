export default function setTextWithAnimation (text: string, setFunction) {

    const alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrestuvwxyz"
    const numbers: string ="0123456789"
    let iterations: number = 0 
    const interval = setInterval(() => {
        setFunction(text.split("").map((letter: string, index: number) => {
        if(index + 15 < iterations ) {
            return letter
        }        
        if (letter == " " || letter == "|" || letter == ".") {
            return letter
        }
        if (parseInt(letter)) {
            return numbers[(Math.floor((Math.random()) * 10))]
        }

        return alphabet[(Math.floor((Math.random()) * 52))]
        }).join("")
        )
        
        if(iterations >= 60) clearInterval(interval)
        iterations += 1
        
        }, 25)
    
    
}