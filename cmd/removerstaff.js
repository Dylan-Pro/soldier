exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  const devs_db = new db.crearDB("devs", "devs");
  let staff = await devs_db.obtener("devs");
  if (!staff.includes(message.author.id))
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ No tienes permisos para usar este comando.")
        .setColor("RED")
    );

  let user = message.mentions.users.first() || client.users.get[0] || args[0];

  if (!user)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ No has mencionado a nadie.")
        .setColor("RED")
    );
  if (!devs_db.tiene("devs")) {
    devs_db.establecer("devs", []);
  }

  if (!devs_db.tiene("devs")) {
    devs_db.establecer("devs", []);
  }

  const vip = await devs_db.obtener("devs");
  if (vip.includes(user.id) == false)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Este usuario no es STAFF")
        .setColor("RED")
    );

  // if(devs_db.tiene("devs".user.id))

  await devs_db.extract("devs", "**" + user.tag + "**");
  await devs_db.extract("devs", user.id);
  message.channel.send(
    new Discord.RichEmbed()
      .setDescription("☑️ Usuario establecido eliminado como STAFF del bot.")
      .setColor("GREEN")
  );
};
