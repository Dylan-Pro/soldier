exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  const db = require("megadb");
  const prefix_db = new db.crearDB("prefixes");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }

  const embed = new Discord.RichEmbed()
    .setAuthor(`💡 Panel Ayuda Economia`, client.user.displayAvatarURL)
    .setDescription(
      "📚 Nuevo Bot, estoy en **" +
        client.guilds.size +
        "** Servidores, Soy un bot de economia super configurado y con las funciones necesarias \n**Comandos que tengan `(VIP)` solo los usuarios que tengan vip los pueden usar**"
    )
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL)
    .addField(
      "📌 **Caracteristicas:**",
      "**Dueño:** <@!692363394719809577> \n**Discord.js:** `v11.6.4` \n**Node.js:** `v12.x`"
    )
    .addField("📜 **Lista Comandos:**", "`" + `${prefix}comandos` + "`")
    .addField("👑 **Beneficios VIP:**", "`" + `${prefix}vip` + "`")
    .addField("📡 **Actualizaciones:**", "`" + `${prefix}updates` + "`")
    .addField("🔨 **Prefix:**", "`" + prefix + "`")
    .addField(
      "🔗 **Enlaces Bot:**",
      "[Invitame](https://discord.com/api/oauth2/authorize?client_id=727248227971104829&permissions=8&scope=bot) **|** [Wolf Security](https://discord.com/oauth2/authorize?client_id=692364407400955935&permissions=403712126&scope=bot)"
    );
  message.channel.send(embed);
};
