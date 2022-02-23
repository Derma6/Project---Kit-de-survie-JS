const addPageBtn = document.querySelector('#addPage')
const addArticleBtn = document.querySelector('#addArticle')

const article = document.querySelector('article')

addArticleBtn.addEventListener('click', () => {
    article.insertAdjacentElement('beforebegin', article.cloneNode(true))
})    

const h1 = document.querySelector('h1')

function saveContent(title, contenu) {
    localStorage.setItem(title, contenu)
}

function loadContent(title) {
    return localStorage.getItem(title)
}

addPageBtn.addEventListener('click', () => {
    h1.innerHTML = "Menu"
    saveContent("h1", "Menu")
})

const loading = (title) => {
    if (!localStorage.getItem(title)) {
   h1.innerHTML = "Arrays"
} else {
    h1.innerHTML = loadContent('h1')
}}

window.onload = loading('h1')