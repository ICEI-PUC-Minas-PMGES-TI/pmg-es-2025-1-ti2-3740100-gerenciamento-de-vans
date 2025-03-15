### 3.3.5 Processo 5 – Gestão de inclusão e exclusão do passageiro.

O passageiro todos os dias deve marcar ser vai ou não naquele dia, para que o sistema possa calcular a rota do motorista naquele dia.

![Gestao de inclusão e exclusão](images/contratos.png)


#### Detalhamento das atividades

O passageiro na tela inicial terá a opção de marcar se vai ou não naquele dia. Todas essas informações ficaram salvas dentro do banco de dados.



_Os tipos de dados a serem utilizados são:_

_* **Data** - campo do tipo data (dd-mm-aaaa)_
_* Seleção única - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_


**Inclusão e exclusão**

| **Campo**       | **Tipo**            | **Restrições**         | **Valor default** |
| ---             | ---                 | ---                    | ---               |
| seleção         | button              | seleção única          |                   |



| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| salva                | Fim do Processo 5              | default           |
