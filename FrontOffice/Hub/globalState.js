document.querySelector('section > .container').addEventListener('click',function (e){
  searchBar.value = ""
  displayMode(e)
})

import {setGlobalState, display, searchBarFilter} from './index.js'


let changeMode = false
let localState = []
let filtre = "";

const displayMode = (event) => {
  
  if(event.target.id == 'favorisBtn'){
    return
  }
  if(!changeMode){
    localState = setGlobalState()
    console.log(localState);

    const filtered = localState.data
    .filter(mode => {
        if(!mode.attributes.difficulty){
          mode.attributes.difficulty = 'Facile' 
        }
  
      return mode.attributes.difficulty == event.target.id
     
    })
    console.log('filtre',filtered);
    display(filtered)
    changeMode = true
    console.log(changeMode);
    filtre = filtered;

} else {
    changeMode = false
     
    display(localState.data)
    displayMode(event)
    
}
}

searchBar.addEventListener('keyup', () => {
  localState = setGlobalState()
  if(changeMode) {
    display(searchBarFilter(filtre))
  } else {
    display(searchBarFilter(localState.data))
  }
    
    //easyFetch('https://strapi-gogokodo.herokuapp.com/api/sources?filters[title][$containsi]='+input, display)
})