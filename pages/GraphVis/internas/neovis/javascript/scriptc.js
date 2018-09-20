
        // define config car
        // instantiate nodevis object
        // draw
        var viz;
        var cypherg="sn";
        function ShowSelected()
        {
            /* Para obtener el valor */
            var cod1 = document.getElementById("rel").value;
            var cypherg="MATCH (n)-[r:"+cod1+"]->(m) RETURN *";
            return cypherg;
        };
        function ShowSelected1()
        {
            /* Para obtener el valor 
MATCH (a)
RETURN [(a)-->(b) WHERE b.name = 'Bob' | b.age]
            */
            var cod2 = document.getElementById("per").value;
            var cypherg="MATCH (p) RETURN [(a)-->(b) WHERE b.name = "+"'"+cod2+"'";
            return cypherg;
        };
         function ShowSelected2()
        {
            /* Para obtener el valor */
            var cod3 = document.getElementById("ci").value;
            var cypherg="MATCH (p)-[r:NACIO_EN|MURIO_EN]->(m) WHERE m.name="+"'"+cod3+"'"+" RETURN DISTINCT *";
            return cypherg;
        };

        function draw() {
            var config = {
                container_id: "container",
                server_url: "bolt://hauck-garden-lavender-litzy.graphstory.me:7687",
                server_user: "hauck_garden_lavender_litzy",
                server_password: "TCmRb2UN7BUiqcwwlsR8HpgmPK9Z5",
                labels: {
                    //"Character": "name",
                    "Personaje": {
                        "Nombre": name,
                        //"sizeCypher": "MATCH (n) WHERE id(n) = {id} MATCH (n)-[r]-() RETURN sum(r.weight) AS c"
                    }
                },
                relationships: {
                    "NACIO_EN": {
                        "Pais": "Country",
                        "Ciudad": "Name"
                    }
                },
            };
            viz = new NeoVis.default(config);
            viz.render();
            console.log(viz);
        }
