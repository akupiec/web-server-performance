# Description

Quick and dirty comparison of the performance and resource consumption of various web frameworks under stress.

Last run stats can be checked here [results.md](pref/out/report.md)

# Features

- response times (min, max, avg)
- cpu & memory (min, max, avg)

# To Run

### Requirements
 - [docker](https://docs.docker.com/engine/install/)
 - [artillery](https://www.artillery.io/docs/get-started/get-artillery)

### Execution

project can be slightly configured by file:
- `pref/artillery_test.yaml` (read more about artillery)
- `pref/index.js` (determine what docker images are executed)

to run simply start node `node index.js` inside `pref` directory, results are available in `pref/out` directory,
and summary in `pref/out/${docker_image}.json`


# TODO

- nice html page with results
- more complex endpoints to tests
