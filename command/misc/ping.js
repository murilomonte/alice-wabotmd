const { calculatePing } = require("../../utils");

module.exports = {
	name: "ping",
	category: "misc",
	desc: "Bot response in second.",
	async exec({ msg }) {
		await msg.reply(`*Pong!*\nLevei ${calculatePing(msg.messageTimestamp, Date.now())} segundo(s) para te ressponder!`);
	},
};
