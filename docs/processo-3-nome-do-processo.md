### 3.3.3 Processo 3 – Gestão mural de avisos e/ou reclamações

Um mural de reclamações ou avisos será um espaço virtual onde informações importantes, como críticas, sugestões ou comunicados, são expostos. Ele serve como uma ferramenta de comunicação entre os usuários, permitindo que problemas sejam reportados e que avisos ou atualizações sejam compartilhados de forma visível e acessível.

![Gestao mural de avisos e reclamações](images/mural.png)


#### Detalhamento das atividades

Esse mural é um canal de comunicação direta para que usuários relatem problemas, façam sugestões ou acompanhem comunicados importantes.  

### Atividades:  
- **Envio de mensagem:** O usuário escreve e publica uma reclamação ou aviso.  
- **Interação com a mensagem:** Outros usuários podem adicionar respostas, editar ou excluir conteúdos.  
- **Registro da atualização:** As interações ficam armazenadas e disponíveis para consulta.  




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
