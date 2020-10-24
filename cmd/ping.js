  exports.run = (client, message, args) => {
    let Discord = require("discord.js")
    let ping = Math.floor(message.client.ping);
  const pong = new Discord.RichEmbed()
    .setDescription("❌ >> | Verificando el ping...")
    .setColor("RANDOM");
  message.channel.send(pong).then(async m => {
    setTimeout(() => {
      const embed = new Discord.RichEmbed()
        .setAuthor(`Ping Actual`)
        .setThumbnail("https://images-ext-2.discordapp.net/external/xT8nebezJ56Inc8mSyB4mO7PLoLvVdt1oWxLp2TZ6lE/%3F1549030701578/https/cdn.glitch.com/ebee88b1-475e-4ce7-87e3-6f8d8f4eb310%252F532179282936725504.gif")
        .setDescription(
          ":incoming_envelope:  Ping mensajes : `" +
            ping +
            " ms.`\n :satellite_orbital: Ping DiscordAPI : `" +
            ping +
            " ms`"
        )
        .setColor("RANDOM");
      m.edit(embed);
    }, 4000);
  });
  }