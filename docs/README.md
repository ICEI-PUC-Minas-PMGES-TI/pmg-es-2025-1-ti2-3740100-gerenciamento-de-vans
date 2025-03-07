# Gerenciamento de Vans


**Natalie Santana Dias Abreu, natalie.abreu@pucminas.br**

**Maria Eduarda Paiva Ferraz, dudaferrazp@gmail.com**

**Gabriel dos Santos Silva Coelho, gabriel.coelho@sga.pucminas.br**

**Paulo Victor Fernandes de Araujo Silva, paulovictor0907@gmail.com**

**Luiz Gustavo Silva Oliveira, luiz.Igso12@gmail.com**

**João Pedro de Oliveira Santos, jjooao@gmail.com**

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

O transporte escolar é fundamental para a locomoção segura dos estudantes, porém enfrenta desafios como a falta de otimização

### 1.1 Contextualização

O transporte escolar por vans é uma solução essencial para a locomoção de estudantes, garantindo acesso seguro e eficiente às instituições de ensino. No entanto, a gestão desse serviço pode ser desorganizada, com dificuldades no controle de pagamentos, rotas e comunicação entre responsáveis, motoristas e alunos. A digitalização desse processo pode oferecer mais segurança, transparência e eficiência para todos os envolvidos.

### 1.2 Problema

1-Dificuldade no Controle Financeiro – Muitos motoristas e responsáveis enfrentam problemas para registrar e acompanhar pagamentos, o que pode levar a inadimplência, cobranças incorretas e confusão sobre valores e prazos.

2-Desorganização nas Rotas – Sem uma plataforma integrada, a definição dos trajetos pode ser ineficiente, resultando em percursos mais longos, atrasos constantes e dificuldades na adaptação de novas rotas em casos de imprevistos.

3-Falta de Transparência e Comunicação – A comunicação entre motoristas, responsáveis e alunos ocorre por meios descentralizados, como grupos de WhatsApp ou ligações, dificultando o repasse de informações importantes sobre horários, atrasos ou mudanças no serviço.

4-Ausência de Monitoramento e Segurança – Os responsáveis muitas vezes não sabem exatamente quando seus filhos embarcaram ou desembarcaram da van, aumentando a preocupação com a segurança do transporte.

#### 1.3 Objetivo Geral

Desenvolver um aplicativo de gestão de transporte escolar por vans, proporcionando maior organização, eficiência e segurança na comunicação entre motoristas, responsáveis e alunos.

#### 1.3.1 Objetivos específicos

1-Criar um sistema para o controle de pagamentos, facilitando o acompanhamento de mensalidades e evitando inadimplência.

2-Incluir um sistema de avaliações para monitoramento da qualidade do serviço.

3-Implementar um gerenciamento eficiente de rotas, otimizando trajetos e garantindo pontualidade.

### 1.4 Justificativas

1-A recorrência de incidentes no transporte, como crianças esquecidas ou caindo de veículos, mostra a necessidade de mais segurança e controle. Falhas na gestão financeira, nas rotas e na comunicação aumentam os riscos e a ineficiência. Por isso, é essencial desenvolver um sistema que melhore o controle financeiro, organize rotas, aprimore a comunicação e garanta mais segurança no transporte.

2-O transporte escolar por vans desempenha um papel fundamental na mobilidade dos estudantes, proporcionando um deslocamento seguro e acessível até as instituições de ensino.

## 2. Participantes do processo

Nome: Ricardo Santos

Idade: 45 anos

Profissão: empresário do ramo de transporte escolar.

Objetivo: Gerenciar as vans garantindo eficiência,
segurança e rentabilidade.

Necessidades:

- Garantir que o motorista cumpra horários e rotas.
- Controlar pagamentos e faturamento.
- Manter um serviço confiável para atrair mais clientes.



Nome: Marcos Oliveira

Idade: 38 anos

Profissão: motorista autônomo de transporte escolar.

Objetivo: Transportar os alunos com segurança e garantir
o recebimento do serviço prestado.

