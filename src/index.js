// write your code here
url = 'http://localhost:3000/spiceblends'
let spiceBlends

fetchSpiceBlends().then(console.log)
fetchSpiceBlends().then(spiceBlends => renderOneSpiceBlend(spiceBlends[0]))

function fetchSpiceBlends() {
    return fetch(url)
    .then(response => response.json())
    .then(data => spiceBlends = data)
}

function updateSpiceBlendFetcher(id, updatedObj) {
    fetch(`${url}/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedObj),
    })
}


// Render First Spice Blend //
const spiceBlendDetail = document.querySelector('#spice-blend-detail')

function renderOneSpiceBlend(spiceBlend) {
    spiceBlendDetail.dataset.id = spiceBlend.id
    updateForm.dataset.id = spiceBlend.id
    ingredientForm.dataset.id = spiceBlend.id

    const image = document.createElement('img')
    image.className = 'detail-image'
    image.src = spiceBlend.image
    image.alt = spiceBlend.title

    const title = document.createElement('h2')
    title.className = 'title'
    title.innerText = spiceBlend.title

    const ingredientsContainer = document.createElement('div')
    ingredientsContainer.className = 'ingredients-container'

    const ingredientsH4 = document.createElement('h4')
    ingredientsH4.innerText = 'Ingredients:'

    const ingredientsList = document.createElement('ul')
    ingredientsList.className = 'ingredients-list'

    ingredientsContainer.append(ingredientsH4, ingredientsList)
    spiceBlendDetail.append(image, title, ingredientsContainer)
}

// Update Spice Blend //
const updateForm = document.querySelector('#update-form')

updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = e.target.dataset.id

    const titleH2 = document.querySelector('.title')

    const title = e.target.title.value
    titleH2.innerText = title

    e.target.reset()

    updateSpiceBlendFetcher(id, {title})
})


// Add ingredients to Spice Blend //

const ingredientForm = document.querySelector('#ingredient-form')


ingredientForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    const ingredientsContainer = document.querySelector('.ingredients-container')

    const ingredient = document.createElement('li')
    ingredient.innerText = e.target.name.value
    
    ingredientsContainer.append(ingredient)

    e.target.reset()
})

