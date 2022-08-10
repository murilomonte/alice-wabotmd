const djs = require("../../lib/Collection");
const { footer, botName } = require("../../config.json");

module.exports = {
	name: "help",
	alias: ["h", "cmd", "menu"],
	category: "general",
	async exec({ sock, msg, args, isOwner }) {
		if (args[0]) {
			const data = [];
			const name = args[0].toLowerCase();
			const { commands, prefix } = djs;
			const cmd = commands.get(name) || commands.find((cmd) => cmd.alias && cmd.alias.includes(name));
			if (!cmd || (cmd.category === "private" && !isOwner)) return await msg.reply("No command found");
			else data.push(`*Comando:* ${cmd.name}`);
			if (cmd.alias) data.push(`*Alternativas:* ${cmd.alias.join(", ")}`);
			if (cmd.limit) data.push(`*Limite:* ${cmd.consume || 1}`);
			if (cmd.premium) data.push(`*Premium:* ${cmd.premiumType.join(" / ")}`);
			if (cmd.desc) data.push(`*Descrição:* ${cmd.desc}`);
			if (cmd.use)
				data.push(
					`*Uso* \`\`\`${prefix}${cmd.name} ${cmd.use}\`\`\`\n\nNota:\n [] = opcional\n | = ou\n <> = deve ser preenchido`
				);

			return await msg.reply(data.join("\n"));
		} else {
			const { pushName, sender } = msg;
			const { prefix, commands } = djs;
			const cmds = commands.keys();
			let category = [];

			for (let cmd of cmds) {
				let info = commands.get(cmd);
				if (!cmd) continue;
				if (!info.category || info.category === "private" || info.owner) continue;
				if (Object.keys(category).includes(info.category)) category[info.category].push(info);
				else {
					category[info.category] = [];
					category[info.category].push(info);
				}
			}
			let str =
				`Olá, ${pushName === undefined ? sender.split("@")[0] : pushName}! :)\n*Meu nome é ${botName} e aqui estão meus comandos.*\n\n`
			const keys = Object.keys(category);
			for (const key of keys) {
				str += `[ *${key.toUpperCase()}* ]\n\`\`\`${category[key]
					.map(
						(cmd, idx) =>
							`• ${idx + 1}. ${cmd.name}${cmd.limit ? ` (${cmd.consume || 1} limit)` : ""}${
								cmd.premium ? ` (Premium)` : ""
							}`
					)
					.join("\n")}\`\`\`\n──────────\n`;
			}
			
			/*
			footer: footer
			,
					templateButtons: [
						{
							urlButton: {
								displayText: "Código fonte",
								url: "https://github.com/murilomonte/alice-wabotmd",
							},
						},
					],
			*/

			str += `envie ${prefix}help seguido de um comando para saber mais informações.\nEx: ${prefix}help sticker`;
			await sock.sendMessage(
				msg.from,
				{
					text: str
				},
				{ quoted: msg }
			);
		}
	},
};
