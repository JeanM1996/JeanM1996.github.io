    
    //variables
    var p1=0;
    var p2=0;
    var p3=0;  
    var p4=0;
    var p5=0;
    var p6=0;
    var p1=0;
    var p2=0;
    var p3=0;  
    var p4=0;
    var p5=0;
    var p6=0; 
    var p7=0;
    var p8=0;
    var p9=0;  
    var p10=0;
    var p11=0;
    var p25=0; 
    var p13=0;
    var p14=0;
    var p15=0;  
    var p16=0;
    var p17=0;
    var p18=0; 
    var p19=0;
    var p20=0;
    var p21=0;  
    var p22=0;
    var p23=0;
    var p24=0; 
    var datos;                      
    var provincia;



//Lectura JSON
$(document).ready(function(){
    $.getJSON("javascript/registros.json", function(datos) {
        for( var i = 0; i < datos.length; i++ ) {
            //Asignacion a var provincia del valor del objeto en el parametro OBJ.provincia
            provincia=datos[i].Provincia;
            //Estructuras para sumar a suceso a la provincia donde este se ha sucitado
            if ( provincia=="LOJA") {
                p1+=1;
            }
            if ( provincia=="AZUAY") {
                p2+=1;
            }
            if ( provincia=="CANAR") {
                p3+=1;
            }   
            if ( provincia=="CHIMBORAZO") {
                p4+=1;
            }
            if ( provincia=="BOLIVAR") {
                p5+=1;
            }
            if ( provincia=="TUNGURAHUA") {
                p6+=1;
            }  
            if ( provincia=="COTOPAXI") {
                p7+=1;
            }
            if ( provincia=="PICHINCHA") {
                p8+=1;
            }
            if ( provincia=="SANTO DOMINGO DE LOS TSACHILAS") {
                p9+=1;
            }  
            if ( provincia=="IMBABURA") {
                p10+=1;
            }
            if ( provincia=="CARCHI") {
                p11+=1;
            }
            if ( provincia=="ESMERALDAS") {
                p25+=1;
            }        
            if ( provincia=="MANABI") {
                p13+=1;                    
            }
            if ( provincia=="LOS RIOS") {
                p14+=1;                    
            }
            if ( provincia=="GUAYAS") {
                p15+=1;  
            } 
            if ( provincia=="EL ORO") {
                p16+=1;
            }   
            if ( provincia=="ZAMORA CHINCHIPE") {
                p17+=1;
            }   
            if ( provincia=="MORONA SANTIAGO") {
                p18+=1;
            }  
            if ( provincia=="NAPO") {
                p19+=1;
            }
            if ( provincia=="PASTAZA") {
                p20+=1;
            }   
            if ( provincia=="ORELLANA") {
                p21+=1;
            }
            if ( provincia=="SUCUMBIOS") {
                p22+=1;
            }
   
            if ( provincia=="GALAPAGOS") {
                p23+=1;
            }     
            if ( provincia=="SANTA ELENA") {
                p24+=1;
            }    

        } 
// Creacion de arreglo data a presentarse en el mapa
//[id provincia(json mapa ecuador highCharts), variable incrementanda en estructuras if]
var data = [

    ['ec-gu', p15], //guayas
    ['ec-es', p25], //esmeraldas
    ['ec-cr', p11], //Carchi
    ['ec-im', p10], //imbabura
    ['ec-su', p22], //sucumbios
    ['ec-se', p24], //Santa elena
    ['ec-sd', p9], //Santo Domingo
    ['ec-az', p2], //azuay
    ['ec-eo', p16], //el oro
    ['ec-lj', p1], //LOja
    ['ec-zc', p17], //zamora Chimchipe
    ['ec-cn', p3], //cañar
    ['ec-bo', p5], //bolivar
    ['ec-ct', p7], //cototpaxi
    ['ec-lr', p14], //los rios
    ['ec-mn', p13], //manabi
    ['ec-cb', p4], //chimborazo
    ['ec-ms', p18], //morona santiago
    ['ec-pi', p8], //pichincha
    ['ec-pa', p20],  //pastaza
    ['ec-1076', p19], //napo
    ['ec-na', p21], //orellana
    ['ec-tu', p6], //tungurahua
    ['ec-ga', p23], //galapagos
];

Highcharts.mapChart('container', {
    //Indicacion de tipo de grafico
    chart: {
        map: 'countries/ec/ec-all'
    },
    //Titulo del grafico
    title: {
        text: 'Homicidios y Asesinatos Sucitados en el Ecuador durante el 2014'
    },
    //Subtitulo del grafico
    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/ec/ec-all.js">Ecuador</a><br>Source Data: Ministerio del Interior'

    },
    //permitir navergar por el mapa
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'top'
        }
    },

    colorAxis: {
        min: 0
    },
    
    series: [{
        data: data,
        name: 'Homicidios y Asesinatos',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }, {
            name: 'Separators',
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/ec/ec-all'], 'mapline'),
            color: 'red',
            showInLegend: false,
            enableMouseTracking: false
        }]
                });
});
});

function showsections(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}
var myIndex = 0;
function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    currentsection(myIndex)
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 6000);    
}
function plussections(n) {
  showsections(slideIndex += n);
}

function currentsection(n) {
  showsections(slideIndex = n);
}