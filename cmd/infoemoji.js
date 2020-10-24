exports.run = async (client, message, args) => {
  const db = require('megadb')
  let Discord = require("discord.js")
  let user = message.author;
const vips_db = new db.crearDB("vips", "vips")
   const vip = await vips_db.obtener("vips")
  if(vip.includes(user.id) == false) return message.channel.send(
    new Discord.RichEmbed()
.setDescription("❌ No eres VIP y por lo tanto no puedes ejecutar este comando")
.setColor("RED")
)
if (!args[0]) return message.channel.send("❌ Coloca `infoemoji <nombre-emoji>`");
  if(args[0].includes("<:" && ">")) return message.channel.send("❌ Debe colocar el nombre del emoji");
    let emoji =
      client.emojis.get(args[0]) ||
      client.emojis.find(e => e.name === args[0]);
    if (!emoji) {
   
      return message.channel.send("❌ El emoji no existe en el servidor");
    }

    let auth;
    if (
      message.guild.me.hasPermission("MANAGE_EMOJIS") &&
      emoji.guild.id === message.guild.id
    ) {
      auth = await emoji.fetchAuthor();
    } else {
      auth = "❌ No tengo permisos";
    }
    const embed = new Discord.RichEmbed()
      .setAuthor(`📚 Info del emoji `+ emoji.name)
      .setThumbnail(emoji.url)
      .setColor("RANDOM")
      .addField("🆔 **ID:**", emoji.id, true)
      .addField("🔗 **URL:**", `[Click here](${emoji.url})`, true)
      .addField("🛠️ **Uso:**", "`" + emoji.toString() + "`", true)
      .addField("💖 **Animado?:**", emoji.animated ? "Yes" : "No", true)
      .addField("🧼 **Gestionado?:**", emoji.managed ? "Yes" : "No", true)
      .setFooter("📆 Fecha de creación")
      .setTimestamp(emoji.createdAt);
    if (emoji.guild.id === message.guild.id) {
      embed
        .addField("👤 **Autor:**", auth, true)
        .addField(
          "🔋 **Roles que pueden usar el emoji:**",
          emoji.roles.first()
            ? emoji.roles.map(e => `${e}`).join(", ")
            : "@everyone"
        );
    }

    message.channel.send(embed);
}