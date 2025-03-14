### 3.3.1 Processo 1 – GESTÃO DE CADASTRO E LOGIN

A gestão de cadastro e login é essencial para controlar o acesso ao sistema de gerenciamento de vans. No cadastro, o usuário cria uma conta com dados como nome, e-mail, telefone, cpf e uma senha de acesso. No login, ele usa essas informações para acessar o sistema de forma segura. 

![PROCESSO DE GESTÃO DE CADASTRO/LOGIN](images/process.png "Modelo BPMN do Processo 1.")

#### Detalhamento das atividades

As pessoas que iram usar está aplicação (motorista, responsável, dono de rede de vans) terão que realizar o cadastro inicial, após o primeiro acesso será necessário entrar com o login para acessar ao site. Esse processo garante que apenas usuários autorizados possam usar o sistema, protegendo as informações e recursos importantes. Além de ajudar a idendificar quem está usando e levá-lo para a tela inicial correta. 

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Link** - campo que armazena uma URL_


**Cadastro e login de usuários**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
| ***Exemplo:***  |                  |                |                   |
| login           | Caixa de Texto   | formato de e-mail |                |
| senha           | Caixa de Texto   | mínimo de 8 caracteres |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel  ) |
| ***Exemplo:***       |                                |                   |
| entrar               | Fim do Processo 1              | default           |
| cadastrar            | Início do proceso de cadastro  |                   |


**Nome da atividade 2**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |
