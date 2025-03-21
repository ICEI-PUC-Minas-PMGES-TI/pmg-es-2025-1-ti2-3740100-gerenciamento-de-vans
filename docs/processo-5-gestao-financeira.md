### 3.3.5 Processo 5 – Gestão financeira.

A gestão financeira de vans com passageiros, focada em pagamentos via boletos bancários ou Pix, é responsável pelo controle e organização dos pagamentos realizados pelos passageiros, garantindo a 
regularidade dos recebimentos e a precisão nas transações financeiras. Essa atividade envolve o gerenciamento das formas de pagamento, a emissão de boletos, o monitoramento dos pagamentos realizados e a 
conciliação dos valores recebidos com os serviços prestados.

![gestao-financeira](images/financeira.png)


#### Detalhamento das atividades
Controla os pagamentos, garantindo que os valores sejam cobrados corretamente e que inadimplências sejam evitadas.  

### Atividades:  
- **Envio de notificação:** O sistema lembra o passageiro sobre a data do pagamento.  
- **Escolha da forma de pagamento:** O usuário decide entre Pix, boleto ou outro método.  
- **Confirmação do pagamento:** O sistema registra a transação e mantém o histórico financeiro atualizado.  
 
_Os tipos de dados a serem utilizados são:_

_* **Link** - campo que armazena uma URL_


**Pagamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| link            | texto            |                |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| pagamento            | Fim do Processo 6              | default           |

