# Telegram Bot com Integração ao Google Sheets

Este é um bot do Telegram escrito em TypeScript que permite aos usuários adicionar produtos a uma planilha do Google Sheets. O bot solicita ao usuário o nome e o valor de um produto e, em seguida, armazena essas informações na planilha juntamente com a data e hora em que foram inseridas.

## Funcionalidades

- **/add**: Inicia a adição de um novo produto. O bot pede ao usuário o nome do produto e depois o valor do produto.
- **Integração com Google Sheets**: Os dados inseridos são automaticamente adicionados a uma planilha específica do Google Sheets.

## Requisitos

- Node.js
- Uma conta do Google com acesso à API do Google Sheets
- Credenciais de API do Google (arquivo JSON)
- PM2 (para rodar a aplicação em produção)

## Configuração

1. **Clone este repositório**:
    ```bash
    git clone https://github.com/bl4nc/financebot
    cd financebot
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Configuração das Variáveis de Ambiente**:
    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
    
    ```plaintext
    TELEGRAM_BOT_TOKEN=seu-telegram-bot-token
    CAMINHO_JSON_KEYS_GOOGLE=caminho/para/seu/arquivo-json-de-credenciais.json
    SHEET_ID=id-da-sua-planilha-google-sheets
    ```

    - `TELEGRAM_BOT_TOKEN`: O token do seu bot do Telegram.
    - `CAMINHO_JSON_KEYS_GOOGLE`: O caminho para o arquivo JSON de credenciais do Google.
    - `SHEET_ID`: O ID da sua planilha do Google Sheets.

4. **Rodando o Bot Localmente**:
    Para rodar o bot localmente, use o comando:
    ```bash
    npx ts-node main.ts
    ```

5. **Rodando em Produção com PM2**:
    Para rodar o bot em produção utilizando PM2:
    ```bash
    pm2 start ecosystem.config.js --env production
    ```

## Como Funciona

- **Comando /add**: Quando o usuário digita `/add`, o bot solicita o nome do produto e o valor do produto em sequência. Os dados são então adicionados ao Google Sheets na ordem:
    - Coluna A: Nome do Produto
    - Coluna B: Valor do Produto
    - Coluna C: Data e Hora (Formato Brasileiro)

## Dependências

- [`typescript-telegram-bot-api`](https://www.npmjs.com/package/typescript-telegram-bot-api): API para interagir com o Telegram usando TypeScript.
- [`googleapis`](https://www.npmjs.com/package/googleapis): Biblioteca oficial do Google para acessar as APIs do Google, como Google Sheets.
- [`dotenv`](https://www.npmjs.com/package/dotenv): Carrega variáveis de ambiente de um arquivo `.env`.
- [`ts-node`](https://www.npmjs.com/package/ts-node): Interpretador TypeScript para Node.js.
- [`pm2`](https://www.npmjs.com/package/pm2) (opcional): Gerenciador de processos para Node.js, utilizado para rodar a aplicação em produção.

## Contribuição

Sinta-se à vontade para enviar pull requests e abrir issues para melhorias ou correções.