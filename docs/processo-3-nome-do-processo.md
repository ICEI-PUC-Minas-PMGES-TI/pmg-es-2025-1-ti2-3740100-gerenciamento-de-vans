### 3.3.3 Processo 3 – Gestão mural de avisos e/ou reclamações

Um mural de reclamações ou avisos será um espaço virtual onde informações importantes, como críticas, sugestões ou comunicados, são expostos. Ele serve como uma ferramenta de comunicação entre os usuários, permitindo que problemas sejam reportados e que avisos ou atualizações sejam compartilhados de forma visível e acessível.

![Gestao mural de avisos e reclamações](images/mural.png)


#### Detalhamento das atividades

O mural tem como principal objetivo uma comunicação simples e objetiva entre os usuários, eles serão avisados atrás de uma notificação quando for enviado uma nova informação no mural.



_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_



**Mural**

| **Campo**       | **Tipo**         | **Restrições**         | **Valor default** |
| ---             | ---              | ---                    | ---               |
| aviso           | Caixa de Texto   | formato de mensagem    |                   |



| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| adicionar            | Fim do Processo 3              | default           |
| editar               | Início do proceso de editar    |                   |
| excluir              | Início do proceso de excluir   |                   |
