const { generateWAMessageFromContent, proto } = require("@adiwajshing/baileys");
const Downloader = require("../../utils/downloader");
const { yt, yts } = new Downloader();
const { fetchBuffer, fetchText } = require("../../utils");
const { footer } = require("../../config.json");

module.exports = {
	name: "play",
	category: "downloader",
	desc: "Envie esse esse comando seguido do nome de uma música que eu baixo ela pra você :)",
	async exec({ sock, msg, args }) {
		const { from, sender } = msg;
		if (args.length < 1) return await msg.reply("Sem resultados para a busca. :/");
		const ytsData = await yts(args.join(" "), "short");
		if (!ytsData.length > 0) return await msg.reply("Não foi encontrado nenhum vídeo com esse nome. :/\nTente outro.");
		let thumb = await fetchBuffer(ytsData[0].thumbnail);
		const res = await yt(ytsData[0].url, "audio");
		if (res === "no_file") return await msg.reply("Não foi encontrado nenhum link de download, talvez você devesse tentar outro...");

		// message struct
		let prep = generateWAMessageFromContent(
			from,
			proto.Message.fromObject({
				buttonsMessage: {
					locationMessage: { jpegThumbnail: thumb.toString("base64") },
					contentText: `📙 Título: ${ytsData[0].title}\n📎 Url: ${ytsData[0].url}\n🚀 Data de upload: ${ytsData[0].ago}\n\nDeseja o vídeo? Clique no botão abaixo.\nSe ele não estiver aparecendo pra você, tente enviar *!ytv youtube_url*\n\nTô enviando a música, é rapidinho :)`,
					footerText: footer,
					headerType: 6,
					buttons: [
						{ buttonText: { displayText: "Video" }, buttonId: `#ytv ${ytsData[0].url} SMH`, type: 1 },
					],
				},
			}),
			{ timestamp: new Date() }
		);

		// Sending message
		await sock.relayMessage(from, prep.message, { messageId: prep.key.id }).then(async () => {
			try {
				if (res.size >= 10 << 10) {
					let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
					let capt =
						`*Título:* ${res.title}\n` +
						`*Qualidade:* ${res.q}\n*Tamanho:* ${res.sizeF}\n*Download:* ${short}\n\n_Filesize to big_`;
					await sock.sendMessage(from, { image: { url: res.thumb }, caption: capt }, { quoted: prep });
				} else {
					let respMsg = await sock.sendMessage(
						from,
						{ audio: await fetchBuffer(res.dl_link, { skipSSL: true }), mimetype: "audio/mpeg" },
						{ quoted: prep }
					);
					let sections = [{ title: "Selecione o resultado", rows: [] }];
					for (let idx in ytsData) {
						sections[0].rows.push({ title: ytsData[idx].title, rowId: `#yta ${ytsData[idx].url}` });
					}
					await sock.sendMessage(
						from,
						{
							text: "Eu enviei a musica errada?\nClique no botão abaixo e escolha outra com base na minha pesquisa.",
							buttonText: "Resultado da busca",
							footer: footer,
							mentions: [sender],
							sections,
						},
						{ quoted: respMsg }
					);
					sections = null;
				}
			} catch (e) {
				console.log(e);
				await msg.reply("Ocorreu algo de errado ao enviar o arquivo :/\nTenta novamente daqui alguns minutos, ok? :)");
			}
		});
		thumb = null;
	},
};
