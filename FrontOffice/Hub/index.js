// //-----------------------Firebase-----------------------//
// firebase.initializeApp( {
//     apiKey: "AIzaSyAD1KPUlqKsN3eU_2ikLhU4HUcPsfytkLU",
//     authDomain: "gogokodo-2590b.firebaseapp.com",
//     projectId: "gogokodo-2590b",
//     storageBucket: "gogokodo-2590b.appspot.com",
//     messagingSenderId: "833185072727",
//     appId: "1:833185072727:web:03129f4b8d69a734328512"
//     });

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       document.querySelector('body').style.display = 'block'         
//     } else {
//         document.location.href = "http://127.0.0.1:5500/FrontOffice/loginPage/index.html"
//     }
// });

//-----------------------API-----------------------//


// ------------------------ import -----------------// //
import {easyFetch} from './utilities/easyFetch.js'
import {researchCategoryColor} from './utilities/researchCategoryColor.js'
import {switchFav} from './switchFav.js'
import {saveContent, loadContent} from './utilities/localStorage.js'

// ---------------------- Global variable --------------- // 

export let dataAPI = [];
export let favoris = [];
export let cool = ''
let metaAPI = [];
let globalState = [];


// -------------------  Set Value of local variable -------------
export function setFavoris(value) {
    favoris = value;
}
export function setGlobalState () {
    return globalState;
}

easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources',saveAPI,display)
// const paginationBtn = document.querySelector('footer ul')

// // fetch('https://strapi-gogokodo.herokuapp.com/api/sources?pagination[page]=1&pagination[pageSize]=12')
// // .then (response => response.json())
// // .then(pages => pagination(pages)) 

// function pagination (pages) {
//     // console.log(pages.meta.pagination);

//     for(let i=0; i < pages.meta.pagination.pageCount; i++) {
//         //create page button
//         paginationBtn.innerHTML += `<li id="page${i+1}" onclick>${i+1}</li>`
//     }

//     display(pages)

// }

//easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources?pagination[page]=1&pagination[pageSize]=12', pagination)

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
function saveAPI (data) {
  dataAPI = data.data
  metaAPI = data.meta
  globalState = data
  console.log(globalState);
}

export function display (data) {
    
    article.innerHTML = "";
    console.log('data here ', data)
    data.map(video => {

        //console.log(video)

        // Display difficulty
        let difficultyColor = displayDifficulty(video.attributes.difficulty);        

        // Research color of category if null on API

        let categoryColor = researchCategoryColor(video.attributes.color, video.attributes.category, dataAPI);

        //Inject to HTML
        article.innerHTML += 
            `<li data-id="${video.id}">
                <div>
                    <h3>${video.attributes.title}</h3>
                    <img class="addFav" src="images/coeur.png" alt="coeur" >                
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

export function searchBarFilter (data) {
  let input = searchBar.value
      input=input.toLowerCase();
      console.log(input);

  const filter = data.filter(data => {
    return (
      data.attributes.category.toLowerCase().includes(input) || data.attributes.title.toLowerCase().includes(input)
  )})
  return filter
}

// searchBar.addEventListener('keyup', () => {
    
//     display(searchBarFilter(globalState))
//     //easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources?filters[title][$containsi]='+input, display)
// })

//-----------------------Favoris switch-----------------------//
 
//const addFav = document.querySelectorAll('.addFav')
const favorisBtn = document.querySelector('#favorisBtn')

let stateDisplayFav = false;
favorisBtn.addEventListener('click', () => {

    

    if(!stateDisplayFav){
        favoris = loadContent("favoris")
        display({data:favoris})
        console.log({data:favoris})
        stateDisplayFav = true;
    } else{
        stateDisplayFav = false
        easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources', display)
    }
    // switch (stateDisplayFav) {
    //     case false : 
    //         display(favoris)
    //         stateDisplayFav = true
    //         break;
    //     case true : 
    //         easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources', display)
    //         stateDisplayFav = false
    //         break;
    //     default : easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources', display)
    // }
})

window.onload = () => {
    //favoris.push(loadContent("favoris"))
    if(!loadContent("favoris")) return 
    favoris = loadContent("favoris")
    //console.log(favoris)
}

//-----------------------TERMINAL-----------------------//

const terminalBtn = document.querySelector("#terminal")
const titre = document.querySelector("h1")
const terminal = document.querySelector(".terminal")
const main = document.querySelector("main")
const termLine = document.querySelector("#text")

terminalBtn.addEventListener('click', () => {
     
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