const db = require("megadb");
const desc = new db.crearDB("notas");
exports.run = async (client, message, args, color, prefix) => {

  const regex = /(https\:\/\/)?(www\.)?(discord(\.|dot|\(dot\))(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi.test(message.content);

  var toNote = args.join(" ");
  if (!toNote)
    return message.channel.send(
      "❌ Debe especificar una descripcion"
    );

  if (regex) {
    message.channel.send("☑️ Tu descripcion ha sido **cambiada** con exito");
    desc.establecer(
      `${message.guild.id}.${message.author.id}`,
      "Estan prohibidas las invitaciones"
    );
  } else {
    message.channel.send("☑️ Tu descripcion ha sido **cambiada** con exito");
    desc.establecer(`${message.guild.id}.${message.author.id}`, toNote);
  }
};
