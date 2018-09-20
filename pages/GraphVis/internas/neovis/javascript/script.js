
        // define config car
        // instantiate nodevis object
        // draw
        var viz;
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
                initial_cypher: "MATCH (n)-[r]->(m) RETURN n,r,m"
            };
            viz = new NeoVis.default(config);
            viz.render();
            alert("Espere un momento.Se esta generando el Knowledge Graph")
            console.log(viz);
        }
