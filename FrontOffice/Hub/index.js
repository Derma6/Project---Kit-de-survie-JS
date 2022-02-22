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

const article = document.querySelector('ul');
const searchBar = document.querySelector('input');
let dataAPI = [];

fetch('https://strapi-gogokodo.herokuapp.com/api/sources')
    .then(response => response.json())
    .then(data => { 
        dataAPI = data.data
        display(dataAPI)
        console.log(dataAPI);
    })

function display (data) {

    article.innerHTML = "";
    data.map(video => {
        let difficultyColor = "";

        // Display difficulty
        switch (video.attributes.difficulty) {
            case "Facile" :
                difficultyColor = "#2CA438"
                break;
            case "Moyen" :
                difficultyColor = "#F49A2F"
                break;
            case "Dure" :
                difficultyColor = "#E13131"
                break;
        default : difficultyColor = "#2CA438"
        }

        // Research color of category if null on API
        let categoryColor = "";
        let category = video.attributes.category

        if (video.attributes.color === null) {
                categoryColor = "grey";
            }
        if (video.attributes.color === null) {
            for (i=0; i<dataAPI.length; i++) {
                if (dataAPI[i].attributes.category == category && dataAPI[i].attributes.color != null) {
                    categoryColor = dataAPI[i].attributes.color
                } 
            } 
        } else {
            categoryColor = video.attributes.color;
        }

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
    display(filter)
})

//-----------------------Favoris switch-----------------------//
 
//const addFav = document.querySelectorAll('.addFav')
const favorisBtn = document.querySelector('#favorisBtn')
const favoris = [];

function switchFav (element) {
    if (element.getAttribute("src") == "images/coeur.png") {
        element.src = "images/coeur_fav.png"
        // console.log(dataAPI.findIndex(element.parentNode.parentNode.dataset.id))
        const index = dataAPI.findIndex(data => data.id == element.parentNode.parentNode.dataset.id)
        console.log(index);
        favoris.push(dataAPI[index])
    } else {
        element.src = "images/coeur.png"
        index = favoris.findIndex(data => data.id == element.parentNode.parentNode.dataset.id)
        favoris.splice(index, 1)
    }
    console.log(favoris)
}

favorisBtn.addEventListener('click', () => {
    display(favoris);
})

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