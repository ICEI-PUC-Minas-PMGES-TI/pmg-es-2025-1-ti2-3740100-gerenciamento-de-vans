### 3.3.2 Processo 2 – Gestão de avaliações

O sistema de avaliação utilizado irá permite que passageiros avaliem suas experiências após cada viagem. As notas variam de 1 a 5 estrelas, e as avaliações são uma forma de feedback para garantir qualidade no serviço.

![Gestao de avaliacoes](images/avaliacao.png")


#### Detalhamento das atividades

Quando o motorista der o check-out de que o passageiro foi entregue no endereço cadastrado na rota, o passageiro recebe uma notificação pedindo para avaliar a corrida naquele dia, ele tem a possibilidade de não avaliar, como tem a possibilidade de avaliar colocando estrelas entre 0 e 5. Essas avaliações serão salvas dentro do banco de dados como histórico de corridas.


_Os tipos de dados a serem utilizados são:_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_


**Nome da atividade 1**

| **Campo**             | **Tipo**           | **Restrições**         | **Valor default** |
| ---                   | ---                | ---                    | ---               |
| estrelas de avaliação | seleção múltipla   | formato de seleção     |  default          |



| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| confirmar            | Fim do Processo 2              | default           |
| editar               | Início do proceso de editar    |                   |
| excluir              | Início do proceso de deletar   |                   |

