const Downloader = require("../../utils/downloader");
const { getInfo } = new Downloader();
const lang = require("../other/text.json");

module.exports = {
	name: "twtdl",
	alias: ["twt"],
	category: "downloader",
	async exec({ sock, msg, args }) {
		if (!args.length > 0 || !args[0].includes("twitter.com") || args[0].includes("t.co"))
			return await msg.reply("Acho que você esqueceu de enviar o link.");
		getInfo(args[0])
			.then(async (data) => {
				if (data.type === "video") {
					const content = data.variants
						.filter((x) => x.content_type !== "application/x-mpegURL")
						.sort((a, b) => b.bitrate - a.bitrate);
					await sock.sendMessage(msg.from, { video: { url: content[0].url } }, { quoted: msg });
				} else if (data.type === "photo") {
					for (let z = 0; z < data.variants.length; z++) {
						await sock.sendMessage(msg.from, { image: { url: data.variants[z] } }, { quoted: msg });
					}
				} else if (data.type === "animated_gif") {
					const content = data.variants[0]["url"];
					await sock.sendMessage(msg.from, { video: { url: content } }, { quoted: msg });
				}
			})
			.catch(async () => {
				await msg.reply(
					lang.ptbr.util.download.twittFail
				);
			});
	},
};
