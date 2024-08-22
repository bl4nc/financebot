import { google, sheets_v4 } from 'googleapis';
import { TelegramBot } from 'typescript-telegram-bot-api';
import * as path from 'path';
import 'dotenv/config';

async function addValueInSheets(
    sheet: sheets_v4.Sheets,
    sheetId: string,
    values: string[],
) {
    await sheet.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'plan1!A:B',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [values],
        },
    });
}

function formatDateBrazilian(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function start() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const keyFile = path.join(__dirname, process.env.CAMINHO_JSON_KEYS_GOOGLE)
    const sheetId = process.env.SHEET_ID;
    const bot = new TelegramBot({ botToken: token });
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    bot.startPolling();
    const userStates: { [key: number]: string } = {};
    bot.on('message', async (message) => {
        const chatId = message.chat.id;
        const userState = userStates[chatId];
        if (message.text == '/add') {
            bot.sendMessage({
                chat_id: chatId,
                text: 'Digite o nome do produto:',
            });
            userStates[chatId] = 'awaitingProductName';
        }
        if (userState === 'awaitingProductName') {
            const productName = message.text;
            bot.sendMessage({
                chat_id: chatId,
                text: `Nome do produto recebido: ${productName}\nAgora, digite o valor do produto:`,
            });
            // Armazena o nome do produto e muda o estado para aguardar o valor
            userStates[chatId] = 'awaitingProductValue';
            userStates[`${chatId}_productName`] = productName;
        }
        if (userState === 'awaitingProductValue') {
            // Captura o valor do produto
            const productValue = message.text;
            const productName = userStates[`${chatId}_productName`];

            bot.sendMessage({
                chat_id: chatId,
                text: `Produto adicionado:\nNome: ${productName}\nValor: ${productValue}`,
            });
            delete userStates[chatId];
            delete userStates[`${chatId}_productName`];
            const sheets = google.sheets({ version: 'v4', auth });

            await addValueInSheets(sheets, sheetId, [
                productName,
                productValue,
                formatDateBrazilian(new Date()),
            ]);
        }
    });

    bot.setMyCommands({
        commands: [
            {
                command: '/add',
                description: 'Adiciona valor a planilha.',
            },
        ],
    });
    bot.getMe().then(console.log).catch(console.error);
}

start()