# Stress Test Report
  
This file contain results of running artillery requires on all defined containers

# CPU

| Metric    | go-fiber        | go-gin          | node-fastify    | python-fastapi  |
|-----------|-----------------|-----------------|-----------------|-----------------|
| min       | 0%              | 0%              | 0%              | 0.2%            | 
| max       | 3.83%           | 5.81%           | 9.69%           | 12.25%          | 
| avg       | 2.27%           | 3.59%           | 6.32%           | 7.62%           | 
| p90       | 3.46%           | 5.04%           | 8.26%           | 10.56%          | 
| p99       | 3.81%           | 5.75%           | 9.58%           | 12.07%          | 
| p999      | 3.83%           | 5.81%           | 9.69%           | 12.25%          | 


# Memory usage

| Metric    | go-fiber        | go-gin          | node-fastify    | python-fastapi  |
|-----------|-----------------|-----------------|-----------------|-----------------|
| min       | 1.22MiB         | 1.35MiB         | 16.14MiB        | 44.06MiB        | 
| max       | 6.17MiB         | 8.22MiB         | 22.80MiB        | 46.35MiB        | 
| avg       | 3.90MiB         | 5.79MiB         | 19.80MiB        | 45.57MiB        | 
| p90       | 6.05MiB         | 8.19MiB         | 22.43MiB        | 46.24MiB        | 
| p99       | 6.17MiB         | 8.22MiB         | 22.80MiB        | 46.34MiB        | 
| p999      | 6.17MiB         | 8.22MiB         | 22.80MiB        | 46.35MiB        | 


# Response times

| Metric    | go-fiber        | go-gin          | node-fastify    | python-fastapi  |
|-----------|-----------------|-----------------|-----------------|-----------------|
| min       | 1               | 1               | 1               | 1               | 
| max       | 26              | 23              | 27              | 35              | 
| avg       | 4.6             | 5.7             | 6.1             | 7               | 
| p90       | 7               | 7.9             | 7.9             | 8.9             | 
| p99       | 10.1            | 10.9            | 13.1            | 16              | 
| p999      | 19.1            | 16              | 23.8            | 24.8            | 

Response times are provided in milliseconds (at least that I assume if you wanna be usre check artillery docs)