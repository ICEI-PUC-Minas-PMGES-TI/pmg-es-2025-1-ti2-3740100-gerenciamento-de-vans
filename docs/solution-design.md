## 4. Projeto da solução

### 4.1. Modelo de dados

O modelo relacional da WiseVan descreve a estrutura de dados utilizada para gerenciar o transporte de passageiros de maneira eficiente. Nesse modelo, as principais entidades podem incluir Vans, Motoristas, Passageiros, Rotas, Pagamentos e Controle de Presença. 

A entidade Vans armazena informações sobre os veículos, como placa, modelo e capacidade. A Motorista relaciona-se com a Van, identificando quem está responsável por cada viagem, enquanto os Passageiros estão associados a uma Rota específica e ao Controle de Presença. A Rota define os trajetos, horários e pontos de partida e chegada. Pagamentos registram os valores pagos pelos passageiros, com informações sobre data, método de pagamento (como PIX ou boleto) e status do pagamento. 

Esse modelo garante um gerenciamento organizado, com todas as informações interconectadas, facilitando a operação do sistema de transporte.

![Exemplo de um modelo relacional](images/modeloRelacional.png "Exemplo de Modelo Relacional.")
---

### 4.2. Tecnologias

Tecnologias: 
 - MySQL: Será usada para auxiliar na criação do Banco de dados em código. 
 - HTML + CSS + JS: Será feito todo o front-end da WiseVan. 
 - Java SpringBoot: Será usado para fazer todo o funcionamento do front-end. 
 - Github Pages: usado para gerenciar e armazenar os nosso projeto. 

IDE:
 - Apache netbeans: IDE usada para implentar o back-end. 

Bibliotecas/frameworks:
- Spring Boot Starter Web: será usado para criação de aplicações web, com suporte para RESTful APIs.
- Spring Boot Starter Thymeleaf: Para aplicações web que precisam de uma camada de template para renderizar HTML dinâmico. Thymeleaf é o motor de templates padrão para Spring Boot.
- Spring Boot Starter Security: Para adicionar autenticação e controle de acesso em sua aplicação, incluindo autenticação via login. 
- Spring Boot Starter Test:usado para testar, incluindo suporte para testes unitários e integração.
- Spring Boot Starter Mail: Para enviar e-mails a partir da sua aplicação, como confirmações de registro ou notificações.
- Spring Boot Starter Validation: Para validar dados, como entrada de formulários, usando anotações como @Valid e @NotNull.


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| SGBD           | MySQL           |
| Front end      | HTML+CSS+JS     |
| Back end       | Java SpringBoot |
| Deploy         | Github Pages    |
| IDE            | Apache netbeans |

