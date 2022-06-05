const { sfile } = require("../../utils/scraper");

module.exports = {
	name: "sfile",
	alias: ["sf"],
	desc: "Busque e baixe arquivos do site sfile.mobi",
	use: "<opção> <busca|link>\n\nOpções:\n- search\n- latest",
	category: "downloader",
	async exec({ msg, args }) {
		try {
			if (!args.length > 0) return await msg.reply("Você não enviou nenhuma opção de busca.\nEnvie #help sfile para saber como o comando funciona :)");
			let opts = args[0],
				query = args.slice(1),
				searchResult,
				text = "";
			switch (opts) {
				case "search":
					searchResult = await sfile.search(query.join(" "));
					if (!searchResult.length > 0) return await msg.reply("Sem resulados :/");
					text += `Resultado para: \`\`\`${query.join(" ")}\`\`\`\n\n`;
					for (let idx in searchResult) {
						text += `*Nome*: ${searchResult[idx].name}\n*Tamanho*: ${searchResult[idx].size}\n*Link*: ${searchResult[idx].link}\n\n`;
					}
					await msg.reply(text);
					break;
				case "latest":
					searchResult = await sfile.latest();
					text += "Último arquivo enviado pno sfile.mobi\n\n";
					for (let idx in searchResult) {
						text +=
							`*Nome*: ${searchResult[idx].name}\n*Tamanho*: ${searchResult[idx].size}\n` +
							`*${searchResult[idx].upload}*\n*Link*: ${searchResult[idx].link}\n\n`;
					}
					await msg.reply(text);
					break;
				// case "download":
				// case "dl":
				//     let { dlink, sessCookie, filename, mime } = await sfile.download(query[0]);
				//     if (!dlink) return await msg.reply("No download link found");
				//     let dBuffer = await fetchBuffer(dlink, { headers: { cookie: sessCookie }});
				//     await sock.sendMessage(msg.from, { document: dBuffer, fileName: filename, mimetype: mime }, { quoted: msg });
				//     break;
				default:
					await msg.reply("Opção dispońivel *search* | *latest*.\nExemplo: #sfile search minecraft");
			}
		} catch {
			await msg.reply("Ocorreu um erro ao processar :/");
		}
	},
};
