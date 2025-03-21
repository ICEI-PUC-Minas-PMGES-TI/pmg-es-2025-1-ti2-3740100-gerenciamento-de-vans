### 3.3.6 Processo 6 – Gestão de notificações

Usada para adminitrar as notificações recebidas, o usuário terá a opção de ver depois e responder depois também, mas também poderá ver e responder na mesma hora que for enviada. 

![notificacao](images/notificacao.png)


#### Detalhamento das atividades

Administra alertas importantes para usuários do sistema, facilitando a comunicação rápida entre passageiros, motoristas e gestores.  

### Atividades:  
- **Disparo da notificação:** O sistema envia alertas sobre pagamentos, avaliações, mudanças de rota, entre outros.  
- **Abertura e visualização:** O usuário acessa a notificação e decide se responde imediatamente ou depois.  
- **Gerenciamento da notificação:** O usuário pode arquivar, apagar ou manter a notificação visível.
- 
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


