const { telegramSticker } = require("../../utils/scraper");
const { footer } = require("../../config.json");

module.exports = {
	name: "telestick",
	category: "general",
	desc: "Use esse comando para buscar pacotes de figurinhas no telegram :).",
	use: "<bsuca>|[número da página].\nExemplo: #telestick Ame|2",
	async exec({ msg, arg, sock }) {
		try {
			let dataSticker,
				text = "",
				page = parseInt(arg.split("|")[1]) || 1,
				query = arg.split("|")[0] || null;
			if (query === "" || !query || query === ".telestick") return await msg.reply("Você esqueceu de dizer qual o temo pra procurar.");

			dataSticker = await telegramSticker.search(query, page);
			if (!dataSticker.stickers.length > 0) return await msg.reply("Nenhum pack de sticker foi encontrado :/");

			text +=
				`Resultado da busca: \`\`\`${query}\`\`\`\nQuantidade de páginas: ${dataSticker.pageInfo.total}\n` +
				`Você está na: ${page}\n\n`;
			for (let idx in dataSticker.stickers) {
				text += `Nome: ${dataSticker.stickers[idx].name}\nLink: ${dataSticker.stickers[idx].link}\n\n`;
			}
			text += "Função de donwload em breve...";

			// delete old message
			if (msg.quoted) await msg.quoted.delete();
			if (dataSticker.pageInfo.total === 1) {
				await msg.reply(text);
			} else if (page < dataSticker.pageInfo.total && page === 1) {
				const buttons = [
					{
						buttonId: `#telestick ${query}|${page + 1} SMH`,
						buttonText: { displayText: "➡️ Próxima" },
						type: 1,
					},
				];
				await sock.sendMessage(
					msg.from,
					{
						text,
						footer: footer,
						buttons,
						headerType: 1,
					},
					{ quoted: msg }
				);
			} else if (page < dataSticker.pageInfo.total) {
				const buttons = [
					{
						buttonId: `#telestick ${query}|${page - 1} SMH`,
						buttonText: { displayText: "⬅️ Anterior" },
						type: 1,
					},
					{
						buttonId: `#telestick ${query}|${page + 1} SMH`,
						buttonText: { displayText: "➡️ Próxima" },
						type: 1,
					},
				];
				await sock.sendMessage(
					msg.from,
					{
						text,
						footer: footer,
						buttons,
						headerType: 1,
					},
					{ quoted: msg }
				);
			} else if (page === dataSticker.pageInfo.total) {
				const buttons = [
					{
						buttonId: `#telestick ${query}|${page - 1} SMH`,
						buttonText: { displayText: "⬅️ Anterior" },
						type: 1,
					},
				];
				await sock.sendMessage(
					msg.from,
					{
						text,
						footer: footer,
						buttons,
						headerType: 1,
					},
					{ quoted: msg }
				);
			}
		} catch (e) {
			await msg.reply(`Erro: \n${e.stack}`);
		}
	},
};
