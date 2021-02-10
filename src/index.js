// write your code here
const url = 'http://localhost:3000/spiceblends'
const ingredientsUrl = 'http://localhost:3000/ingredients'
let spiceBlends
let allIngredients
document.addEventListener('DOMContentLoaded',() => {
    fetchSpiceBlends().then(console.log)
    fetchIngredients()
    fetchSpiceBlends().then(spiceBlends => renderOneSpiceBlend(spiceBlends[0]))
    fetchSpiceBlends().then(allIngredients => renderIngredients())
    // fetchSpiceBlends().then(fetchIngredients())

})


// fetches //

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

function addIngredientFetch(ingredientObj) {
    fetch(ingredientsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredientObj)
    })
}

function fetchIngredients() {
    fetch(ingredientsUrl)
    .then(response => response.json())
    .then(data => allIngredients = data)
    
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
    const spiceblendId = parseInt(e.target.dataset.id)
    const name = e.target.name.value
    const newIngredient = {name, spiceblendId}

    const ingredientLi = document.createElement('li')
    ingredientLi.innerText = e.target.name.value
    
    ingredientsContainer.append(ingredientLi)

    e.target.reset()

    addIngredientFetch(newIngredient)
})

function renderIngredients() {
    const ingredientsContainer = document.querySelector('.ingredients-container') 

    const filteredIngredients = allIngredients.filter(ingredient => ingredient.spiceblendId == spiceBlendDetail.dataset.id)
    filteredIngredients.forEach(ingredient => {
        const ingredientLi = document.createElement('li')
        ingredientLi.innerText = ingredient.name
    
        ingredientsContainer.append(ingredientLi)
    });

}

