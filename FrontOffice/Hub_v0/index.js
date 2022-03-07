//-----------------------Firebase-----------------------//
firebase.initializeApp( {
    apiKey: "AIzaSyAD1KPUlqKsN3eU_2ikLhU4HUcPsfytkLU",
    authDomain: "gogokodo-2590b.firebaseapp.com",
    projectId: "gogokodo-2590b",
    storageBucket: "gogokodo-2590b.appspot.com",
    messagingSenderId: "833185072727",
    appId: "1:833185072727:web:03129f4b8d69a734328512"
    });

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      document.querySelector('body').style.display = 'block'         
    } else {
        document.location.href = "http://127.0.0.1:5500/FrontOffice/loginPage/index.html"
    }
});

//-----------------------API-----------------------//
let dataAPI = [];
let metaAPI = [];

async function easyFetch (url, callback) {
    const response = await fetch(url);
    const data = await response.json();
    dataAPI = data.data
    metaAPI = data.meta
    console.log(dataAPI);
    console.log(metaAPI);
    callback(data)
}

easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources', display)
const paginationBtn = document.querySelector('footer ul')

// fetch('https://strapi-gogokodo.herokuapp.com/api/sources?pagination[page]=1&pagination[pageSize]=12')
// .then (response => response.json())
// .then(pages => pagination(pages)) 

function pagination (pages) {
    console.log(pages.meta.pagination);

    for(i=0; i < pages.meta.pagination.pageCount; i++) {
        //create page button
        paginationBtn.innerHTML += `<li id="page${i+1}" onclick>${i+1}</li>`
    }

    display(pages.data)

}

easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources?pagination[page]=1&pagination[pageSize]=12', pagination)
//-----------------------DISPLAY-----------------------//

const article = document.querySelector('.contenu');
const searchBar = document.querySelector('input');

function displayDifficulty(difficulty) {
    switch (difficulty) {
        case "Facile" :
            return "#2CA438"
        case "Moyen" :
            return "#F49A2F"
        case "Dure" :
            return "#E13131"
        default : return "#2CA438"
    }
}
function researchCategoryColor (colorByAPI, categoryByAPI, dataAPI) {
    if (colorByAPI === null) {
        for (i=0; i<dataAPI.length; i++) {
            if (dataAPI[i].attributes.category == categoryByAPI && dataAPI[i].attributes.color != null) {
                return dataAPI[i].attributes.color
            } 
        } 
    } else {
        return colorByAPI;
    }
    if (colorByAPI === null) {
        return "grey";
    }
}

function display (data) {

    article.innerHTML = "";

    data.map(video => {

        // Display difficulty
        let difficultyColor = displayDifficulty(video.attributes.difficulty);        

        // Research color of category if null on API

        let categoryColor = researchCategoryColor(video.attributes.color, video.attributes.category, dataAPI);

        //Inject to HTML
        article.innerHTML += 
            `<li data-id="${video.id}">
                <div>
                    <h3>${video.attributes.title}</h3>
                    <img class="addFav" src="images/coeur.png" alt="coeur" onclick="switchFav(this);">                
                </div>
                <div>
                    <p class="category" style="background-color: ${categoryColor}">${video.attributes.category.toUpperCase()}</p>
                </div>
                <div>
                    <span class="difficulty" style= "background-color:${difficultyColor}"></span>
                    <a href="${video.attributes.url}" target="_blank">Visiter</a>
                </div>
            </li>`
    })
}

//-----------------------Search bar-----------------------//

searchBar.addEventListener('keyup', () => {
    let input = searchBar.value
    input=input.toLowerCase();
    const filter = dataAPI.filter(dataAPI => {
        return (
        dataAPI.attributes.category.toLowerCase().includes(input) || dataAPI.attributes.title.toLowerCase().includes(input)
        )
    })
    easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources', display)
    display(filter)
    console.log(filter);
    console.log(dataAPI);
    console.log(input);
})

//-----------------------Favoris switch-----------------------//
 
//const addFav = document.querySelectorAll('.addFav')
const favorisBtn = document.querySelector('#favorisBtn')
let favoris = [];

function switchFav (element) {
    if (element.getAttribute("src") == "images/coeur.png") {
        element.src = "images/coeur_fav.png"
        const index = dataAPI.findIndex(data => data.id == element.parentNode.parentNode.dataset.id)
        console.log(index);
        favoris.push(dataAPI[index])
    } else {
        element.src = "images/coeur.png"
        index = favoris.findIndex(data => data.id == element.parentNode.parentNode.dataset.id)
        favoris.splice(index, 1)
    }
    saveContent("favoris", JSON.stringify(favoris))
    console.log(favoris)
}
function saveContent(key, contenu) {
    localStorage.setItem(key, contenu)
}
function loadContent (key){
    if(localStorage.getItem(key).includes('{')){
         return JSON.parse(localStorage.getItem(key))
    }
    else{
        return localStorage.getItem(key)
    }
}

let stateDisplayFav = false;
favorisBtn.addEventListener('click', () => {
    switch (stateDisplayFav) {
        case false : 
            display(favoris)
            stateDisplayFav = true
            break;
        case true : 
            easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources', display)
            stateDisplayFav = false
            break;
        default : easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources', display)
    }
})

window.onload = () => {
    favoris = loadContent("favoris")
    console.log(favoris)
}

//-----------------------TERMINAL-----------------------//

const terminalBtn = document.querySelector("#terminal")
const titre = document.querySelector("h1")
const terminal = document.querySelector(".terminal")
const main = document.querySelector("main")
const termLine = document.querySelector("#text")

terminalBtn.addEventListener('click', () => {
    console.log('clic');
  if (terminal.style.display === "none") {
    terminal.style.display = "block"
    termLine.focus()
    main.style.display = "none"
    titre.innerHTML = "TERMINAL"
    terminalBtn.innerHTML = "Hub"
  } else {
    terminal.style.display = "none"
    main.style.display = "flex"
    titre.innerHTML = "<span>Go Go</span> Hub"
    terminalBtn.innerHTML = "Terminal"
  }
})

const check = document.querySelector(".console")
const menu = document.querySelector(".menu")

check.addEventListener('change', (e) => {
  if (e.target.value == "ls") {
    menu.style.display = "block"
    e.target.value = ""
  } else {
    menu.style.display = "none"
  }

  if (e.target.value == "cd ..") {
    terminal.style.display = "none"
    main.style.display = "flex"
    titre.innerHTML = "<span>Go Go</span> Hub"
    e.target.value = ""
    terminalBtn.innerHTML = "Terminal"
  }

  if (e.target.value == "cd index.html") {
    document.location.href = "http://127.0.0.1:5500/FrontOffice/loginPage/index.html"
    e.target.value = ""
  }

  if (e.target.value == "cd Hub.html") {
    document.location.href = "http://127.0.0.1:5500/index.html#"
    e.target.value = ""
  }
})