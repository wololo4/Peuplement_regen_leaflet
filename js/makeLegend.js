//declaration des variables globales
var map;
var legend;

//fonction qui permet de dessiner une legende de la couche des chemins
function makeLegend(){
    //declaration de la variable legende
    legend = L.control.Legend({
        title: 'Légende',
        position: "bottomright",
        collapsed: true,
        symbolWidth: 24,
        opacity: 1,
        column: 1,
        legends: [{           
            label: "Bon",
            type: "rectangle",
            fillColor: "green",
            color : "black",
            weight: 0.5,
            opacity : 1,
        },{            
            label: "Moyen",
            type: "rectangle",
            fillColor: "yellow",
            color : "black",
            weight: 0.5,
            opacity : 1,
        },{            
            label: "Mauvais",
            type: "rectangle",
            fillColor: "red",
            weight: 2
        },{            
            label: "Ne sais pas",
            type: "rectangle",
            fillColor: "grey",
            color : "black",
            weight: 0.5,
            opacity : 1,
        },{
            label: "NA",
            type: "rectangle",
            fillColor: "white",
            color : "black",
            weight: 0.5,
            opacity : 1,
        }]
    })
    //ajout de la legende Ã  la page web
    .addTo(map);
}