# What is Kubernetes?
# Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It provides a framework to run distributed systems resiliently, with features like load balancing, self-healing, and automated rollouts and rollbacks.
# Kubernetes is designed to manage clusters of hosts running Linux containers, and it works with a variety of container tools, including Docker. It abstracts away the underlying infrastructure, allowing developers to focus on building applications rather than managing the underlying hardware.

# Improtant terms:
# Kubernetes cluster - A set of nodes (physical or virtual machines) that run containerized applications. The cluster consists of a master node and worker nodes.
# Node - A single machine (physical or virtual) in the Kubernetes cluster that runs containerized applications. Each node can run multiple pods.
# Pod - The smallest deployable unit in Kubernetes, which can contain one or more containers. Pods share the same network namespace and can communicate with each other using localhost.
# Deployment - monitors a set of identical pods and make sure they are running and restart if they crash 
# Service - An abstraction that defines a logical set of pods and a policy to access them. Services enable communication between different parts of an application.

# Notes on config files:
- Tell kubernetes about different deployments pods and services referred to as objects that we want to create written in yaml files
- always store these files with our project source code they are documentation of our application
- we can create objects without config files DONT DO THIS 

# Deployments:
# - A deployment is a Kubernetes object that manages a set of identical pods. It ensures that the desired number of replicas of a pod are running at all times. If a pod crashes or is deleted, the deployment controller will automatically create a new pod to replace it. It also handles rolling updates and rollbacks, allowing you to update the application without downtime.
# - Deployments are defined in YAML files, which specify the desired state of the deployment, including the number of replicas, the container image to use, and any environment variables or configuration settings.
# Preferred method of updating a deployment is to 
    - make sure the image tag is either blank or specified to latest in the config file
    - make your update to the code 
    - build the image 
    - push the image to docker hub with the command docker push <docker-hub-username>/<image-name>
    - run the command
```
kubectl rollout restart deployment <deployment-name>
```
# Services:
# - A service is a Kubernetes object that defines a logical set of pods and a policy to access them. It provides a stable endpoint for accessing the pods, regardless of their IP addresses or locations in the cluster. Services enable communication between different parts of an application, such as between the frontend and backend.
# Types of services:
    - Cluster IP - Sets up an easy to remember url to access a pod only exposes pods in the cluster 
    - Node Port - makes a pod accessible from outside the cluster usually only for dev purposes 
    - Load Balancer - sets up a load balancer in front of the pods and exposes them to the outside world. This is the most common type of service used in production environments.
    - External name redirect an in cluster request to a CNAME url... dont worry about this one 

# Important note on ingress controller: Route methods dont matter so you cant have a get to /posts and a post to /posts it doesnt read the method only the path so each must be unique 

# NOTES ON DIFFERENCES IN VIDEOS VS REAL LIFE 
    - dockerfile for vite react apps is slightly diff. use node: 23-alpine and CMD ["npm", "run", "dev"] 
    - ingress-srv is different: 
    - you still need the following line for unique paths 
```
    nginx.ingress.kubernetes.io/use-regex: "true"
```
    - and each path is set up like so:
```
        - path: /posts/create
            pathType: Prefix
            backend:
              service:
                name: posts-clusterip-srv
                port:
                  number: 4000
```
    - in vite.config add the following to server:
```
allowedHosts: ['localhost', '127.0.0.1', 'posts.com']
```

# Create secret keys 
```
kubectl create secret generic name-of-secret --from-literal=SECRET_KEY=asf32ff3rfafefaew234af44234f
```

# Cross namespace service communication
- a namespace is like a sandbox for kubernetes objects to organize them 
```
kubectl get namespaces
```
- to get a list of namespaces
- to communicate between namespaces use the following format for the service name
```
http://<nameofservice>.<namespace>.svc.cluster.local
```
- to list namespaces in a service that isnt in the default namespace use the -n flag
```
kubectl get services -n <namespace>
```
- you can create an external name service to make it easier to access a service in another namespace 
