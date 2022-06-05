const fs = require("fs");
const { getRandom } = require("../../utils");
const run = require("child_process").exec;

module.exports = {
	name: "nowm",
	alias: ["delwm", "wmdel"],
	category: "general",
	desc: "Use isso para remover o autor, pacote e 'veja mais' das figurinhas.",
	async exec({ sock, msg }) {
		const { quoted, type, from } = msg;
		const content = JSON.stringify(quoted);
		const QStick = type === "extendedTextMessage" && content.includes("stickerMessage");
		const QStickEph = type === "ephemeralMessage" && content.includes("stickerMessage");

		try {
			if (QStick || QStickEph) {
				const ran = getRandom(".webp");
				const ran1 = ran + ".webp";
				let path = await quoted.download(`./temp/${ran}`);
				run(`webpmux -set exif ./temp/d.exif ${path} -o ./temp/${ran1}`, async function (err) {
					fs.unlinkSync(path);
					if (err) return await msg.reply(`Error while creating sticker\n${err.message}`);
					await sock.sendMessage(from, { sticker: { url: `./temp/${ran1}` } }, { quoted: msg });
					fs.unlinkSync(`./temp/${ran1}`);
				});
			} else {
				await msg.reply("Acho que você esqueceu de responder o sticker.");
			}
		} catch (e) {
			await msg.reply(`infelizmente ocorreu algum erro :/\nErro: ${e.message}`);
		}
	},
};
