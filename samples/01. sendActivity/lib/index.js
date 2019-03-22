"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const botbuilder_1 = require("botbuilder");
const botbuilder_rules_1 = require("botbuilder-rules");
// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
    console.log(`\nTo talk to your bot, open echobot.bot file in the Emulator.`);
});
// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about .bot file its use and bot configuration.
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.microsoftAppID,
    appPassword: process.env.microsoftAppPassword,
});
// Create bot and bind to state storage
const bot = new botbuilder_rules_1.Bot();
bot.storage = new botbuilder_1.MemoryStorage();
// Listen for incoming activities.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route activity to bot.
        await bot.onTurn(context);
    });
});
// Initialize bots root dialog
const dialogs = new botbuilder_rules_1.RuleDialog();
bot.rootDialog = dialogs;
// Add a default rule for handling incoming messages
dialogs.addRule(new botbuilder_rules_1.DefaultResponseRule([
    new botbuilder_rules_1.SendActivity('Hello World!')
]));
//# sourceMappingURL=index.js.map