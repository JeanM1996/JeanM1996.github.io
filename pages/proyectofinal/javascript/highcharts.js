
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
    var p12=0; 
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
    var tipo;
    var homicidio=0;
    var asesinato=0;
    var feminicidios=0;
    var genero;
    var masculino=0;
    var femenino=0;
    var edad=0;
    var nino=0;
    var adolescente=0;
    var joven=0;
    var adulto=0;
    var adulto_mayor=0;
    var estadoc;

    var soltero=0;
    var casado=0;
    var divorciado=0;
    var viudo=0;
    var unionlibre=0;

    var zona;
    var z1=0;
    var z2=0;
    var z3=0;
    var z4=0;
    var z5=0;
    var z6=0;
    var z7=0;
    var z8=0;
    var z9=0;

    var nacion;
    var ec=0;
    var col=0;
    var cl=0;
    var pe=0;
    var rp=0;
    var ot=0;
    var nd=0;
    var fr=0;
 

//Lectura JSON
$(document).ready(function(){
    $.getJSON("../javascript/registros.json", function(datos) {
        for( var i = 0; i < datos.length; i++ ) {
            //Asignacion a var provincia del valor del objeto en el parametro OBJ.provincia
            provincia=datos[i].Provincia;
            tipo=datos[i].Tipologia;
            genero=datos[i].Sexo;
            edad=datos[i].Edad;
            estadoc=datos[i].Estado_Civil;
            zona=datos[i].Zona;
            nacion=datos[i].Nacionalidad;

            //"Nacionalidad": "ECUADOR"
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
                p12+=1;
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
            if(tipo=="Homicidios"){
                homicidio+=1;
            }
            if(tipo=="Asesinatos"){
                asesinato+=1;
            } 
            if(tipo=="Femicidios"){
                feminicidios+=1;
            }
            if(genero=="MASCULINO"){
                masculino+=1;
            }
            if(genero=="FEMENINO"){
                femenino+=1;
            }
            if (edad<12) {
                nino+=1;
            }
            if (edad<18&&edad>12) {
                adolescente+=1
            }
            if (edad<35&&edad>18) {
                joven+=1
            }
            if (edad<55&&edad>35) {
                adulto+=1
            }       
            if (edad>55) {
                adulto_mayor+=1
            }      
            if (estadoc=="SOLTERO") {
                soltero+=1
            }
            if (estadoc=="CASADO") {
                casado+=1
            }
            if (estadoc=="DIVORCIADO") {
                divorciado+=1
            }       
            if (estadoc=="VIUDO") {
                viudo+=1
            }
            if (estadoc=="UNION LIBRE") {
                unionlibre+=1
            }           
            if (zona=="ZONA 1") {
                z1+=1;
            }  
            if (zona=="ZONA 2") {
                z2+=1;
            }  
            if (zona=="ZONA 3") {
                z3+=1;
            }  
            if (zona=="ZONA 4") {
                z4+=1;
            } 
            if (zona=="ZONA 5") {
                z5+=1;
            }  
            if (zona=="ZONA 6") {
                z6+=1;
            }  
            if (zona=="ZONA 7") {
                z7+=1;
            }  
            if (zona=="ZONA 8") {
                z8+=1;
            }  
            if (zona=="ZONA 9") {
                z9+=1;
            }    
            if (nacion=="ECUADOR") {
                ec+=1;
            }
            if (nacion=="COLOMBIA") {
                col+=1;
            }  
            if (nacion=="CHILE") {
                cl+=1;
            }
            if (nacion=="PERU") {
                pe+=1;
            }   
            if (nacion=="REPUBLICA DOMINICANA") {
                rp+=1;
            }   
            if (nacion=="OTROS") {
                ot+=1;
            }     
            if (nacion=="NO DETERMINADO") {
                nd+=1;
            }   
            if (nacion=="FRANCIA") {
                fr+=1;
            }                                                                                                          
        }    


Highcharts.chart('container2', {

    title: {
        text: 'Muertes violentas por provincia suscitados en el año 2014'
    },

    subtitle: {
        text: 'Fuente: Ministerio del Interior ECUADOR'
    },

    xAxis: {
        categories: ['PICHINCHA', 'GUAYAS', 'LOJA','AZUAY', 'CANAR', 'CARCHI'
        ,'IMBABURA', 'CHIMBORAZO', 'PASTAZA','ESMERALDAS', 'LOS RIOS', 'MANABI','EL ORO', 
        'SANTO DOMINGO', 'BOLIVAR','ZAMORA CHINCHIPE', 'MORONA SANTIAGO', 'NAPO','ORELLANA', 'SUCUMBIOS', 'GALAPAGOS'
        ,'SANTA ELENA', 'COTOPAXI', 'TUNGURAHUA']
    },

    series: [{
        type: 'column',
        colorByPoint: true,
        data: [p8,p15,p1,p2,p3,p11,p10,p4,p20,p12,p14,p13,p16,p9,p5,p16,p18,p19,p21,p22,p23,p24,p7,p6],
        showInLegend: false,
        name: 'Muertes violentas'
    }]

});



    // Build the chart
    Highcharts.chart('container1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Muertes violentas segun su tipo- Ecuador [2014]'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Nacional',
            colorByPoint: true,
            data: [{
                name: 'Homicidios',
                y: homicidio
            }, {
                name: 'Asesinatos',
                y: asesinato,
                sliced: true,
                selected: true
            }, {
                name: 'Feminicidios',
                y: feminicidios
           
            }]
        }]
    });
    Highcharts.chart('container5', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Muertes violentas por Genero- Ecuador [2014]'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Nacional',
            colorByPoint: true,
            data: [{
                name: 'Masculino',
                y: masculino
            }, {
                name: 'Femenino',
                y: femenino,
                sliced: true,
                selected: true
            }]
        }]
    });  
    Highcharts.chart('container6', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Muertes violentas por Grupo- Ecuador [2014]'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Nacional',
            colorByPoint: true,
            data: [{
                name: 'Niños',
                y: nino
            }, {
                name: 'Adolescentes',
                y: adolescente,
                sliced: true,
                selected: true
            }, {
                name: 'Jovenes',
                y: joven,
                sliced: true,
                selected: true
            },
            {
                name: 'Adulto',
                y: adulto,
                sliced: true,
                selected: true
            }, {
                name: 'Adulto Mayor',
                y: adulto_mayor,
                sliced: true,
                selected: true
            }]
        }]
    });    

    Highcharts.chart('container7', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Muertes violentas segun el Estado Civil- Ecuador [2014]'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Nacional',
            colorByPoint: true,
            data: [{
                name: 'SOLTERO',
                y: soltero
            }, {
                name: 'CASADO',
                y: casado,
                sliced: true,
                selected: true
            }, {
                name: 'DIVORCIADO',
                y: divorciado,
                sliced: true,
                selected: true
            },
            {
                name: 'VIUDO',
                y: viudo,
                sliced: true,
                selected: true
            }, {
                name: 'UNION LIBRE',
                y: unionlibre,
                sliced: true,
                selected: true
            }]
        }]
    });      
