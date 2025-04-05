# Common Commands:
### Run a container from an image
```
docker run <image-name> 
```
### alternatively, you can use override
```
docker run <image-name> echo hello world
```
### this overrides the default command in the image so all that will run is echo "hello world"

### List running containers
```
docker ps 
```
### List all containers that have ever been created
```
docker ps -all 
```

- When you run docker run your actually running docker create and then docker start. The run command is a shortcut for these two commands.
alternatively, you can use:
``` 
docker create <image-name> 
```
- and then:
```
docker start -a <container-id> 
```
- to run a container from an image (-a means attach to the container and show the output in the terminal, otherwise you wont see the output)
- you can start exited containers with:
```
docker start -a <container-id>
```
- use the command:
```
docker system prune  
```
- to remove all stopped containers, dangling images,and unused networks. This is a good way to clean up your system and free up space.
```
docker logs <container-id> 
```
- to see the logs of a container its not re running or re starting container 
- to stop a running container
```
docker stop <container-id>
```
- or
``` 
docker kill <container-id>
```
- to stop a running container
## Note: stopping a container will send a SIGTERM signal to the main process in the container, allowing it to clean up and exit gracefully. Killing a container will send a SIGKILL signal, which immediately terminates the process without allowing it to clean up. if stop doesnt work within 10 seconds it will send a kill signal to the container.

- to run a command or start another program like redis-cli in a running container maybe already running redis-server, for example.
```
docker exec -it <container-id>  
```
- -it means interactive terminal, so you can run commands in the container as if you were in a terminal. 
- to build an image from a Dockerfile, use the command:
```
docker build . -t <your-docker-id/repo-or-proj-name:version>. 
example: docker build . -t caden43/redis-image:latest .
```
- run the image with the command:
```
docker run dockerid/project-name
```
- docker commit allows you to create a new image from a container.
- You dont usually do this but it exists
```
docker commit -c 'command' <container-id>
```
