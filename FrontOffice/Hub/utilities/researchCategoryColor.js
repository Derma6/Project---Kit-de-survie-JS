export function researchCategoryColor (colorByAPI, categoryByAPI, dataAPI) {

    // console.log(colorByAPI, categoryByAPI, dataAPI)
    if (colorByAPI === null) {
        for (let i=0; i<dataAPI.length; i++) {
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