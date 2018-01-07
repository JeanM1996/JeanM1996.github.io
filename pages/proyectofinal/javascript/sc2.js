var enero=0;
var febrero=0;
var marzo=0;
var abril=0;
var mayo=0;
var junio=0;
var julio=0;
var agosto=0;
var septiembre=0
var octubre=0;
var noviembre=0;
var diciembre=0;



$(document).ready(function(){
    $.getJSON("../javascript/registros.json", function(datos) {
        for( var i = 0; i < datos.length; i++ ) {
            provincia=datos[i].Provincia;
            var fecha=datos[i].Fecha;
            //30/04/2014 dd/mm/aaaa
            var parts=fecha.split('/')
            var anio=parseInt(parts[0]);
            var mes=parseInt(parts[1]);                                          
            var dia=parseInt(parts[2]);
            if (mes==1) {
            	enero+=1;
            }
            if (mes==2) {
            	febrero+=1;
            }
            if (mes==3) {
            	marzo+=1;
            }
            if (mes==4) {
            	abril+=1;
            }
            if (mes==5) {
            	mayo+=1;
            }
            if (mes==6) {
				junio+=1;
            }                                                            

            if (mes==7) {
				julio+=1;
            }
            if (mes==8) {
				agosto+=1;
            }
            if (mes==9) {
				septiembre+=1;
            }
            if (mes==10) {
				octubre+=1;
            }
            if (mes==11) {
				noviembre+=1;
            }     
            if (mes==12) {
				diciembre+=1;
            }
          

}

 
Highcharts.chart('container3', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Muertes violentas por mes nivel Pais'
    },
    subtitle: {
        text: 'Source: Ministerio del Interior Ecuador'
    },
    xAxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    },
    yAxis: {
        title: {
            text: 'Muertes violentas'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Ecuador',
        data: [enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre]
    }]
});   
   }); 
  });
