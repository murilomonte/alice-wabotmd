const { fetchText } = require("../../utils")
const { footer } = require("../../config.json");
const { mimeTypes, fromStream } = require("file-type");
const fs = require('fs');
const { slice } = require("cheerio/lib/api/traversing");
const fetch = require('node-fetch');

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
            //provavelmente tinha um jeito melhor de fazer isso que você está vendo, mas eu não sei como, no momento
            function exten(check) { 
                if (check.includes(".gif")) {
                    let resultado = ".gif"
                    return resultado
                } else {
                    let resultado = ".jpg"
                    return resultado
                }
            }

            async function saveCache(){
                //gera um nome aleatório pro arquivo
                let result = Math.random().toString(36).substring(2,7);
                //salva o arquivo
                let response = await fetch(bjj.url);
                let buffer = await response.buffer();
                let saved = fs.writeFile(`./event/cache/${result}.${exten(bjj.url)}`, buffer, () => 
                console.log(`Salvo como ${result}.${exten(bjj.url)}`));
                return saved;
            }
            
            function legenda() {
                if (bjj.url.includes(".gif")) {
                    let caption = `Aqui está!\nCaso o gif não esteja se mexendo, veja ele aqui: ${bjj.url} :)`
                    return caption
                } else {
                    let caption = `Aqui está!\nFonte: ${bjj.url}`
                    return caption
                }
            }

            if (tipo == undefined || category == undefined) {
                tipo = 'sfw'
                category = 'neko'
            }
            let bjj = await fetchText(`https://api.waifu.pics/${tipo}/${category}`)

            await sock.sendMessage(
                msg.from,
                {
                    image: { url: bjj.url },
                    caption: legenda()
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