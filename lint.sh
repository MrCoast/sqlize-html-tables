#!/bin/bash

if ! [[ $(docker ps -q --filter="name=sqlizehtmltables_webpack_1") ]]; then
    echo "docker isn't running, run docker-compose up"
    exit 1
fi

docker exec -it $(docker ps -q --filter="name=sqlizehtmltables_webpack_1") node_modules/grunt/bin/grunt lint