Necessidades:

- Visualizar sua rota com clareza.
- Confirmar presença dos alunos da van.
- Canal de comunicação com os pais e gestor da frota.



Nome: Ana Carvalho

Idade: 39 anos

Profissão: Advogada

Objetivo: Garantir que seu filho chegue à escola e volte
para casa com segurança.

Necessidades:

- Confirmar se o filho está na van em tempo real.
- Acompanhar o trajeto da van pelo aplicativo.
- Realizar pagamentos de forma simples e segura.





Nome: Pedro Henrique

Idade: 19 anos

Profissão: Estudante universitário

Objetivo: Ter um transporte confiável para ir à faculdade
sem depender de transporte público.

Necessidades:

- Saber o horário exato da chegada da van.
- Ter um meio de comunicação rápido com o motorista.
- Confirmar a presença ou ausência pelo sistema

  

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

_Apresente uma descrição textual de como os sistemas atuais resolvem o problema que se propõe a resolver.  Caso sua proposta seja inovadora e não existam processos claramente definidos, **apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente**, mesmo que não se utilize tecnologia computacional._

### 3.2. Descrição geral da proposta de solução

O Van Wise é um sistema digital para otimização do transporte escolar por vans. Ele visa solucionar desafios comuns, como a desorganização financeira, ineficiência das rotas e falta de transparência na comunicação. A proposta envolve a criação de um aplicativo que conecte motoristas, responsáveis e estudantes, permitindo um gerenciamento mais eficiente das operações.

Limites da Proposta
Apesar das vantagens, o sistema enfrenta alguns desafios e limitações:

Adoção da tecnologia – Alguns motoristas e responsáveis podem resistir à digitalização, preferindo métodos tradicionais.
Conectividade e acessibilidade – O aplicativo exige acesso contínuo à internet para algumas funcionalidades, o que pode ser um obstáculo em áreas com sinal instável. (chek in)
Implementação gradual – A transição do modelo atual para o digital pode exigir treinamentos e ajustes no processo de uso.

Ligações com as Estratégias e Objetivos do Negócio
O Van Wise se alinha às seguintes estratégias e objetivos:

Eficiência operacional – O aplicativo reduz o tempo gasto em processos manuais, como cobranças e definição de rotas, permitindo que motoristas e gestores foquem na qualidade do serviço.
Segurança e confiabilidade – Funcionalidades como monitoramento em tempo real e confirmação de embarque/desembarque aumentam a confiança dos responsáveis.
Valorização do serviço – O sistema de avaliações melhora a percepção de qualidade, tornando o transporte escolar mais competitivo.
Sustentabilidade financeira – O controle financeiro automatizado reduz inadimplência e melhora o fluxo de caixa dos motoristas.
Oportunidades de Melhorias

Para fortalecer a nossa proposta, algumas melhorias podem ser implementadas:

Integração com meios de pagamento diversificados – Inclusão de PIX, cartão de crédito e boletos automáticos para facilitar pagamentos.
Sistema de inteligência artificial para otimização de rotas – Utilizar IA para sugerir os melhores trajetos em tempo real, reduzindo atrasos.
Gamificação e incentivos – Criar um sistema de recompensas para motoristas e usuários com bom histórico, incentivando boas práticas.
Suporte offline para funcionalidades essenciais – Permitir que informações básicas, como a rota planejada, fiquem disponíveis mesmo sem internet.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Nome do Processo](processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Nome do Processo](processo-2-nome-do-processo.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Nome do Processo](processo-3-nome-do-processo.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Nome do Processo](processo-4-nome-do-processo.md "Detalhamento do Processo 4.")

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

_Apresente aqui a conclusão do seu trabalho. Deve ser apresentada aqui uma discussão dos resultados obtidos no trabalho, local em que se verifica as observações pessoais de cada aluno. Essa seção poderá também apresentar sugestões de novas linhas de estudo._

# REFERÊNCIAS

_Como um projeto de software não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

_Verifique no link abaixo como devem ser as referências no padrão ABNT:_

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






