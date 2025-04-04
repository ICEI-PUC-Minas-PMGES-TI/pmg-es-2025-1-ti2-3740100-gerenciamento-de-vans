# Gerenciamento de Vans


**Natalie Santana Dias Abreu, natalie.abreu@pucminas.br**

**Maria Eduarda Paiva Ferraz, dudaferrazp@gmail.com**

**Gabriel dos Santos Silva Coelho, gabriel.coelho@pucminas.br**

**Paulo Victor Fernandes de Araujo Silva, paulovictor0907@gmail.com**

**Luiz Gustavo Silva Oliveira, luiz.Igso12@gmail.com**

**João Pedro de Oliveira Santos, http.jjooao@gmail.com**

---

Professores:

**Michelle Hanne Soares de Andrade**

**Joana Gabriela Ribeiro de Souza**

**Danilo de Quadros Maia Filho**

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

**Resumo**. O Van Wise é um sistema que propõe soluções para otimizar o transporte escolar, nosso objetivo é acabar com alguns problemas como desorganização financeira, ineficiência nas rotas e a falta de transparência. As justificativas se baseiam em relatos e notícia que mostram incidentes como criança esquecida ou caindo da Van. Nosso projeto atende as necessidades para pessoas como motoristas, pais, estudantes e gestores.

---


## 1. Introdução

O transporte escolar por vans é uma alternativa essencial para garantir o deslocamento seguro e eficiente de estudantes até as instituições de ensino. No entanto, a falta de um sistema estruturado para gerenciar esse serviço pode gerar diversos desafios, como desorganização nas rotas, dificuldades no controle financeiro, falhas na comunicação entre motoristas e responsáveis, além da ausência de monitoramento adequado.

Diante desses problemas, a digitalização do transporte escolar surge como uma solução promissora, oferecendo mais segurança, transparência e eficiência para todos os envolvidos. Este trabalho busca analisar os principais desafios do setor e propor uma solução tecnológica capaz de otimizar a gestão do transporte, garantindo um serviço mais organizado e seguro para os estudantes.

### 1.1 Contextualização

O transporte escolar por vans é uma solução essencial para a locomoção de estudantes, garantindo acesso seguro e eficiente às instituições de ensino. No entanto, a gestão desse serviço pode ser desorganizada, com dificuldades no controle de pagamentos, rotas e comunicação entre responsáveis, motoristas e alunos. A digitalização desse processo pode oferecer mais segurança, transparência e eficiência para todos os envolvidos.

### 1.2 Problema

A gestão do transporte escolar enfrenta diversos desafios que comprometem sua eficiência e segurança. A dificuldade no controle financeiro é um dos principais problemas, pois muitos motoristas e responsáveis encontram obstáculos para registrar e acompanhar pagamentos, o que pode resultar em inadimplência, cobranças incorretas e confusão sobre valores e prazos. Além disso, a desorganização nas rotas, causada pela falta de uma plataforma integrada, leva a percursos mais longos, atrasos constantes e dificuldades na adaptação de novas rotas em casos de imprevistos. A falta de transparência e comunicação também é um fator crítico, já que a troca de informações entre motoristas, responsáveis e alunos ocorre por meios descentralizados, como grupos de WhatsApp ou ligações, dificultando o repasse de informações essenciais sobre horários, atrasos ou mudanças no serviço. Por fim, a ausência de monitoramento e segurança gera preocupação entre os responsáveis, que muitas vezes não sabem exatamente quando seus filhos embarcaram ou desembarcaram da van, aumentando a insegurança em relação ao transporte escolar.

#### 1.3 Objetivo Geral

Desenvolver um aplicativo de gestão de transporte escolar por vans, proporcionando maior organização, eficiência e segurança na comunicação entre motoristas, responsáveis e alunos.

#### 1.3.1 Objetivos específicos

**A gestão financeira** permitirá um controle automatizado dos pagamentos, reduzindo erros e garantindo mais transparência nas cobranças. **A gestão das rotas** otimizará os trajetos, minimizando atrasos e ajustando percursos conforme necessário para tornar o transporte mais ágil. Para aprimorar a comunicação, o **mural de avisos e reclamações** servirá como um canal centralizado, facilitando o repasse de informações importantes entre motoristas, responsáveis e alunos. Além disso, a **gestão de avaliações** possibilitará que os responsáveis forneçam feedback sobre o serviço prestado, contribuindo para a melhoria contínua da qualidade do transporte.  

