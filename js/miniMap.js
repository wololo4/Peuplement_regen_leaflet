//declaration de variable globale
var osm2, osmAttrib;
var miniMap;

//fonction qui permet de dessiner une mini carte
function miniMap(){
    
    //declaration du fond de carte de la mini-carte
    osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib});
    //ajout de la mini-carte Ã  la page web
    miniMap = new L.Control.MiniMap(
        osm2,
        {
            zoomLevelOffset:-6,
            position:'bottomleft'
        }
    ).addTo(map);
}