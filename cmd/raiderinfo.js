const db = require("megadb");
const Discord = require("discord.js");
const hackers = new db.crearDB("Ids");
exports.run = async (client, message, args) => {
  let estadouser = {
    online: "🟢 En Linea",
    idle: "🟡 Ausente",
    dnd: "🔴 No Molestar",
    offline: "⚫ Desconectado"
  };

  const ids = hackers
    .map(false, v => `${v}`)
    .then(datos => {
      const jajas = datos.join("\n");

      if (!jajas.includes(args[0]))
        return message.channel.send(
          "❌ **Esa id no esta en mi base de datos.**"
        );

      let user = client.fetchUser(args[0]).then(user => {
        let usuario = client.users.get(args[0]);
        let filtro = client.guilds.filter(g => g.members.has(usuario.id));
        let servers = filtro.map(g => "• `" + g.name + "`").join("\n");
        let tamaño = filtro.size;

        let servers2 = servers || "• **Ninguno**";
        const embud = new Discord.RichEmbed()
          .setThumbnail(user.avatarURL)
          .addField("`📟` • **Tag:**", user.tag, true)
          .addField("`🆔` • **Id:**", user.id, true)
          .addField(
            "`🎭` • **Estado:**",
            estadouser[user.presence.status],
            true
          )
          .addField("`📲` • **Cuenta creada:**", user.createdAt.toDateString())
          .addField("`📡` • **Servidores en comun:**", servers2);
        message.channel.send(embud);
        //console.log
      });
    });
};
