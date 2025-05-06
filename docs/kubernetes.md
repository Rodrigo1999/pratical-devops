# Kubernetes


To begin to use the kubernetes, you need to have `kubectl` installed and configured. The `kubectl`is the tools command line to interact with the kubernetes.

And also the k3d, wich is a tool to create a local kubernetes cluster using Docker. It is lightweight.

### k3d

The most basic command of k3d is this:

```bash
k3d cluster create mycluster
```

Its will create a single node cluster called `mycluster`.

To our project we will create with:

```bash
k3d cluster create praticaldevops --servers 1 --agents 3 -p "8080:30000@loadbalancer"
```

This way i am creating a cluster with 1 control plane and 3 workers nodes, and exposing the port 8080 of the load balancer to port 30000 of the cluster.
That exposure will be useful for integration with the `nginx ingress controller`, when that happens, instead of providing 8080 as the port i provide port 80.

### Kubectl

When installing kubectl, i can then use the command `kubectl` to interact with the cluster.

The first element of kubectl that we will see is the replicaset, which is a replication controller. It ensure that a specific number of replicas of a pod are running at any time.

```bash
kubectl create -f cluster.yaml
```

### Practice:

#### Pod
The most basic mean of starting a container with kubectl is creating a pod object. A pod is the smallest unit of execution in kubernetes and can contain one or more containers.

```bash
kubectl apply -f devops/pod.yaml
# To delete -> kubectl delete -f devops/pod.yaml
```

```bash
kubectl port-forward pod/pokeapp 5000:5000
```

#### Replicaset
The replicaset is a controller that ensures that a specific number of replicas of a pod are running at any time.

Furthermore, it also serves for pod persistence, if one dies, it automatically instanciates another.

```bash
kubectl apply -f devops/replicaset.yaml
# To this example i will apply some envs to see in action
```

#### Deployment
This object is an abstraction of higher level that manages the lifecycle of pods. It provides a declarative way to update pods and their replicasets.

He is useful when i change my image, it will update the pods automatically, it will do this progressively, changing little by little without knocking everything down at once and then replacing it, ensuring the availability of the service. 

```bash
kubectl get pod -o wide
# To see the pods dying and being born for the new version of the app
```