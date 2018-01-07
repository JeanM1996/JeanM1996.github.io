      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: {lat: -1.7957703564951626, lng: -78.13688745000002}
        });
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map);

}

      function geocodeAddress(geocoder, resultsMap) {
        $(document).ready(function(){
            $.getJSON("../javascript/registros.json", function(datos) {
                for( var i = 0; i < datos.length; i++ ) {
                    //Asignacion a var provincia del valor del objeto en el parametro OBJ.provincia
                    var provincia=datos[i].Provincia;
                    var canton=datos[i].Canton;
                    var address=provincia+","+canton+",Ecuador";
                    var tipo=datos[i].Tipologia;
                    var fecha=datos[i].Fecha;
                    var edad=datos[i].Edad;
                    var genero=datos[i].Sexo;
                    var estado=datos[i].Estado_Civil;
                    var contentString = '<div id="content">'+'<div id="siteNotice">'+'</div>'+'<h1 id="firstHeading" class="firstHeading">'+tipo+'</h1>'+
                    '<div id="bodyContent">'+
                    '<p>Lugar:'+address+'</p>'+
                    '<p>Fecha:'+fecha+'</p>'+
                    '<p>Edadr:'+edad+'</p>'+
                    '<p>Genero:'+genero+'</p>'+
                    '<p>Estado Civil:'+estado+'</p>'+
            '</div>'+
            '</div>';
           var infowindow = new google.maps.InfoWindow({
          content: contentString
        });


                    geocoder.geocode({'address': address}, function(results, status) {
                      if (status === 'OK') {
                        resultsMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                          map: resultsMap,
                          position: results[0].geometry.location,
                          draggable: true,
                          animation: google.maps.Animation.DROP,
                          title: 'Tipo: '+ tipo+' || '+'Edad: '+edad+' || '+'Fecha: '+fecha

                        });
                        marker.addListener('click', function() {
                          infowindow.open(map, marker);
                          marker.setAnimation(google.maps.Animation.BOUNCE);
                        });

                      } 
                    });

                }

           });
       });


   }

