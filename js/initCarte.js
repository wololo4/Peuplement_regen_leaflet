//declaration de variable globale
var map;
var drawnItems;
var osm2, osmAttrib;
var MiniMap;
var jsonTest;
var myLayersControl;

//fonction qui permet d'initialiser la carte
function initCarte(){


    //declaration des variable de fond de carte
    osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    var BING_KEY = 'rqqz4TIOHL36kTs5EI1l~OknGli9JCFEF98o18sh7ow~Ai0PB2EU5ZW4V3qu95fN0g98QXAwG6E2QmwryHjV7tJpOAiHQyKuwqrJaWM2ZAAL'

	wmsUrl = 'http://35.203.109.161/cgi-bin/mapserv?map=/home/pierre/mapfile/maitrise/chemin.map&'

    //fond de carte openstreetmap
    var openstreetmap = new L.tileLayer(
        osmUrl, 
        {attribution: osmAttrib}
    )

    //fond de carte bing map satellite
    var bingMapsSatellite = L.tileLayer.bing(BING_KEY)

	/*var peuplement = L.tileLayer.betterWms(wmsUrl, {
		layers: 'peuplement',
		transparent: true,
		format: 'image/png',
		zindex: 100
	})*/	

	//declaration de la variable map
    map = L.map("map", {
        center: [49.013343,-78.897791], 
        zoom: 11,
        layers: [openstreetmap/*, peuplement*/]
    });

    //groupe layer de fond de care
	var baseLayers = {
		"OpenStreetMap": openstreetmap,
		"BingMapsSatellite": bingMapsSatellite
	};

	/*var Overlays = {
        "Peuplement" : peuplement
    }*/

    //ajout d'un groupe layer. permet de changer de fond de carte
	myLayersControl = L.control.layers(baseLayers/*, Overlays*/).addTo(map);

    // Create feature group for drawn items & layer group for previously drawn items
    drawnItems = L.featureGroup().addTo(map);
    

    //fonction qui permet plusieurs control de la carte (voir miniMap.js)
    miniMap();

    //fonction qui permet d'afficher une lÃ©gende(voir makeLegend.js)
    makeLegend();
}