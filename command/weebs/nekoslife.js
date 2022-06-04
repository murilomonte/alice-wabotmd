const { fetchText } = require("../../utils")
const { footer } = require("../../config.json");

module.exports = {
	name: "nekoslife",
	desc: "",
	use: "<parâmetro>",
    category: "weebs",
	alias: ["nl"],
	premium: false,
	owner: false,
	async exec({ msg, sock, args, arg, isOwner }) {
        let tipo = args.join(" ")
        let bjj = await fetchText(`https://nekos.life/api/v2/img/${tipo}`)
        if (!bjj.url) {
            reply('Esse termo não existe ou não foi encontrado. Tente outro :)')
        } else {
            await sock.sendMessage(
                msg.from,
                {
                    image: { url: bjj.url },
                    caption: 'Aqui está!',
                    footer
                },
                { quoted: msg }
            );
        }
        
    }
}