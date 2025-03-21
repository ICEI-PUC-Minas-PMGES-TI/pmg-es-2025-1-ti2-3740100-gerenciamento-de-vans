### 3.3.2 Processo 2 – Gestão de avaliações

O sistema de avaliação utilizado irá permite que passageiros avaliem suas experiências após cada viagem. As notas variam de 1 a 5 estrelas, e as avaliações são uma forma de feedback para garantir qualidade no serviço.

![Gestao de avaliacoes](images/avaliacao.png)


#### Detalhamento das atividades

O sistema permite que passageiros avaliem suas viagens, garantindo um feedback contínuo para melhorar o serviço. As notas variam de 1 a 5 estrelas.  

### Atividades:  
- **Recebimento de solicitação:** O passageiro recebe uma mensagem pedindo avaliação após o check-out da viagem.  
- **Escolha da ação:** O usuário pode confirmar, editar ou excluir sua avaliação.  
- **Registro no sistema:** O feedback é salvo e pode ser consultado pelos responsáveis pela gestão do transporte.  


_Os tipos de dados a serem utilizados são:_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_


**Avaliação**

| **Campo**             | **Tipo**           | **Restrições**         | **Valor default** |
| ---                   | ---                | ---                    | ---               |
| estrelas de avaliação | seleção múltipla   | formato de seleção     |  default          |



| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| confirmar            | Fim do Processo 2              | default           |
| editar               | Início do proceso de editar    |                   |
| excluir              | Início do proceso de deletar   |                   |

