exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
  
  const embed = new Discord.RichEmbed()
  .setAuthor(`Ultima Actualizacion 09/07/2020`)
  .setDescription("Aqui veran actualizaciones del bot para estar informados acerca de todoo")
    .addField("Matrimonio:", "`Hemos actualizado los comandos marry y divorce , ahora si te casas con alguien y otra persona habla , no afectara el proceso actual , pasa lo mismo con el divorce`")
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
  message.channel.send(embed)
}
