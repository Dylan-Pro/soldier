exports.run = (client, message, args) => {
    let Discord = require("discord.js")
    const embed = new Discord.RichEmbed()
    .setAuthor(`💰 Apoya a Slay Economic a crecer 💰`)
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL)
    .setDescription("📌 Puedes ayudar con una donacion para que Slay Economic traiga mejores funciones y que podamos hacer mas cosas [Link Donacion](https://paypal.me/Xeantrix?locale.x=es_XC) \n\n⚠️ **ATENCION:** `el dinero que usted donara sera usado para el host del bot y para mejorar el rendimiento de todo Slay Economic`")
    message.channel.send(embed)
    }