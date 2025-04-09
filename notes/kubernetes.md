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
    - push the imagge to docker hub
    - run the command
```
kubectl rollout restart deployment <deployment-name>
```