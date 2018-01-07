var cero=0;
var uno=0;
var dos=0;
var tres=0;
var cuatro=0;
var cinco=0;
var seis=0;
var siete=0;
var ocho=0
var nueve=0;
var diez=0;
var once=0;
var doce=0;
var trece=0;
var catorce=0;
var quince=0;
var diesiseis=0;
var diesisiete=0;
var diesiocho=0;
var diesinueve=0;
var veinte=0;
var veintiuno=0;
var veintidos=0;
var veintitres=0;
var venticuatro=0;
$(document).ready(function(){
    $.getJSON("../javascript/registros.json", function(datos) {
        for( var i = 0; i < datos.length; i++ ) {
            provincia=datos[i].Provincia;
            var horahecho=datos[i].Hora_Infraccion;
            var parts=horahecho.split(':');
            var hora=parseInt(parts[0]);
            if (hora==0) {
            	cero+=1;
            }
            if (hora==1) {
            	uno+=1;
            }
            if (hora==2) {
            	dos+=1;
            }
            if (hora==3) {
            	tres+=1;
            }
            if (hora==4) {
            	cuatro+=1;
            }
            if (hora==5) {
				cinco+=1;
            }                                                            

            if (hora==6) {
				seis+=1;
            }
            if (hora==7) {
				siete+=1;
            }
            if (hora==8) {
				ocho+=1;
            }
            if (hora==9) {
				nueve+=1;
            }
            if (hora==10) {
				diez+=1;
            }     
            if (hora==11) {
				once+=1;
            }
            if (hora==12) {
                doce+=1;
            }
            if (hora==13) {
                trece+=1;
            }
            if (hora==14) {
                catorce+=1;
            }
            if (hora==15) {
                quince+=1;
            }
            if (hora==16) {
                diesiseis+=1;
            }
            if (hora==17) {
                diesisiete+=1;
            }                                                            

            if (hora==18) {
                diesiocho+=1;
            }
            if (hora==19) {
                diesinueve+=1;
            }
            if (hora==20) {
                veinte+=1;
            }
            if (hora==21) {
                veintiuno+=1;
            }
            if (hora==22) {
                veintidos+=1;
            }     
            if (hora==23) {
                veintitres+=1;
            }    
         
          

}

 
Highcharts.chart('container4', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Muertes violentas por hora nivel Pais'
    },
    subtitle: {
        text: 'Source: Ministerio del Interior Ecuador'
    },
    xAxis: {
        categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
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
        data: [cero,uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez,once,doce,trece,catorce,quince,diesiseis,diesisiete,diesiocho,diesinueve,veinte,veintiuno,veintidos,veintitres]
    }]
});   
   }); 
  });
