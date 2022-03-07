export function saveContent(key, contenu) {
    localStorage.setItem(key, contenu)
}
export function loadContent (key){
    if(!localStorage.getItem(key))return
         return JSON.parse(localStorage.getItem(key))
}