### 3.3.4 Processo 4 – Gestão de contratos

A gestão de contratos entre um motorista de van e o passageiro envolve a organização e o controle das condições acordadas entre as duas partes. Isso pode incluir o valor da viagem, horários, destinos, regras de segurança e outros detalhes importantes. O objetivo da gestão é garantir que ambas as partes cumpram o que foi combinado, proporcionando uma experiência segura e eficiente para o passageiro e um serviço adequado por parte do motorista. A gestão do contrato pode envolver a negociação de termos, a formalização de acordos e o acompanhamento do cumprimento das condições acordadas.


![gestao-contratos](images/Gestão de contratos.")

#### Detalhamento das atividades

O passageiro que deseja ir na van, após uma negóciação deve enviar um pedido pelo contrato que é enviado de forma automática pelo sistema, após a assinatura o contrato entra no nosso banco de dados e o passageiro está registrado dentro da van desejada. 

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_

_* **Imagem** - campo contendo uma imagem_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_

**Nome da atividade 1**

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

