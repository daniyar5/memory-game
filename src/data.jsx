const images = [
    "/images/apple.jpg",
    "/images/apple.jpg",
    "/images/pineapple.jpg",
    "/images/pineapple.jpg",  
    "/images/watermelon.jpg",
    "/images/watermelon.jpg",
    "/images/banana.jpg",
    "/images/banana.jpg",
    "/images/avocado.jpg",
    "/images/avocado.jpg",
    "/images/granate.jpg",
    "/images/granate.jpg"
]

export function shuffle(array){
    let index = array.length
    while (index !== 0){
      let randomIndex = Math.floor(Math.random() * index)
      index--
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
    }
    return array
}

const newImages = shuffle([...images])
const data = newImages.map((image, index) => ({
    id: index,
    image,
    isMatched: false
}))

export default data