**A gestão de cadastros e logins** garantirá um acesso seguro e individualizado para motoristas, alunos e responsáveis, protegendo as informações do sistema. Já a **gestão de notificações** automatizará o envio de alertas sobre pagamentos, mudanças nas rotas e atrasos, mantendo todos informados em tempo real. A **digitalização e organização dos contratos** facilitarão o gerenciamento dos documentos firmados entre motoristas e responsáveis, tornando a gestão contratual mais eficiente. Por fim, a implementação de um **checklist diário** de exclusão ou inclusão do aluno na van garantirá um controle preciso da presença dos estudantes, proporcionando mais segurança e tranquilidade aos responsáveis. 

### 1.4 Justificativas

A recorrência de incidentes no transporte, como crianças esquecidas ou caindo de veículos, evidencia a necessidade de mais segurança e controle. Além disso, falhas na gestão financeira, na organização das rotas e na comunicação aumentam os riscos e a ineficiência do serviço. Diante desse cenário, torna-se essencial desenvolver um sistema que melhore o controle financeiro, otimize a definição de rotas, aprimore a comunicação entre os envolvidos e, principalmente, garanta mais segurança no transporte. Considerando que o transporte escolar por vans desempenha um papel fundamental na mobilidade dos estudantes, assegurando um deslocamento seguro e acessível até as instituições de ensino, a implementação de um sistema eficiente se mostra indispensável para a qualidade e a confiabilidade desse serviço.

## 2. Participantes do processo


O **proprietário de empresa de vans**, como Ricardo Santos, precisa gerenciar sua frota com eficiência, garantindo que os motoristas cumpram horários e rotas, controlando pagamentos e faturamento e oferecendo um serviço confiável para atrair mais clientes. O sistema permitirá que ele tenha uma visão geral das operações, facilitando a gestão financeira e o monitoramento das rotas em tempo real.

Para o **motorista autônomo de transporte escolar**, como Marcos Oliveira, a plataforma oferecerá ferramentas que otimizam seu trabalho diário. Ele poderá visualizar suas rotas com clareza, confirmar a presença dos alunos na van e se comunicar facilmente com os pais e o gestor da frota, garantindo um serviço mais seguro e organizado.

Os **responsáveis pelos alunos**, como Ana Carvalho, terão acesso a recursos que garantem a segurança de seus filhos durante o transporte. O sistema permitirá que eles confirmem, em tempo real, se a criança embarcou na van, acompanhem o trajeto pelo aplicativo e realizem pagamentos de forma simples e segura, trazendo mais tranquilidade para as famílias.

Já os **passageiros que utilizam o serviço**, como Pedro Henrique, um estudante universitário, contarão com funcionalidades que garantem mais previsibilidade e praticidade no dia a dia. Ele poderá saber o horário exato da chegada da van, se comunicar rapidamente com o motorista e confirmar sua presença ou ausência pelo sistema, tornando o transporte mais eficiente e organizado.

  

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

O transporte escolar por vans ainda é amplamente gerenciado por métodos tradicionais, com pouca ou nenhuma digitalização. Esse cenário resulta em diversos desafios operacionais, que afetam motoristas, responsáveis e estudantes. A seguir, apresentamos uma análise de como essas tarefas são atualmente executadas:

1. Controle Financeiro

Atualmente, o controle financeiro das mensalidades é realizado de forma manual. Muitos motoristas utilizam anotações em cadernos, planilhas simples ou até mesmo registros informais via mensagens. Isso pode gerar diversos problemas, como inadimplência, esquecimentos de pagamentos, erros no cálculo de valores e dificuldade em rastrear quem já efetuou ou não o pagamento. Além disso, cobranças são feitas frequentemente via dinheiro em espécie ou transferência bancária sem integração a um sistema de gestão.

Responsável pelo Processo: Motorista e gestor da frota.

2. Definição e Organização de Rotas

A definição das rotas é feita sem ferramentas que auxiliem na otimização do percurso. Motoristas costumam planejar o trajeto manualmente, sem considerar fatores como trânsito em tempo real, melhor sequência de paradas e ajustes em caso de imprevistos. Em alguns casos, pais ou responsáveis precisam informar mudanças de horário diretamente ao motorista, o que pode gerar falhas de comunicação e atrasos.

Responsável pelo Processo: Motorista e gestor da frota.

3. Comunicação entre Motoristas, Responsáveis e Estudantes

