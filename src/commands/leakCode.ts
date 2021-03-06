import { CommandBuilder, stringParser } from "../command";

export const leakCodeCommand = new CommandBuilder()
    .withArg("komenda", stringParser)
    .executes(({ bot, message }, command) => {
        const [cmd, _] = bot.commandHandler.getCommand(command) ?? [null, null];
        if (!cmd) return void message.reply("Ta komenda nie istnieje");
        if (cmd instanceof Array) return void message.reply("Leakowanie kodu grup komend nie jest jeszcze supportowane przez pata");
        if (!cmd) return void message.reply("nie ma takiej komendy");
        message.reply("(kod poniżej jest wynikiem kompilacji z ts do js, więc różni się nieco od prawdziwego)\n```js\n" + cmd.execute.toString() + "```");
    });