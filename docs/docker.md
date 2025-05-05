
# Docker

### Startup

> Start project on dev environment

```bash
cd devops
docker compose --env-file=../.env.dev --profile dev up
```

> Start project on prod environment

```bash
cd devops
docker compose --env-file=../.env --profile prod up
```

### Generating a docker image and uploading to github

[In this link](https://github.com/settings/tokens) I can create a token on GitHub to publish my image there.

I must mark the options:

- write:packages (for send the image)

- read:packages (for to consume image, if necessary)

- repo (if it is a private repo)

Generate a token and copy the generated value - I won`t see it again

To make login on GHCR

```bash
echo "<TOKEN>" | docker login ghcr.io -u <USERNAME> --password-stdin
# <USERNAME> usuário GitHub e <TOKEN> Token criado:
# "Login Succeeded" se bem sucedido
```

The next step is to build and markup the image

```bash
docker build --target prod -t ghcr.io/rodrigo1999/pokeapp:v1.0.0 .
docker build --target prod -t ghcr.io/rodrigo1999/pokeapp:latest .
```

Send the image:

```bash
docker push ghcr.io/rodrigo1999/pokeapp:v1.0.0
docker push ghcr.io/rodrigo1999/pokeapp:latest
```

> Commands resume

```bash
# 1. Login
echo "<TOKEN>" | docker login ghcr.io -u <USERNAME> --password-stdin

# 2. Build
docker build -t ghcr.io/<OWNER>/<IMAGE_NAME>:<TAG> .

# 3. Push
docker push ghcr.io/<OWNER>/<IMAGE_NAME>:<TAG>

```

The pokeapp image are here: [pokeapp image docker](https://github.com/users/Rodrigo1999/packages/container/package/pokeapp)