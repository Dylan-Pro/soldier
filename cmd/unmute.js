exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      "❌ No tienes permisos de `Gestionar Mensajes`"
    );
  let user = message.mentions.members.first() || message.author;
  let role = message.guild.roles.find(r => r.name === "Muteado");
  if (message.mentions.users.size < 1)
    return message.channel.send("❌ Menciona un usuario que este muteado");
  user.removeRole(role);
  message.channel.send("☑️ El usuario "+user+" Fue Desmuteado correctamente");
};
