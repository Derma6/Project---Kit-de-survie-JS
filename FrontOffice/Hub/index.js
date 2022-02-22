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
        display(data.data)
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
            `<li>
                <div>
                    <h3>${video.attributes.title}</h3>
                    <img class="addFav" src="images/coeur.png" alt="coeur vide" onclick="switchFav(this);">                
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
 
const addFav = document.querySelectorAll('.addFav')

function switchFav (element) {    
    if (element.getAttribute("src") == "images/coeur.png") {
        element.src = "images/coeur_fav.png"
    } else {
        element.src = "images/coeur.png"
    }
}