A comunicação ocorre de maneira descentralizada, geralmente por meio de grupos de WhatsApp, mensagens de texto ou ligações telefônicas. Isso dificulta o acompanhamento das informações, pois mensagens podem ser perdidas ou não respondidas a tempo. Além disso, não há um canal oficial para registrar reclamações, sugestões ou atualizações sobre o serviço, tornando o processo confuso e ineficaz.

Responsável pelo Processo: Motorista, responsável pelo aluno e gestor da frota.

4. Monitoramento e Segurança

O acompanhamento da localização dos alunos durante o transporte é uma grande preocupação. Muitos responsáveis não sabem exatamente quando seus filhos embarcaram ou desembarcaram da van, pois o processo de verificação ocorre apenas por comunicação direta com o motorista. Casos de crianças esquecidas ou deixadas no local errado ocorrem devido à falta de um sistema automatizado de registro e conferência.

Responsável pelo Processo: Motorista e responsável pelo aluno.

5. Experiência do Usuário

Para os alunos e responsáveis, a falta de um sistema estruturado traz insegurança e inconvenientes. Não há uma previsão exata da chegada da van, tornando difícil o planejamento do tempo. Estudantes também não possuem um canal direto para relatar atrasos ou problemas com o transporte, o que pode afetar sua rotina acadêmica e pessoal.

Responsável pelo Processo: Aluno e responsável pelo aluno.


### 3.2. Descrição geral da proposta de solução

### Van Wise: Tornando o Transporte Escolar Mais Eficiente e Seguro

O transporte escolar pode ser um verdadeiro desafio, tanto para motoristas quanto para responsáveis e estudantes. Pensando nisso, o **Van Wise** nasceu com a proposta de transformar essa experiência, trazendo mais organização, eficiência e transparência para o dia a dia. Nosso aplicativo conecta motoristas, responsáveis e alunos em um só lugar, facilitando a comunicação, otimizando rotas e garantindo mais segurança e controle sobre cada viagem.  

### Desafios a Serem Superados

Apesar de todos os benefícios, sabemos que a transição para um sistema digital pode apresentar alguns desafios:  

- *Adaptação à tecnologia* – Nem todos os motoristas e responsáveis estão acostumados com o uso de aplicativos, podendo preferir os métodos tradicionais.  
- *Conectividade e acessibilidade* – Algumas funcionalidades exigem conexão com a internet, o que pode ser um problema em áreas com sinal instável.  
- *Mudança gradual* – Implementar um novo modelo exige tempo, treinamentos e ajustes para que todos se sintam confortáveis com a nova forma de operar.  

### Como o Van Wise se Alinha com os Objetivos do Transporte Escolar

Nosso propósito é tornar o transporte escolar mais ágil, confiável e seguro. Por isso, o Van Wise se apoia em pilares essenciais:  

- *Eficiência operacional* – Reduzimos o tempo gasto com processos manuais, como cobranças e definição de rotas, permitindo que os motoristas foquem no que realmente importa: transportar os alunos com qualidade e segurança.  
- *Mais segurança e tranquilidade para os responsáveis* – Com o monitoramento em tempo real e a confirmação de embarque/desembarque, os pais podem acompanhar o trajeto dos filhos e ter mais confiança no serviço.  
- *Valorização dos motoristas* – O sistema de avaliações cria um ambiente de credibilidade, incentivando um serviço de qualidade e tornando o transporte escolar mais competitivo.  
- *Sustentabilidade financeira* – Automatizar o controle financeiro reduz a inadimplência e melhora o fluxo de caixa, garantindo mais previsibilidade e estabilidade para os motoristas.  

### Oportunidades para Melhorar Ainda Mais

Estamos sempre buscando formas de aprimorar a experiência do Van Wise. Algumas melhorias que podem ser implementadas incluem:  

- *Mais opções de pagamento* – Além de PIX, incluir cartão de crédito e boletos automáticos, tornando os pagamentos mais fáceis e reduzindo o risco de atrasos.  
- *Rotas mais inteligentes* – Utilizar inteligência artificial para definir os melhores trajetos em tempo real, evitando atrasos e tornando o transporte mais eficiente.  
- *Incentivos para boas práticas* – Criar um sistema de recompensas para motoristas e usuários com bom histórico, tornando o serviço ainda mais confiável e agradável.  
- *Funcionalidade offline para informações essenciais* – Permitir que motoristas acessem rotas planejadas, horários e registros de embarque/desembarque mesmo sem internet, garantindo o funcionamento do sistema em qualquer situação.  


