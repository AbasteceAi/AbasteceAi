# Abastece aí



## Integrantes

- Bruna Siebert Machado
- Ester de Souza Viana
- Giulia Marcos Corrêa
- Halicya Gabrielly França Recalde
- Laura Luciano Werner
- Tiago Martins Perin

## Entidades, endpoints e relacionamentos

| Entidade | Endpoints | Relacionamentos |
|---|---|---|
| `users` | `GET /users?email=&password=` (login)<br>`GET /users?email=` (verifica e-mail repetido)<br>`POST /users` (cadastro)<br>`DELETE /users/:id` (desfaz cadastro que falhou) | 1:1 com `perfil` (mesmo `id`)<br>1:N com `avaliacoes`, `avaliacoes_votos` e `favoritos` (`user_id`) |
| `perfil` | `GET /perfil` (pesquisa)<br>`GET /perfil/:id`<br>`POST /perfil`<br>`PATCH /perfil/:id` (nome e foto) | 1:1 com `users` (`id`)<br>Autor das avaliações exibidas no posto |
| `postos` | `GET /postos`<br>`GET /postos/:id` | 1:N com `precos`, `servicos`, `avaliacoes` e `favoritos` (`posto_id`) |
| `precos` | `GET /precos`<br>`GET /precos?posto_id=`<br>`PATCH /precos/:id` | N:1 com `postos` (`posto_id`) |
| `servicos` | `GET /servicos?posto_id=` | N:1 com `postos` (`posto_id`) |
| `avaliacoes` | `GET /avaliacoes?posto_id=`<br>`GET /avaliacoes?user_id=`<br>`GET /avaliacoes/:id`<br>`POST /avaliacoes`<br>`PUT /avaliacoes/:id`<br>`DELETE /avaliacoes/:id` | N:1 com `postos` (`posto_id`)<br>N:1 com `users` (`user_id`)<br>1:N com `avaliacoes_votos` (`avaliacao_id`) |
| `avaliacoes_votos` | `GET /avaliacoes_votos?avaliacao_id=`<br>`GET /avaliacoes_votos?avaliacao_id=&user_id=`<br>`POST /avaliacoes_votos`<br>`PATCH /avaliacoes_votos/:id`<br>`DELETE /avaliacoes_votos/:id` | N:1 com `avaliacoes` (`avaliacao_id`)<br>N:1 com `users` (`user_id`) |
| `favoritos` | `GET /favoritos?user_id=`<br>`GET /favoritos?user_id=&posto_id=`<br>`POST /favoritos`<br>`DELETE /favoritos/:id` | N:1 com `users` (`user_id`)<br>N:1 com `postos` (`posto_id`) |

As chaves estrangeiras (`posto_id`, `user_id`, `avaliacao_id`) guardam o `id` do registro relacionado. O JSON Server não valida nem apaga em cascata, então as junções e a ordem de exclusão são tratadas no código dos services.
## Customize configuration
- *Bruna - Perfil*
- *Ester - Servicos*
- *Giulia - Favoritos*
- *Halicya - Postos*
- *Laura - Precos*
- *Tiago - Avaliações*

## Iniciar a instalação das dependencias

```sh
npm install
```

### Ver como o desenvolvimento está ocorrendo

```sh
npm run dev
```

### Iniciar o json-server

```sh
npx json-server db.json
```


