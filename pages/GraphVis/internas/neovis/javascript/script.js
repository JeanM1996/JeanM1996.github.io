
        // define config car
        // instantiate nodevis object
        // draw
        var viz;
        function draw() {
            var config = {
                container_id: "container",
                server_url: "https://hobby-mmfdkjgcconogbkeoapidobl.dbs.graphenedb.com:24780",
                server_user: "popoto",
                server_password: "b.mJiOBto02zYg.Iz2EDqfjejjsBpY9",
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