### 3.3. Modelagem dos processos

[PROCESSO 1 - Gestão de cadastro](processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Gestão de avaliações](processo-2-nome-do-processo.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Gestão do mural de avisos](processo-3-nome-do-processo.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Gestão de contratos](processo-4-nome-do-processo.md "Detalhamento do Processo 4.")

[PROCESSO 5 - Gestão Financeira](processo-5-gestao-financeira.md "Detalhamento do Processo 5.")

[PROCESSO 6 - Gestão de rota](processo-6-nome-do-processo.md "Detalhamento do Processo 6.")


## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")

### 4.1. Modelo de Dados




### 4.2. Tecnologias


**1. Introdução**

Este relatório descreve as tecnologias e ferramentas adotadas pela equipe para o desenvolvimento do projeto, com foco em front end, back end, banco de dados, modelagem de dados e processos, além de controle de versão e gerenciamento de tarefas.

**2. Tecnologias de Front End**

A equipe utilizará **HTML, CSS e JavaScript, além de React, TypeScript, Tailwind CSS e a biblioteca Shadcn**. Essas tecnologias permitirão a criação de interfaces dinâmicas, responsivas e de fácil manutenção.

**3. Tecnologia de Back End**

No back end, será utilizado **Spring Boot com Java**, proporcionando uma plataforma robusta para o desenvolvimento de APIs e aplicações escaláveis.

**4. Ferramentas de Desenvolvimento**

**VS Code** será o editor de código, oferecendo um ambiente ágil e personalizável.
**GitHub** será usado para o controle de versão e para o gerenciamento de tarefas, aproveitando os quadros Kanban para organização do progresso do projeto.

**5. Banco de Dados**

O banco de dados adotado será o **MySQL**, garantindo uma solução confiável e eficiente para armazenamento de dados.


**6. Ferramentas de Modelagem**

**Miro** será utilizado para a criação de wireframes e protótipos colaborativos.
**Draw.io** será empregado na modelagem de dados e diagramas de arquitetura.
**Heflo** será utilizado para a modelagem de processos de negócios, permitindo a construção de diagramas de fluxo.




## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão 

O transporte escolar por vans é essencial para a mobilidade dos estudantes, mas enfrenta desafios como falhas no controle financeiro, desorganização de rotas, comunicação ineficiente e falta de monitoramento. A digitalização desse processo pode oferecer mais segurança, transparência e eficiência para todos os envolvidos.  

A recorrência de incidentes reforça a necessidade de um sistema estruturado que otimize a gestão e fortaleça a segurança. Futuras pesquisas podem explorar tecnologias como inteligência artificial e IoT para aprimorar o monitoramento e a organização do serviço, garantindo um transporte mais seguro e eficiente para os estudantes.

# REFERÊNCIAS


**[1.1]** - BRASIL. Casa Civil. **Novo PAC: Transporte escolar**. Disponível em: https://www.gov.br/casacivil/pt-br/novopac/selecoes/eixos/educacao-ciencia-e-tecnologia/transporteescolar.

**[1.2]** - FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO (FNDE). **Avaliação nacional do Programa Caminho da Escola – Volume I**. Disponível em: https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/caminho-daescola/media/cecates/Avaliao_Nacional_do_Programa_Caminho_da_Escola__Volume_I.pdf.

**[1.3]** - G1. **Número de vans escolares cadastradas na prefeitura tem queda de 50% em Campinas**. 16 jan. 2024. Disponível em: https://g1.globo.com/sp/campinas-regiao/noticia/2024/01/16/numero-de-vans-escolares-cadastradasna-prefeitura-tem-queda-de-50percent-em-campinas.ghtml.

**[1.4]** - YOUTUBE. **Criança é esquecida dentro de van escolar por quatro horas**. Disponível em: https://www.youtube.com/watch?v=BD6Z903OCBo.

**[1.5]** - RECORD R7. SP: **Menina de 9 anos cai de van escolar em movimento**. Disponível em: https://record.r7.com/balanco-geral/video/sp-menina-de-9-anos-cai-de-van-escolar-em-movimento24062024/.

**[1.6]** - YOUTUBE. **Pais reclamam de vans escolares em Guaratinguetá**. Disponível em: https://www.youtube.com/watch?v=f_kfEKJr8dY.



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






