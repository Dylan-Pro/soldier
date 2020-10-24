const db = require("megadb");
const desc = new db.crearDB("notas");

exports.run = async (client, message, args) => {
  const regex = /(https?:\/\/)?(www\.)?(discord(\.|dot|\(dot\))(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi.test(
    message.content
  );

  var toNote = args.join(" ");
  //if(!toNote) return message.channel.send("❌ Debes colocar algo para subirlo a tu //descripcion");

  if (regex) {
    message.channel.send("☑️ Tu descripcion ha sido **eliminada** con exito");
    desc.delete(
      `${message.guild.id}.${message.author.id}`,
      "Discord invite links."
    );
  } else {
    message.channel.send("☑️ Tu descripcion ha sido **eliminada** con exito");
    desc.delete(`${message.guild.id}.${message.author.id}`, toNote);
  }
};
