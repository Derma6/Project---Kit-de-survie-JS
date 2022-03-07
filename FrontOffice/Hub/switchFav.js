
import {dataAPI,favoris,setFavoris} from './index.js'
import {saveContent} from './utilities/localStorage.js'

 
document.querySelector('.contenu').addEventListener('click', 
function (e){
    if(!e.target.className =="addFav")return 
    switchFav(e.target)
})

export function switchFav (element) {
    const fav = Array.from(new Set(favoris))
    if (element.getAttribute("src") == "images/coeur.png") {
        element.src = "images/coeur_fav.png"
        let index = dataAPI.findIndex(data => data.id == element.parentNode.parentNode.dataset.id)
        //console.log(index)
     
        
        console.log(favoris)
        favoris.push(dataAPI[index])
        
    } else {
        element.src = "images/coeur.png"
        //index = favoris.findIndex(data => data.id == element.parentNode.parentNode.dataset.id)
        
        setFavoris(fav)

        //favoris.splice(index, 1)
    }
    saveContent("favoris", JSON.stringify(favoris))
    //console.log(favoris)
}