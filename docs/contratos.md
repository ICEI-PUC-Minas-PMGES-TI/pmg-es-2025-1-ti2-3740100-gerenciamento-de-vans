### 3.3.4 Processo 4 – Gestão de contratos

Os contratos de vans são importantes para garantir segurança, transparência e organização no transporte. Eles estabelecem direitos e deveres dos motoristas e passageiros, definindo valores, rotas, horários e responsabilidades. Além disso, ajudam a evitar problemas como cancelamentos inesperados, cobranças indevidas e falta de compromisso, trazendo mais confiança para ambas as partes.  

Na WiseVan fazer o contrato entre responsável e motorista é fácil e objetivo. O responsável consegue assinar pela própria plataforma ou cancelar a solicitação feita, além de conseguir ler todo o contrato. Para o motorista, ele precisará apenas subir o arquivo de contrato e selecionar a pessoa que deseja. Quando for feito a assinatura perguntará dados que não estão salvos no cadastro, apenas para fins de segurança. O restantes dos dados serão retirados do cadastro feito pelo próprio usuário. 

![Gestao de contratos](images/bpmn-contratos.png)


#### Detalhamento das atividades

Na gestão de contratos, o cliente contrata aquela van, envia informações necessárias, o motorista realiza a criação do contrato e envia para o cliente, após receber, o cliente assina o contrato e confirma a sua assinatura e envia ao motorista novamente. O motorista ao receber o contrato confirma se está tudo correto, assim finalizando o processo.

### Atividades:  
- **Solicitação do contrato:** O passageiro solicita um contrato ao motorista.  
- **Criação do contrato:** O motorista cria o contrato.  
- **Decisão do Passageiro:** O passageiro decide se realmente confirma a assinatura do contratos.
  
_**Os tipos de dados a serem utilizados são:**_

_**Arquivo** - campo de upload de contrato em formato PDF_

* Caixa de texto - campo texto de uma linha

* Número - campo numérico

* Seleção única - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)



** Nova Contratação**

| **Campo**       | **Tipo**         | **Restrições**         | **Valor default** |
| ---             | ---              | ---                    | ---               |
| Nome            | Texto            |                        |                   |
| Email           | email            | ser um email valido  @ |                   |



**Comandos**
| **Comandos**         |  **Destino**                                    | **Tipo**          |
| ---                  | ---                                             | ---               |
| Adicionar contrato   | Cria e Salva o novo contrato                    | Ação              |
| Fechar               | Fecha a tela de criar novo contrato             | Ação              |


#### **Tela para cadastrar novo contrato**
![Mural](images/tela-cadastrar-novo-contrato.jpg)


#### **Tela para vizualizar um contrato**
![Mural](images/tela-visualizacao-contratos.jpg)

