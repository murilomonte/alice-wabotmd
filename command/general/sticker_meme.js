const { memeText } = require("../../utils/uploader");
const { sticker } = require("../../lib/convert");
const lang = require("../other/text.json");

module.exports = {
	name: "stikmeme",
	alias: ["stickermeme", "stikermeme", "stiktext", "stickertext", "stikertext", "sticktext", "smeme", "stext"],
	category: "general",
	desc: "Use isso para criar um sticker, só que meme 😳",
	use: "<texto>|<texto>\n\nEx:\n!stickermeme eis que|a 10/10",
	async exec({ msg, arg, sock }) {
		const { quoted, from, type } = msg;

		const content = JSON.stringify(quoted);
		const isMedia = type === "imageMessage";
		const isQImg = type === "extendedTextMessage" && content.includes("imageMessage");
		const isQDoc = type === "extendedTextMessage" && content.includes("documentMessage");
		let top = arg.split("|")[0] || "_";
		let bottom = arg.split("|")[1] || "_";

		let buffer, memeImg, stickerBuff;
		try {
			if ((isMedia && !msg.message.videoMessage) || isQImg) {
				buffer = isQImg ? await quoted.download() : await msg.download();
				memeImg = await memeText(buffer, top.toString(), bottom.toString());
				stickerBuff = await sticker(memeImg, { isImage: true, cmdType: "1" });
				await sock.sendMessage(from, { sticker: stickerBuff }, { quoted: msg });
			} else if (isQDoc && /image/.test(quoted.message.documentMessage.mimetype)) {
				buffer = await quoted.download();
				memeImg = await memeText(buffer, top, bottom);
				stickerBuff = await sticker(memeImg, { isImage: true, cmdType: "1" });
				await sock.sendMessage(from, { sticker: stickerBuff }, { quoted: msg });
			} else {
				await msg.reply(lang.ptbr.stickmeme);
			}
			(buffer = null), (memeImg = null), (stickerBuff = null);
		} catch (e) {
			await msg.reply("Infelizmente ocorreu um erro ao criar o sticker :/");
		}
	},
};
