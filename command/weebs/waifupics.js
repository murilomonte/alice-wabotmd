const { fetchText } = require("../../utils")
const { footer } = require("../../config.json");
const { mimeTypes } = require("file-type");

module.exports = {
	name: "waifupics",
	desc: "Use esse comando para receber imagens e gifs do site waifu.pics :)",
	use: "[modo] [categoria]\n\n- *modos* -\n\n1. nsfw\n2. sfw\n\n- *Categorias* -\n\n* sfw *:\nwaifu\nneko\nshinobu\nmegumin\nbully\ncuddle\ncry\nhug\nawoo\nkiss\nlick\npat\nsmug\nbonk\nyeet\nblush\nsmile\nwave\nhighfive\nhandhold\nnom\nbite\nglomp\nslap\nkill\nkick\nhappy\nwink\npoke\ndance\ncringe\n\n* nsfw *:\nwaifu\nneko\ntrap\nblowjob",
	category: "weebs",
	alias: ["wp", "waifu"],
	async exec({ msg, sock, args, arg, isOwner }) {
        let tipo = args[0]
        let category = args[1]
        try {
            if (tipo == undefined || category == undefined) {
                tipo = 'sfw'
                category = 'neko'
            }
            let bjj = await fetchText(`https://api.waifu.pics/${tipo}/${category}`)
            await sock.sendMessage(
                msg.from,
                {
                    image: { url: bjj.url },
                    caption: `Aqui está!\nFonte: ${bjj.url}`
                },
                { quoted: msg }
            );
        } catch (e) {
            msg.reply('Esse termo não existe ou não foi encontrado. Tente outro :)')
            console.log(e)
        }
        
    }
}