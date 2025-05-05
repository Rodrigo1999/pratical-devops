# pratical-devops
## Repositório voltado para trabalho prático em devops.

O objetivo deste repositório é trabalhar de forma prática cada tópico do que considero envolver a cultura e soft skills do mundo devops.

O projeto terá branchs categorizadas pelos nomes de cada ferramenta aqui aprendida, as pastas serão separadas de acordo também.

## Sobre a aplicação

A aplicação será uma API REST, voltado para captura de pokemon.

## Funcionalidades da aplicação:

* Capturar pokemons, passando o id do pokemon que quero capturar e o cep que servirá como endereço de onde capturei esse pokemon.
* Liberar algum pokemon que eu já capturei.
* Evoluir um determinado pokemon, só posso fazer isso a cada 1 minutos.
* Opção de recapturar um pokemon que eu já tinha.

## Módulos da aplicação

* Pokeapp
    * Aqui será o módulo principal da minha aplicação, no qual terei as opções listadas a cima.
* Geolocation
    * Módulo voltado para o manuzeio das buscas de endereços, utilizarei a api cep dos correios, para buscar os endereços com base no cep.
* pokedex
    * Módulo voltado para busca de todos os pokemons catalogados, usarei uma [api no github](https://documenter.getpostman.com/view/10670805/SzS2xToN) que lista todos os pokemons.

## Fluxo de operações:

### Captura de pokemon:

Ao chamar o endpoint de captura de pokemon, passando o id e o cep do local onde ele foi capturado, seguirei a seguinte linha de operações:

* Verificar se já tenho o pokemon capturado.
* Chamarei o serviço do pokedex para buscar o dados do pokemon que capturei.
* Buscarei os dados de endereço com base em meu cep.
* Salvarei no banco de dados o pokemon, registrando assim que capturei.

Obs.: Ao capturar um pokemon, se o pokemon começar com a letra G, ele automaticamente será nível deus, se começar com a letra P, será considerado nível deus supremo.
        
### Liberar algum pokemon:

Ao chamar o endpoint de liberar pokemon, passando o id do pokemon que quero liberar, seguirei a seguinte linha de operações:

* Irei verificar se realmente tenho o pokemon
* Irei liberar apenas mudando o status dele no banco para liberado

### Evoluir um determinado pokemon:

Cada pokemon terá um score para controlar e designar seu nível de evolução, esse score vai de 0 a 200.
Só posso evoluir cada pokemon a cada 1 minutos, esse será meu intervalo, a mudança do score ocorrerá de 10 em 10 unidades a cada evolução.

> Regra de negócio:

* O pokemon que tiver um score menor ou igual 50, será considerado nível semi deus
* O pokemon que tiver um score maior que 50 e menor ou igual a 150, será considerado nível deus
* O pokemon que tiver um score maior que 150 e menor ou igual a 200, será considerado nível deus supremo


Obs.: Ao capturar um pokemon, se o pokemon começar com a letra G, ele automaticamente será nível deus, se começar com a letra P, será considerado nível deus supremo.

> Fluxo:

Ao chamar o endpoint de evoluir pokemon, passando o id do pokemon que quero evoluir, seguirei a seguinte linha de operações:

* Buscar pokemon pelo id
* Chamar método de evoluir
* Salvar alterações

### Opção de recapturar um pokemon que eu já tinha.

* Verificarei se esse pokemon existe no banco de dados, mesmo ele já estando excluído, se sim, considerarei uma recaptura.
* mudar status do pokemon para ativo novamente
* salvar ultimo endereço de recaptura na lista de endereços de captura daquele polemon seguindos os padrões do fluxo de "captura".


## Execução

Crie um banco de dados local com as especificações mencionadas no arquivo `.env`

### Execução em ambiente de desenvolvimento

```bash
# Para rodar as migration e criar as tabelas no banco de dados.
npm run dev:knex:migrate
# Para executar o projeto em modo de desenvolvimento.
npm run dev
```

### Execução em ambiente de produção

```bash
# Para rodar as migration e criar as tabelas no banco de dados.
npm run prod:knex:migrate
# Para executar o projeto em modo de produção.
npm run start
```

### Execução em ambiente de teste

```bash
# Para executar o projeto em modo de teste.
npm run test
```