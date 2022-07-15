const { fetchText, fetchJson } = require("../../utils")
const { footer } = require("../../config.json");
const { mimeTypes, fromStream } = require("file-type");
const fs = require('fs');
const { slice } = require("cheerio/lib/api/traversing");
const fetch = require('node-fetch');
const RedditImageFetcher = require("reddit-image-fetcher");
const { type } = require("os");

module.exports = {
	name: "reddit",
	desc: "Use esse comando para receber imagens e gifs do reddit :)",
	use: "<subreddit>\n\nex: /rs meow\n\nobs: subreddits nsfw são suportados :))",
	category: "random",
	alias: ["rs"],
	async exec({ msg, sock, args, arg, isOwner, name }) {
        let category = await args[0]
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

            async function saveCache(result){
                //gera um nome aleatório pro arquivo
                let resname = Math.random().toString(36).substring(2,7);
                //salva o arquivo
                let response = await fetch(result[0].image);
                let buffer = await response.buffer();
                let saved = fs.writeFile(`./event/cache/reddit/${resname}.${exten(result[0].image)}`, buffer, () => 
                console.log(`Salvo como ${resname}.${exten(result[0].image)}`));

                let folderName = './event/cache/reddit';
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName, {recursive: true});
                    console.log('Cache folder created.')
                    return saved
                } else {
                    return saved
                }
            }

            function legenda(result) {
                let precap = `título: ${result[0].title}\nLink do post: ${result[0].postLink}\nSubreddit: ${result[0].subreddit}\nÉ nsfw?: ${result[0].NSFW}`
                if (result[0].image.includes(".gif")) {
                    let caption =`${precap}\n\nCaso o gif não esteja se mexendo, veja ele aqui: ${result[0].image} :)`
                    return caption
                } else {
                    let caption = `${precap}\nFonte: ${result[0].image}`
                    return caption
                }
            }

            if (category == undefined) {
                category = 'waifu'
            }
            

            RedditImageFetcher.fetch({
                type: 'custom',
                subreddit: [`${args[0]}`]
            }).then(result => {   
                sock.sendMessage(
                    msg.from,
                    {
                        image: { url: result[0].image },
                        caption: legenda(result),
                    },
                    { quoted: msg }
                );
                saveCache(result)
            });

            /*
            qualquer coisa tira os comentarios do seguinte arquivo na linha 101
            node_modules/reddit-image-fetcher/index.js
            */

        } catch (e) {
            msg.reply('Esse termo não existe ou não foi encontrado. Tente outro :)')
            console.log(e)
        }
        
    }
}