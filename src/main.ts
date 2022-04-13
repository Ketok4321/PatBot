import * as dotenv from "dotenv";

import { Bot } from "./bot";
import { prefix } from "./config";

import { hehe } from "./modules/hehe";
import { badWordReplacer } from "./modules/badWordReplacer";

import { replyCommand } from "./commands/reply";
import { pingCommand } from "./commands/ping";
import { lejCommand } from "./commands/lej";
import { sayCommand } from "./commands/say";
import { progressBarCommand } from "./commands/progressBar";
import { executeCommand, safeExecuteCommand } from "./commands/execute";
import { commandListCommand } from "./commands/commandList";
import { randomReplyCommand } from "./commands/randomReply";
import { requiresPermissions } from "./commands/requiresPermission";
import { disableModuleCommand, enableModuleCommand, listModulesCommand } from "./commands/module";
import { leakCodeCommand } from "./commands/leakCode";

dotenv.config();

const bot = new Bot({ badWordReplacer, hehe });

bot.addCommand(["pomocy", "pomoc", "help"], replyCommand(`nie pomogę ci :c\n(ale możesz użyć \`${prefix}komendy\` żeby zobaczyć listę komend)`));

bot.addCommand(["żyjesz", "żyjesz?", "działasz", "działasz?"], replyCommand("tak"));
bot.addCommand(["pogłaskaj", "pat", "<:pat:708330059437441114>"], replyCommand("Pat został pogłaskany."));
bot.addCommand(["ring", "ping"], pingCommand("Bing!"));
bot.addCommand(["kiedy", "<:kiedy:741288559604138005>"], randomReplyCommand(":jutro:", ":nigdy:"));
bot.addCommand(["czy", "<:czy:767692365439565844>"], randomReplyCommand("tak", "nie"));

bot.addCommand(["lej", "lejometr", "<:lejoglowie:950000150447804436>"], lejCommand);
bot.addCommand(["powiedz"], sayCommand);

bot.addCommand(["zrób"], progressBarCommand((ctx) => `Robię ${ctx.unsplittedArgs}...`, (ctx) => `Zrobione!`));
bot.addCommand(["usuń"], progressBarCommand((ctx) => `Usuwam ${ctx.unsplittedArgs}...`, (ctx) => `Usunięte!`))

bot.addCommand(["komendy", "listakomend"], commandListCommand);
bot.addCommand(["corobi", "zleakujkod"], leakCodeCommand);
bot.addCommand(["wykonaj"], executeCommand);
bot.addCommand(["wykonajaleniejestemketokiem"], safeExecuteCommand);
bot.addCommand(["gdziejesteś"], (ctx) => ctx.message.reply(ctx.bot.client.guilds.cache.map(guild => guild.name).toString()));

bot.addCommand(["moduły"], listModulesCommand);
bot.addCommand(["włącz"], requiresPermissions(["MANAGE_GUILD"], enableModuleCommand));
bot.addCommand(["wyłącz"], requiresPermissions(["MANAGE_GUILD"], disableModuleCommand));

bot.start(process.env.TOKEN!);