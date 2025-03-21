### 3.3.6 Processo 6 – Gestão de notificações

Usada para adminitrar as notificações recebidas, o usuário terá a opção de ver depois e responder depois também, mas também poderá ver e responder na mesma hora que for enviada. 

![notificacao](images/notificacao.png)


#### Detalhamento das atividades

Controla os pagamentos, garantindo que os valores sejam cobrados corretamente e que inadimplências sejam evitadas.  

### Atividades:  
- **Envio de notificação:** O sistema lembra o passageiro sobre a data do pagamento.  
- **Escolha da forma de pagamento:** O usuário decide entre Pix, boleto ou outro método.  
- **Confirmação do pagamento:** O sistema registra a transação e mantém o histórico financeiro atualizado.  

_Os tipos de dados a serem utilizados são:_

_* **imagem** - imagem_


**Notificação**

| **Campo**       | **Tipo**         | **Restrições**             | **Valor default** |
| ---             | ---              | ---                        | ---               |
| imagem          | img              | formato de notificação     |                   |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| visualizar           | Fim do Processo 7              | default           |
| excluir              | Inicia o processo de deletar   |                   |


