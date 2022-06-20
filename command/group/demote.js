const djs = require("../../lib/Collection");
const lang = require("../other/text.json");

module.exports = {
	name: "demote",
	alias: ["rebaixar"],
	category: "group",
	desc: "Use isso para rebaixar um mebro do grupo.",
	async exec({ sock, msg }) {
		const { mentions, quoted, from, sender, isGroup, body } = msg;
		try {
			const { prefix } = djs;
			const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();

			const meta = isGroup ? await sock.groupMetadata(from) : "";
			const groupMem = isGroup ? meta.participants : "";
			const admin = isGroup ? getAdmin(groupMem) : "";
			const owner = meta.owner;
			const myID = sock.user.id.split(":")[0] + "@s.whatsapp.net";
			const cekAdmin = (m) => admin.includes(m);
			const checkInGroup = (m) => {
				let members = [];
				for (let ids of meta.participants) {
					members.push(ids.id);
				}
				return members.includes(m);
			};

			if (!isGroup) return await msg.reply("Esse comando só pode ser executado em grupos.");
			if (!cekAdmin(sender))
				return await msg.reply(
					lang.ptbr.group.demote.noPerms
				);
			if (!cekAdmin(myID))
				return await msg.reply(
					lang.ptbr.group.demote.botNoPerms
				);

			if (quoted) {
				const mention = quoted.participant;
				if (!checkInGroup(mention)) return await msg.reply("O membro não está mais no grupo.");
				if (!cekAdmin(mention))
					return await msg.reply(
						lang.indo.group.demote.fail
					);
				if (mention === owner) return await msg.reply("Não é possível rebaixar o criador.");
				// demote start
				await sock.groupParticipantsUpdate(from, [mention], "demote");
				await msg.reply(lang.ptbr.group.demote.success);
			} else if (mentions) {
				const mention = mentions[0];
				if (!checkInGroup(mention)) return await msg.reply("MO membro não está mais no grupo.");
				if (!cekAdmin(mention))
					return await msg.reply(
						lang.indo.group.demote.fail
					);
				if (mention === owner) return await msg.reply("Não é possível rebaixar o criador do grupo"); 
				// demote start
				await sock.groupParticipantsUpdate(from, [mention], "demote");
				await msg.reply(lang.ptbr.group.demote.success);
			} else {
				await msg.reply(
					`Como usar: *${prefix + command} @mentionMember*\nOu você pode apenas responder uma mensagem de quem você quer rebaixar *${
						prefix + command
					}*`
				);
			}
		} catch (e) {
			await msg.reply(lang.ptbr.group.demote.fail);
		}
	},
};

function getAdmin(participants) {
	let admins = new Array();
	for (let ids of participants) {
		!ids.admin ? "" : admins.push(ids.id);
	}
	return admins;
}
