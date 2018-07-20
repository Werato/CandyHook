////import { Point } from "mapbox-gl";

//$(function () {

//    msg_el = document.getElementById('msg'),
//        vectorSource = new ol.source.Vector(),
//        vectorLayer = new ol.layer.Vector({
//            source: vectorSource
//        }),

//        url_osrm_nearest = '//router.project-osrm.org/nearest/v1/driving/',
//        url_osrm_route = '//router.project-osrm.org/route/v1/driving/',
//        icon_url = 'https://raw.githubusercontent.com/openlayers/ol3/master/examples/data/icon.png',
//        styles = new ol.style.Style({
//            image: new ol.style.Icon({
//                src: icon_url,
//                anchor: [0.5, 46],
//                anchorXUnits: 'fraction',
//                anchorYUnits: 'pixels',
//                opacity: 0.75,
//            })
//        }),
//        points = [],
//        // 56.9246204 24.105487699999998

//        createFeature = function (coord) {
//            var feature = new ol.Feature({
//                type: 'point',
//                //geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
//                geometry: new ol.geom.Point(ol.proj.transform(to4326(coord)))//{ 0:coord[i].Lon, 1: }ol.proj.fromLonLat(coord)//[coord[0], coord[1]]
//            });
//            feature.setStyle(styles);
//            vectorSource.addFeature(feature);
//        },

//        to4326 = function (coord) {
//            return ol.proj.transform([
//                parseFloat(coord[0]), parseFloat(coord[1])
//            ], 'EPSG:3857', 'EPSG:4326');
//        },

//        view = new ol.View({
//            center: [0, 0],
//            zoom: 2
//        }),

//        map = new ol.Map({
//            layers: [
//                new ol.layer.Tile({
//                    source: new ol.source.OSM()
//                }),
//                vectorLayer
//            ],
//            target: 'map',
//                view: view
//        });


//    //***************************************************************

//    //var container = document.getElementById('popup');
//    //var content = document.getElementById('popup-content');
//    //var closer = document.getElementById('popup-closer');

//    var container = $('#popup');
//    var content = $('#popup-content');
//    var closer = $('#popup-closer');

//    /**
//     * Create an overlay to anchor the popup to the map.
//     */
//    var popup = new ol.Overlay({
//        element: container[0],
//        autoPan: true,
//        autoPanAnimation: {
//            duration: 250
//        }
//    });


//    /**
//     * Add a click handler to hide the popup.
//     * @return {boolean} Don't follow the href.
//     */
//    closer[0].onclick = function () {
//        overlay.setPosition(undefined);
//        closer[0].blur();
//        return false;
//    };
//    map.addOverlay(popup);

//    map.on('singleclick', function (evt) {
//        popup.setPosition(undefined);
//        map.forEachFeatureAtPixel(evt.pixel,
//            function (feature, layer) {
//                //скроллер + описание
//                //get photo

//                sendToController_v1("getUser", popUpStyle, feature.get("UserId"));

//                popup.setPosition(evt.coordinate);
//            })
//    });
//    //***************************************************************
//    function popUpStyle(model) {
//        console.log(model);
//        //head
//        //File / ShowImg ? strPhotoId = 6
//        for (var i in model)
//        {
//            content.find(".popup-slider")[0].innerHTML +=
//                "<div class='popUpMinSlider' style=\"background-image:url('File/ShowImg?strPhotoId=" + model[i].photoId + "')\"></div>";

//        }

//        content.find(".popup-userName")[0].innerHTML += "Name: " + model[0].userData.Name;
//        content.find(".popup-userSoname")[0].innerHTML += "Soname: " + model[0].userData.Soname;
//        content.find(".popup-userPhone")[0].innerHTML += "Phone: " + model[0].userData.Phone;
//        content.find(".popup-userPrice")[0].innerHTML += "Price: " + model[0].userData.Price;
//        content.find(".popup-userDescription")[0].innerHTML += "Description: " + model[0].userData.Description;

//    }

//    //map.on('pointerup', function (evt) { alert(11); })
    
//    function sendToController_v1(method, handler) {
//        $.ajax({
//            url: "Home/" + method,
//            type: "POST",
//            datatype: 'json',
//            //data: { userData: JSON.stringify(pageData) },
//            success: function (e) {
//                console.log(e);

//                handler(JSON.parse(e));

//            },
//            error: function (err) {
//                console.log(err);
//                alert(err);
//            }
//        })
//    }

//    function sendToController_v1(method, handler, param) {
//        $.ajax({
//            url: "Home/" + method,
//            type: "POST",
//            datatype: 'json',
//            data: { Data: JSON.stringify(param) },
//            success: function (e) {
//                console.log(e);

//                handler(JSON.parse(e));

//            },
//            error: function (err) {
//                console.log(err);
//                alert(err);
//            }
//        })
//    }

//    function drawUsers_v1(coord) {
//        //TD:Change
//        var iconStyle = new ol.style.Style({

//            image: new ol.style.Circle({
//                radius: 3,
//                fill: new ol.style.Fill({
//                    color: [255, 204, 102, 1]
//                }),
//                stroke: new ol.style.Stroke({
//                    color: [255, 204, 102, 1],
//                    width: 1.5
//                })
//            }),
//            zIndex: 1

//        });

//        //vectorSource.clear();

//        //var thing = new ol.geom.Polygon([[
//        //    ol.proj.transform([-16, -22], 'EPSG:4326', 'EPSG:3857'),
//        //    ol.proj.transform([-44, -55], 'EPSG:4326', 'EPSG:3857')
//        //]]);
//        //var featurething = new ol.Feature({
//        //    name: "Thing",
//        //    geometry: thing
//        //});
//        //vectorSource.addFeature(featurething);

//        for (var i in coord) {

//            var iconFeature1 = new ol.Feature({
//                geometry: new ol.geom.Point(ol.proj.transform([coord[i].Lon, coord[i].Lat], 'EPSG:4326', 'EPSG:3857')),
//                UserId: coord[i].UserId
//            });

//            iconFeature1.setStyle(styles);
//            vectorSource.addFeature(iconFeature1);
//        }
//    }

//    sendToController_v1("GetUsers", drawUsers_v1);
//});