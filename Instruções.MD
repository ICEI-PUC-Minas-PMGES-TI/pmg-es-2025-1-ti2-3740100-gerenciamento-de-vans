# 🚌 Van Wise – Gerenciamento de Vans

## 📋 Relatórios e Branches
- **Relatório atualizado:** branch `main`
- **Branch principal de desenvolvimento:** `gabriel-develop`

## ✅ Pré-requisitos
- Java instalado (JDK 17 ou superior recomendado)
- Node.js instalado (versão 18 ou superior recomendada)
- MySQL instalado
- VS Code ou outra IDE para editar e executar o projeto

## ⚙️ Passos para implantação

### 1️⃣ Clonar o repositório
No terminal do VS Code:
```bash
git clone <URL_DO_REPOSITORIO>
```

### 2️⃣ Configurar o banco de dados
- Crie um banco chamado `projeto` no MySQL.
- No backend, localize `src/main/resources/application.properties` e ajuste com suas credenciais do MySQL:
```properties
spring.application.name=vans
spring.output.ansi.enabled=ALWAYS
server.port=8081
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/projeto?createDatabaseIfNotExist=true
spring.datasource.username=SEU_USERNAME
spring.datasource.password=SEU_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 3️⃣ Rodar o frontend
No terminal, execute:
```bash
cd pmg-es-2025-1-ti2-3740100-gerenciamento-de-vans/src/front/van-wise-front
npm install axios
npm run dev
```

### 4️⃣ Rodar o backend
- No VS Code, abra o arquivo `Application.java` na pasta do backend.
- Clique em **Run** ou execute como aplicação Spring Boot.

## 🚀 Pronto!
O frontend ficará disponível localmente e o backend rodará na porta `8081` integrado ao MySQL.



