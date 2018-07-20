$(function () {
    //init 
    var saveUser = $(".js-save-user");
    var sendData = {
        name: "",
        password: "",
        soname: "",
        phone: 0,
        price: 0,
        description: "",
        lon: undefined,
        lat: undefined,
        files: []
    };
    //hendlers

    function sendToController(pageData, method) {
        $.ajax({
            url: "Home/" + method,
            type: "POST",
            datatype: 'json',
            data: { userData: JSON.stringify(pageData) },
            success: function (e) {
                console.log(e);
                drawUsers(JSON.parse(e));//TODO: D
            },
            error: function (err) {
                console.log(err);
                alert(err);
            }
        })
    }

    function drawUsers(coord) {
        //TD:Change
        var iconStyle = new ol.style.Style({

            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: [255, 204, 102, 1]
                }),
                stroke: new ol.style.Stroke({
                    color: [255, 204, 102, 1],
                    width: 1.5
                })
            }),
            zIndex: 1

        });


        for (var i in coord) {


            var addedMarker = new ol.geom.Point([
                ol.proj.transform([coord[i].Lon, coord[i].Lat], 'EPSG:4326', 'EPSG:3857')]);


            var featurething = new ol.Feature({
                name: "Marker 01",
                geometry: addedMarker
            });

            featurething.setStyle(iconStyle);

            vectorSource.addFeature(featurething);

        }


        //usersFeature.setStyle(iconStyle);
        //vectorSource.addFeature(usersFeature);
        //vectorSource.addFeatures(usersFeature);

    }

    function validUser(parentElemet) {
        var email = parentElemet.find(".email");
        var phone = parentElemet.find(".phone");
        var returnval = true;
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        //email
        console.log(1);
        if (re.test(String(email.val()).toLowerCase())) {
            email.addClass("alert-success");
        }
        else {
            email.addClass("alert-danger");
            returnval = false;
        }

        //phone

        re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (re.test(String(phone.val()).toLowerCase())) {
            phone.addClass("alert-success");
        }
        else {
            phone.addClass("alert-danger");
            //returnval = false;
        }

        return returnval;
    }

    //run
    function getLocation(hendler) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(hendler);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function PositionHandler(coor) {
        //var marker = createMarker(coor);
        //position.coords.latitude
        sendData.long = coor.coords.longitude;
        sendData.lat = coor.coords.latitude;
    }

    saveUser.click(
        function () {

            var parent = $("#newUserPP"),
                name = parent.find(".name"),
                soname = parent.find(".soname"),
                phone = parent.find(".phone"),
                description = parent.find(".description"),
                email = parent.find(".email"),
                password = parent.find(".password"),
                price = parent.find(".price");
            
            if (validUser(parent)) {
                sendData.description = description.val();
                sendData.name = name.val();
                sendData.soname = soname.val();
                sendData.phone = phone.val();
                sendData.price = price.val();
                sendData.email = email.val();
                sendData.password = password.val();
                getLocation(function (coor) {
                    sendData.lon = coor.coords.longitude;
                    sendData.lat = coor.coords.latitude;
                });
                //v1
                var IntervalIds = setInterval(function () {
                    if (sendData.lat !== undefined && sendData.lon !== undefined) {
                        sendToController(sendData, "SaveUser");
                        clearInterval(IntervalIds);
                    }

                }, 1000);
            }
        });
})