
        // define config car
        // instantiate nodevis object
        // draw
        var viz;
        function draw() {
            var config = {
                container_id: "container",
                server_url: "bolt://18.207.142.251:34087",
                server_user: "neo4j",
                server_password: "trial-lumber-mirror",
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
            console.log(viz);
        }