Highcharts.chart('container8', {

    title: {
        text: 'Muertes violentas por ZONA administrativa suscitados en el año 2014'
    },

    subtitle: {
        text: 'Fuente: Ministerio del Interior ECUADOR'
    },

    xAxis: {
        categories: ['ZONA 1', 'ZONA 2', 'ZONA3', 'ZONA 4', 'ZONA 5','ZONA 6', 'ZONA 7', 'ZONA 8', 'ZONA 9']
    },

    series: [{
        type: 'column',
        colorByPoint: true,
        data: [z1,z2,z3,z4,z5,z6,z7,z8,z9],
        showInLegend: false,
        name: 'Muertes violentas'
    }]

});  
    Highcharts.chart('container9', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Muertes violentas por Nacionalidad- Ecuador [2014]'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Nacional',
            colorByPoint: true,
            data: [{
                name: 'ECUATORIANO',
                y: ec
            }, {
                name: 'COLOMBIANO',
                y: col,
                sliced: true,
                selected: true
            }, {
                name: 'CHILENO',
                y: cl,
                sliced: true,
                selected: true
            },
            {
                name: 'PERUANO ',
                y: pe,
                sliced: true,
                selected: true
            }, {
                name: 'DOMINICANO',
                y: rp,
                sliced: true,
                selected: true
            }, {
                name: 'FRANCES',
                y: fr,
                sliced: true,
                selected: true
            }, {
                name: 'NO DETERMINADO',
                y: nd,
                sliced: true,
                selected: true
            }, {
                name: 'OTROS',
                y: ot,
                sliced: true,
                selected: true
            }]
        }]
    });            
  });
});









  

