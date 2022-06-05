<div align="center">
<img src="https://telegra.ph/file/3516d26e40789fb12827e.jpg" width="150" height="150" border="0" alt="PFP">

# Alice_bot - Multi Devices

### [![JavaScript](https://img.shields.io/badge/JavaScript-d6cc0f?style=for-the-badge&logo=javascript&logoColor=white)](https://javascript.com) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

### Atenção 
Esse bot foi feito com base no <a href="https://github.com/FaizBastomi/wbot">Kaguya PublicBot - MD</a> criado por <a href="https://github.com/FaizBastomi">FaizBastomi</a>,   todos os créditos à ele.
<hr>
</div><br />
<br />

### Configurações iniciais
Altere o que for necessário no arquivo `./config.json`   <br />
```ts
{
    "botName": "Alice",			//Nome do bot
    "owner": [					//Seu número e/ou o do seu amigo
        "Your_Phonenumber@s.whatsapp.net",
        "another_one@s.whatsapp.net"
    ],
    "openWeather": "OpenWeather_APIkey",	// OpenWeather API
    "igCookie": "Instagram_Cookie",		// Instagram Cookie
    "session": "session-md.json",		//Nome do arquivo de sessão
    "user_db": "users-db.json",			// Nome do arquivo de usuários
    "chat_store": "baileys-store.json",		// Chat Store
    "timezone": "Asia/Jakarta",			// Seu fuso-horário
    "footer": "Kaguya PublicBot • FaizBastomi",	// Rodapé de algumas mensagens
    "tier": {					// Premium Tier
        "drakath": 200,
        "nulgath": 500,
        "artix": 999
    }
}
```
- Número de telefone
Use um número internacional e adicione  _@s.whatsapp.net_ no fim. (ex: `6282122232224@s.whatsapp.net`)

Pegue a API do OpenWeatherMap aqui: [openweathermap.org](https://openweathermap.org).

### Criação de comandos
- Entre na pasta `./command`
- Em seguida escolha uma cateoria para seu comando (ex: `./command/general`)
- Então crie um arquivo `.js` com o nome do seu comando.  (ex: `./command/general/menulegal.js`)
- Ao criar o arquivo, use o seguinte código/template para criar o seu comando (é simples, juro!)

```ts
modules. exports = {
	"name": string, //nome do comando (e como você quer que ele seja chamado. ex: /menulegal)
	"desc": string, //descrição
	"use": string, //uso
	"alias": string['alternativa1', 'alternativa2'], //alternativas ao comando. ex: /menutop ou /menumassa
	"cooldown": number, //tempo de cooldown
	"limit": boolean, //true ou false caso esse comando use o ou não (respectivamente) "crédito" de uso do bot.
	"consume": number, //quantidade de cŕeditos que o comando vai usar.
	"premium": boolean, // true ou false caso o comando seja usado somente ṕor usuários premium
	"premiumType": string[], //tipo de usuário premium
	"owner": boolean, //true ou false caso o comando só possa ser usado pelo dono
	async exec({ msg, sock, args, arg, isOwner }) {
			//escreva seu código aqui :)
	}
}
```
- exemplo
```ts
modules. exports =  {
	"name": "igdl",
	"desc": "Instagram Downloader",
	"use": "<link>",
	"alias": ["instagramdl"],
	"cooldown": 3,
	"limit": true,
	"consume": 2,
	"premium": true,
	"premiumType": ["drakath", "nulgath", "artix"],
	"owner": false,
	async exec({ msg, sock, args, arg, isOwner }) { 
	
	}
}
``` 
</br>

## Instalação inicial
### Dependências principais
1. [nodejs](https://nodejs.org/en/download) 16x/17x
2. [ffmpeg](https://ffmpeg.org)
3. [libwebp](https://developers.google.com/speed/webp/download)

### Instalação do ffmpeg
- Se você usa windows, veja como instala por aqui [WikiHow](https://www.wikihow.com/Install-FFmpeg-on-Windows).<br />
- Para usuários Linux você pode instalar através do seu gerenciador de pacotes

```bash
# apt
sudo apt install ffmpeg -y

# pacman
sudo pacman -S ffmpeg

# termux
pkg install ffmpeg -y
```

### Instalação do libWebP
- Para usuários windows: 
1. Baixe o libwebp para Windows. [download](https://developers.google.com/speed/webp/download).
2. Extrraia para o seu disco C:\
3. Renomeie a pasta extraída para `libwebp`
4. abra o powershell e use:
```cmd
setx /m PATH "C:\libwebp\bin;%PATH%"
```
> execute isso no CMD para saber se o libwebp foi instalado corretamente:
```cmd
webpmux -version
```

- Para usuários linux, pasta usar o gerenciador de pacotes da sua distro: 

```bash
# apt
sudo apt install libwebp-dev -y

# pacman
sudo pacman -S libwebp

# termux
pkg install libwebp
```

### Instalação final
```bash
# Clone esse repositório
git clone https://github.com/murillomonte/alice-wabotmd

# entre no diretório
cd wbot

# instale as todas as dependências do npm
npm install
```

### Inicie o bot
Inicie e scaneie o qr-code
```
npm run start

# ou

node ./lib/connect.js
```

## Agradecimentos
- <a href="https://github.com/FaizBastomi">FaizBastomi</a> pela base
- <a href="https://github.com/adiwajshing/Baileys">adiwajshing/Baileys</a> pela API baileys
