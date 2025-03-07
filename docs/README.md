# Gerenciamento de Vans


**Natalie Santana Dias Abreu, natalie.abreu@pucminas.br**

**Maria Eduarda Paiva Ferraz, dudaferrazp@gmail.com**

**Gabriel dos Santos Silva Coelho, gabriel.coelho@pucminas.br**

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

O transporte escolar por vans é uma alternativa essencial para garantir o deslocamento seguro e eficiente de estudantes até as instituições de ensino. No entanto, a falta de um sistema estruturado para gerenciar esse serviço pode gerar diversos desafios, como desorganização nas rotas, dificuldades no controle financeiro, falhas na comunicação entre motoristas e responsáveis, além da ausência de monitoramento adequado.

Diante desses problemas, a digitalização do transporte escolar surge como uma solução promissora, oferecendo mais segurança, transparência e eficiência para todos os envolvidos. Este trabalho busca analisar os principais desafios do setor e propor uma solução tecnológica capaz de otimizar a gestão do transporte, garantindo um serviço mais organizado e seguro para os estudantes.

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

O transporte escolar por vans ainda é amplamente gerenciado por métodos tradicionais, com pouca ou nenhuma digitalização. Esse cenário resulta em diversos desafios operacionais, que afetam motoristas, responsáveis e estudantes. A seguir, apresentamos uma análise de como essas tarefas são atualmente executadas:

1. Controle Financeiro

Atualmente, o controle financeiro das mensalidades é realizado de forma manual. Muitos motoristas utilizam anotações em cadernos, planilhas simples ou até mesmo registros informais via mensagens. Isso pode gerar diversos problemas, como inadimplência, esquecimentos de pagamentos, erros no cálculo de valores e dificuldade em rastrear quem já efetuou ou não o pagamento. Além disso, cobranças são feitas frequentemente via dinheiro em espécie ou transferência bancária sem integração a um sistema de gestão.

2. Definição e Organização de Rotas

A definição das rotas é feita sem ferramentas que auxiliem na otimização do percurso. Motoristas costumam planejar o trajeto manualmente, sem considerar fatores como trânsito em tempo real, melhor sequência de paradas e ajustes em caso de imprevistos. Em alguns casos, pais ou responsáveis precisam informar mudanças de horário diretamente ao motorista, o que pode gerar falhas de comunicação e atrasos.

3. Comunicação entre Motoristas, Responsáveis e Estudantes

A comunicação ocorre de maneira descentralizada, geralmente por meio de grupos de WhatsApp, mensagens de texto ou ligações telefônicas. Isso dificulta o acompanhamento das informações, pois mensagens podem ser perdidas ou não respondidas a tempo. Além disso, não há um canal oficial para registrar reclamações, sugestões ou atualizações sobre o serviço, tornando o processo confuso e ineficaz.

4. Monitoramento e Segurança

O acompanhamento da localização dos alunos durante o transporte é uma grande preocupação. Muitos responsáveis não sabem exatamente quando seus filhos embarcaram ou desembarcaram da van, pois o processo de verificação ocorre apenas por comunicação direta com o motorista. Casos de crianças esquecidas ou deixadas no local errado ocorrem devido à falta de um sistema automatizado de registro e conferência.

5. Experiência do Usuário

Para os alunos e responsáveis, a falta de um sistema estruturado traz insegurança e inconvenientes. Não há uma previsão exata da chegada da van, tornando difícil o planejamento do tempo. Estudantes também não possuem um canal direto para relatar atrasos ou problemas com o transporte, o que pode afetar sua rotina acadêmica e pessoal.

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






