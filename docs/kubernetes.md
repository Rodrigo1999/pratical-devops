# Kubernetes

Para começar a usar o Kubernetes, você precisa ter o `kubectl` instalado e configurado. O `kubectl` é a ferramenta de linha de comando para interagir com o Kubernetes.

E também o k3d, que é uma ferramenta para criar clusters Kubernetes locais usando Docker. Ele é leve.

### k3d

O comando mais básico do k3d é este:

```bash
k3d cluster create mycluster
```

Irá criar um cluster de um nó só chamado `mycluster`.

Para nosso projeto iremos criar com

```bash
k3d cluster create praticaldevops --servers 1 --agents 3 -p "8080:30000@loadbalancer"
```

Dessa forma estou criando um cluster com 1 control plane e 3 workers nodes, e expondo a porta 8080 do load balancer para a porta 30000 do cluster. 
Essa exposição será útil pra integração com o `nginx ingress controller`, quando isso acontecer, ao invés de fornecer 8080 como porta eu forneço a porta 80.