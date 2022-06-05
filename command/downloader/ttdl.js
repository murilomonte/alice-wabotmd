const Downloader = require("../../utils/downloader");
const { ttdl } = new Downloader();
const lang = require("../other/text.json");

const errMess = lang.ptbr.util.download.ttFail;

module.exports = {
	name: "ttdl",
	alias: ["tiktok", "tt", "tiktokdl", "tiktokmusic", "tiktoknowm", "tiktokwm", "ttwm", "ttnowm", "ttmusic"],
	category: "downloader",
	desc: "Use isso para baixar vídeos do tiktok",
	use: "[opção] url\n\n- *Opções* -\n\n1. audio\n2. video\n\nEx: !tiktok audio url",
	async exec({ sock, msg, args }) {
		try {
			let opt = args[0];
			const { url } = parse(args.join(" "));
			if (url === "") {
				return await msg.reply("O link que você enviou parece ser inválido :/");
			}
			let data;
			switch (opt) {
				case "audio":
				case "music":
					data = await ttdl(url);
					if (!data.mp3.length > 0) return msg.reply("Não foi possível encontrar o áudio :/");
					await sock.sendMessage(
						msg.from,
						{ audio: { url: data.mp3[data.mp3.length - 1] }, mimetype: "audio/mp4" },
						{ quoted: msg }
					);
					break;
				case "video":
					data = await ttdl(url);
					if (!data.mp4.length > 0) return msg.reply("Não foi possível encontrar o vídeo :/");
					await sock.sendMessage(
						msg.from,
						{ video: { url: data.mp4[data.mp4.length - 1] } },
						{ quoted: msg }
					);
					break;
				default:
					data = await ttdl(url);
					if (!data.mp4.length > 0) return msg.reply("Não foi possível encontrar o vídeo :/");
					await sock.sendMessage(
						msg.from,
						{ video: { url: data.mp4[data.mp4.length - 1] } },
						{ quoted: msg }
					);
			}
		} catch (e) {
			await msg.reply(errMess);
		}
	},
};

const parse = (text) => {
	const rex = /(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi;
	const url = text.match(rex);
	return { url: url == null ? "" : url[0] };
};
