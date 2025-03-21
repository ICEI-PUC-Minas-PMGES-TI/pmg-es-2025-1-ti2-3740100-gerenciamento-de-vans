### 3.3.4 Processo 4 – Gestão de contratos

A gestão de contratos entre um motorista de van e o passageiro envolve a organização e o controle das condições acordadas entre as duas partes. Isso pode incluir o valor da viagem, horários, destinos, regras de segurança e outros detalhes importantes. O objetivo da gestão é garantir que ambas as partes cumpram o que foi combinado, proporcionando uma experiência segura e eficiente para o passageiro e um serviço adequado por parte do motorista. A gestão do contrato pode envolver a negociação de termos, a formalização de acordos e o acompanhamento do cumprimento das condições acordadas.

![Gestao de contratos](images/contratos.png)


#### Detalhamento das atividades

Garante que os termos entre motoristas e passageiros sejam formalizados e cumpridos. Isso inclui valores, horários, regras de segurança e outros detalhes.  

### Atividades:  
- **Solicitação do contrato:** O passageiro solicita um contrato ao motorista.  
- **Criação do contrato:** O motorista gera um documento com as informações acordadas.  
- **Envio e assinatura:** O passageiro recebe, lê e assina o contrato.  
_Os tipos de dados a serem utilizados são:_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_


**Contratação**

| **Campo**       | **Tipo**         | **Restrições**         | **Valor default** |
| ---             | ---              | ---                    | ---               |
| arquivo         | arquivo          | formato de pdf         |                   |



| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| assinar              | Fim do Processo 4              | default           |
