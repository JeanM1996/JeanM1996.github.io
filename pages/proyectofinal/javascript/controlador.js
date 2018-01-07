			
			
			$(document).ready(function() {
			    $('#example').DataTable( {
			        "ajax": "javascript/registros.txt",
			        "columns": [
			            { "data": "Tipologia" },
			            { "data": "Zona" },
			            { "data": "Provincia" },
			            { "data":"Canton"},
			            { "data": "Fecha" },
			            { "data":"Hora Infraccion"},
			            { "data": "Sexo" },
			            { "data":"Nacionalidad"},
			            { "data": "Edad" }
			        ]
			    } );
			} );

						/**
			$(document).ready(function() {
				$.getJSON("../javascript/registros.json",function(data){
					var delito='';
					$.each(data,function(id,value){
						delito+='<tr>';
						delito+='<td>'+value.Tipologia+'</td>';
						delito+='<td>'+value.Zona+'</td>';
						delito+='<td>'+value.Provincia+'</td>';
						delito+='<td>'+value.Canton+'</td>';
						delito+='<td>'+value.Fecha+'</td>';
						delito+='<td>'+value.Hora+'</td>';
						delito+='<td>'+value.Sexo+'</td>';		
						delito+='<td>'+value.Genero+'</td>';	
						delito+='<td>'+value.Nacionalidad+'</td>';	
						delito+='</tr>';		
					});
					$('#example').append(delito);
				});
			});
			*/