const { fetchText, fetchJson } = require("../../utils")
const { footer } = require("../../config.json");
const { mimeTypes, fromStream } = require("file-type");
const fs = require('fs');
const { slice } = require("cheerio/lib/api/traversing");
const fetch = require('node-fetch');

module.exports = {
	name: "waifuim",
	desc: "Use esse comando para receber imagens e gifs do site waifu.im :)",
	use: "[modo] [categoria]\n\n- *modos* -\n\n1. nsfw\n2. sfw\n\n- *Categorias* -\n\n* sfw *:\nwaifu\nneko\nshinobu\nmegumin\nbully\ncuddle\ncry\nhug\nawoo\nkiss\nlick\npat\nsmug\nbonk\nyeet\nblush\nsmile\nwave\nhighfive\nhandhold\nnom\nbite\nglomp\nslap\nkill\nkick\nhappy\nwink\npoke\ndance\ncringe\n\n* nsfw *:\nwaifu\nneko\ntrap\nblowjob",
	category: "weebs",
	alias: ["wi", "waifuim"],
	async exec({ msg, sock, args, arg, isOwner, name }) {
        let category = args[0]
        try { 
            //provavelmente tinha um jeito melhor de fazer isso que você está vendo, mas eu não sei como, no momento

            async function saveCache(){
                //gera um nome aleatório pro arquivo
                let result = Math.random().toString(36).substring(2,7);
                //salva o arquivo
                let response = await fetch(bjj.images[0].url);
                let buffer = await response.buffer();
                let saved = fs.writeFile(`./event/cache/wi/${category}/${result}.${bjj.images[0].extension}`, buffer, () => 
                console.log(`Salvo como ${result}.${bjj.images[0].extension}`));
                return saved;
            }
            
            function legenda() {
                let bjjinfo = `Aqui está!\nFonte: ${bjj.images[0].source}\nÉ nsfw?: ${bjj.images[0].is_nsfw}\nURL: ${bjj.images[0].url}`
                //Cor dominante: ${bjj.images[0].dominant_color}\n

                if (bjj.images[0].extension == ".gif") {
                    let caption = bjjinfo + `\nCaso o gif não esteja se mexendo, veja ele aqui: ${bjj.images[0].url} :)`
                    return caption
                } else {
                    let caption = bjjinfo
                    return caption
                }
            }

            if (category == undefined) {
                category = 'waifu'
            }
            
            let bjj = await fetchText(`https://api.waifu.im/random/?selected_tags=${category}`)
            let res = bjj.images[0].url

            await sock.sendMessage(
                msg.from,
                {
                    image: { url: res },
                    caption: legenda(),
                    templateButtons: [
                        { quickReplyButton: { displayText: "Mais", id: `/wi ${category}` } },
                    ],
                },
                { quoted: msg }
            );
           saveCache();
        } catch (e) {
            msg.reply('Esse termo não existe ou não foi encontrado. Tente outro :)')
            console.log(e)
        }
        
    }
}