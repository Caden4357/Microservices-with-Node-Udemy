# Common Commands:
```
docker run <image-name> # Run a container from an image
alternatively, you can use override
docker run <image-name> echo "hello world" # this overrides the default command in the image so all that will run is echo "hello world"
docker ps # List running containers
docker ps -all # List all containers that have ever been created
```

- When you run docker run your actually running docker create and then docker start. The run command is a shortcut for these two commands.
alternatively, you docker create <image-name> and then docker start -a <container-id> to run a container from an image (-a means attach to the container and show the output in the terminal, otherwise you wont see the output)
- you can start exited containers with docker start -a <container-id>
- use the command docker system prune to remove all stopped containers, dangling images, and unused networks. This is a good way to clean up your system and free up space.
