const { fetchText } = require("../../utils")
const { footer } = require("../../config.json");
const { mimeTypes, fromStream } = require("file-type");
const fs = require('fs')

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
            
            function legenda() {
                if (bjj.url.includes(".gif")) {
                    let caption = `Aqui está!\nCaso o gif não esteja se mexendo, veja ele aqui: ${bjj.url} :)`
                    return caption
                } else {
                    let caption = `Aqui está!\nFonte: ${bjj.url}`
                    return caption
                }
            }

            await sock.sendMessage(
                msg.from,
                {
                    image: { url: bjj.url },
                    caption: legenda()
                },
                { quoted: msg }
            );
        } catch (e) {
            msg.reply('Esse termo não existe ou não foi encontrado. Tente outro :)')
            console.log(e)
        }
        
    }
}