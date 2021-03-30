#!/bin/bash

if ! [[ $(docker ps -q --filter="name=${PWD##*/}_webpack_1") ]]; then
    echo "docker isn't running, run docker-compose up"
    exit 1
fi

docker exec -it ${PWD##*/}_webpack_1 bash -c "cd /app && yarn lint"
