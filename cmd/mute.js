const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  var perms = message.member.hasPermission("MANAGE_MESSAGES");
  const embed1 = new Discord.RichEmbed().setAuthor(
    "❌ No tienes permisos de `Gestionar Mensajes`."
  );
  if (!perms) return message.channel.send(embed1).catch(console.error); //PERMISO
  let user = message.mentions.members.first();
  const embed2 = new Discord.RichEmbed()
    .setAuthor("🔗 Debes mencionar un usuario")
    .setColor("RED");
  if (message.mentions.users.size < 1)
    return message.channel.send(embed2).catch(console.error);
  let razon = args.slice(1).join(" ");
  const embed3 = new Discord.RichEmbed()
    .setAuthor("❌ Debes especificar una razon.")
    .setColor("RED");
  if (!razon) return message.channel.send(embed3);
  let role = message.guild.roles.find(r => r.name === "Muteado");
  if (!role) {
    message.channel.send(
      "❌ **Role No Encontrado,** `Por Favor Espere Se Esta Creando` :notes:"
    );
    try {
      role = await message.guild.createRole({
        name: "Muteado",
        color: "#F4370F",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  if (!role)
    return message.reply("❌ El role `Muteado` no existe en el servidor");
  user.addRole(role);
  const embed4 = new Discord.RichEmbed()
    .setAuthor("Informacion del proceso muteado")
    .setThumbnail(user.displayAvatarURL)
    .addField("🔈| Muteado:", "" + user + "")
    .addField("🆔| ID Muteado", `${user.id}`)
    .addField("📌| Razón: ", `${razon ? razon : "Ninguna."}`)
    .addField("🚨| Admin:", `${message.author.tag}`);
  message.channel.send(embed4);

  let Embed2 = new Discord.RichEmbed()
    .setThumbnail(user.avatarURL)
    .setTitle(":mute: ¡Has sido muteado! :mute:")
    .setDescription(
      "Has recibido un muteo proveniente de** " + message.guild.name
    )
    .setColor("RED")
    .addField("🚨| Admin:", `${message.author.tag}`)
    .addField("Motivo:", `${razon ? razon : "Ninguna."}`)
    .setTimestamp();
  client.users.get(user).send(Embed2)
};
