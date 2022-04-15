
# Blogs API

### Introdução:

O projeto Blogs API é uma aplicação Back-End de um site em que o usuário consegue se logar e fazer posts.

Nele, eu pude desenvolver minhas habilidades com ferramentas como Express, Sequelize (ORM) e o JWT (criptografia de dados).


### Configurações:

Para utilizar o projeto, você deve se certificar de que está utilizando a versão 14 do Node e rodar o comando `npm install`

É importante setar as variáveis de ambiente no arquivo ".env". Nele você terá que dizer qual é o username e password do seu MySQL para que ele possa funcionar. Na variável HOSTNAME você coloca "localhost" e a SECRET é de sua preferência. Não se esqueça de renomear o arquivo de ".env.example" para apenas ".env"

Após configurar o arquivo .env, você deve rodar os comandos `npm run prestart`

Isso serve para criar o banco de dados e posteriormente criar as respectivas tabelas

Com o banco de dados criado, você pode popular ele com o comando `npm run seed` para não tenha que criar tudo do zero

Feito tudo isso, basta rodar o comando `npm start` para iniciar o servidor.

### Utilização:

O projeto conta com 4 rotas: `/user`, `/login`, `/categories`, `/post`

---

#### `/user`:

Primeiro você precisa se registrar através da rota `/user` com o método POST. Para isso você deve enviar um body com a seguinte estrutura:

![Create user body](https://github.com/RafaelMoura11/blogs-api/raw/main/public/cadastrodeusuario.png)


Atente-se as regras de autentificação:

- displayName: Obrigatório e deve possuir no mínimo 8 caracteres

- password: Obrigatório e deve possuir no mínimo 6 caracteres

- email: Obrigatório e deve ser um email válido

- image: Não é obrigatório



Se tudo ocorreu bem, você receberá um token JWT como response. Guarde ele pois todas as interações com o servidor precisarão desse token


Na rota `/user`, por exemplo, você só pode acessar o método GET se passar o token:

![Sending Token](https://github.com/RafaelMoura11/blogs-api/raw/main/public/listarusuarios.png)


É possível também pegar ou até mesmo deletar um post específico através do ID. Portanto, sinta-se a vontade para acessar o endpoint `/user/:id` com esses métodos

---

#### `/login`:

Caso você já tenha criado sua conta, mas esqueceu/perdeu o seu token, você pode se logar novamente através dessa rota com o método POST.

A estrutura do body para a rota `/login` é essa:

![Login body](https://github.com/RafaelMoura11/blogs-api/raw/main/public/logincomsucesso.png)

---

#### `/categories`:


Nessa rota, você pode criar uma nova categoria e também pegar todas as categorias

Para criar uma categoria, tudo que você precisa passar é o campo `name`:

![Creating Category](https://github.com/RafaelMoura11/blogs-api/raw/main/public/cadastrarCategoria.png)

---

#### `/posts`:


Por fim, a rota mais importante é a `/posts`, pois nela é possível fazer as quatro operações do CRUD

- Podemos criar um post:

![Creating Post](https://github.com/RafaelMoura11/blogs-api/raw/main/public/criarblogpost.png)


- Podemos ler todos os posts:

![Reading Post](https://github.com/RafaelMoura11/blogs-api/raw/main/public/listarumblogpost.png)

- Podemos deletar algum post:

![Deleting Post](https://github.com/RafaelMoura11/blogs-api/raw/main/public/deletarpostcomsucesso.png)

- Podemos atualizar algum post:

![Updating Post](https://github.com/RafaelMoura11/blogs-api/raw/main/public/editarpostcomsucesso.png)


Vale salientar que você só pode deletar ou atualizar posts que foram criados por você.
