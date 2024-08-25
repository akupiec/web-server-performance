# Stress Test Report
  
  This file contain results of running artillery requires on all defined containers
# CPU

| Metric    | go-fiber        | go-gin          | node-fastify    | python-fastapi  |
|-----------|-----------------|-----------------|-----------------|-----------------|
| min       | 0%              | 0%              | 0%              | 0.2%            | 
| max       | 4.86%           | 6.38%           | 6.62%           | 11.82%          | 
| avg       | 2.76%           | 3.94%           | 3.88%           | 6.59%           | 
| p90       | 4.21%           | 5.52%           | 5.34%           | 10.79%          | 
| p99       | 4.82%           | 6.31%           | 6.58%           | 11.72%          | 
| p999      | 4.86%           | 6.38%           | 6.62%           | 11.82%          | 


# Memory usage

| Metric    | go-fiber        | go-gin          | node-fastify    | python-fastapi  |
|-----------|-----------------|-----------------|-----------------|-----------------|
| min       | 1.22MiB         | 1.32MiB         | 17.10MiB        | 44.05MiB        | 
| max       | 6.34MiB         | 8.25MiB         | 22.55MiB        | 46.39MiB        | 
| avg       | 3.94MiB         | 5.84MiB         | 19.85MiB        | 45.56MiB        | 
| p90       | 6.09MiB         | 8.21MiB         | 22.33MiB        | 46.28MiB        | 
| p99       | 6.33MiB         | 8.25MiB         | 22.53MiB        | 46.39MiB        | 
| p999      | 6.34MiB         | 8.25MiB         | 22.55MiB        | 46.39MiB        | 


# Response times

| Metric    | go-fiber        | go-gin          | node-fastify    | python-fastapi  |
|-----------|-----------------|-----------------|-----------------|-----------------|
| min       | 1               | 2               | 1               | 1               | 
| max       | 23              | 33              | 29              | 25              | 
| avg       | 5.4             | 6.3             | 4.3             | 6.5             | 
| p90       | 7.9             | 8.9             | 6               | 10.1            | 
| p99       | 13.1            | 16              | 10.1            | 13.9            | 
| p999      | 19.1            | 26.8            | 19.1            | 21.1            | 


Response times are provided in milliseconds (at least that I assume if you wanna be usre check artillery docs)