const { fetchText } = require("../../utils")
const { footer } = require("../../config.json");
const { mimeTypes } = require("file-type");

module.exports = {
	name: "nekoslife",
	desc: "Use esse comando para obter algumas imagens do site nekos.life\nEnvie /help nekoslife para saber mais sobre.",
	use: "[opção]\n\n- *Opções* -\n\nsmug\nwoof\ngasm\n8ball\ngoose\ncuddle\navatar\nslap\npat\ngecg\nfeed\nfox_girl\nlizard\nneko\nhug\nmeow\nkiss\nwallpaper\ntickle\nspank\nwaifu\nlewd\nngif\n\nEx: !nl hug",
    category: "weebs",
	alias: ["nl"],
	async exec({ msg, sock, args, arg, isOwner }) {
        let tipo = args.join(" ")
        try {
            if (!tipo) tipo = 'neko'
            let bjj = await fetchText(`https://nekos.life/api/v2/img/${tipo}`)
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