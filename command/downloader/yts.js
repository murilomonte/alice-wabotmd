const Downloader = require("../../utils/downloader");
const { yts } = new Downloader();

module.exports = {
	name: "yts",
	alias: ["ytsearch"],
	category: "downloader",
	desc: "Use isso para fazer buscas no youtube :)",
	async exec({ sock, msg, args }) {
		if (args.length < 1) return await msg.reply("Acho que você esqueceu de enviar a busca.");
		const ytsData = await yts(args.join(" "), "long");
		let txt = `Resultados da busca por ${args.join(" ")}\n\n`;
		for (let i = 0; i < ytsData.length; i++) {
			txt += `\n📙 Título: ${ytsData[i].title}\n📎 Url: ${ytsData[i].url}\n🚀 Data de upload: ${ytsData[i].ago}\n`;
		}
		await sock.sendMessage(msg.from, { image: { url: ytsData[0].image }, caption: txt }, { quoted: msg });
	},
};
