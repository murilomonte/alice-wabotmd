const { fetchText } = require("../../utils")
const { footer } = require("../../config.json");
const { mimeTypes } = require("file-type");
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
	name: "nekoslife",
	desc: "Use esse comando para obter algumas imagens do site nekos.life\nEnvie /help nekoslife para saber mais sobre.",
	use: "[opção]\n\n- *Opções* -\n\nsmug\nwoof\ngasm\n8ball\ngoose\ncuddle\navatar\nslap\npat\ngecg\nfeed\nfox_girl\nlizard\nneko\nhug\nmeow\nkiss\nwallpaper\ntickle\nspank\nwaifu\nlewd\nngif\n\nEx: !nl hug",
    category: "weebs",
	alias: ["nl"],
	async exec({ msg, sock, args, arg, isOwner }) {
        let tipo = args.join(" ")
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
                let saved = fs.writeFile(`./event/cache/nl/${tipo}/${result}.${exten(bjj.url)}`, buffer, () => 
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

            if (!tipo) tipo = 'neko'
            let bjj = await fetchText(`https://nekos.life/api/v2/img/${tipo}`)

            await sock.sendMessage(
                msg.from,
                {
                    image: { url: bjj.url },
                    caption: legenda(),
                    templateButtons: [
                        { quickReplyButton: { displayText: "Mais", id: `/nl ${tipo}` } },
                    ],
                },
                { quoted: msg }
            );

            saveCache()
        } catch (e) {
            msg.reply('Esse termo não existe ou não foi encontrado. Tente outro :)')
            console.log(e)
        }
    }
}