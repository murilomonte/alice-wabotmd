const Downloader = require("../../utils/downloader");
const { fbdl } = new Downloader();
const lang = require("../other/text.json");

const errMess = lang.ptbr.util.download.fbFail

module.exports = {
	name: "fb",
	alias: ["fbdl", "facebook", "fbvid"],
	category: "downloader",
	desc: "envie esse comando seguido de um link de um video do facebook que eu baixo ele rapidinho pra você :)",
	async exec({ sock, msg, args }) {
		try {
			if (!args.length > 0) return await msg.reply("Acho que você esqueceu de enviar o link.");
			let data = await fbdl(args[0]);

			if (data.length === 0)
				return await msg.reply(
					lang.ptbr.util.download.fbPriv
				);
			await sock.sendMessage(msg.from, { video: { url: data[data.length - 1] } }, { quoted: msg });
		} catch (e) {
			await msg.reply(errMess);
		}
	},
};
