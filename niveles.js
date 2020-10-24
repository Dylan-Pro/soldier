const Discord = require("discord.js");
const db = require("megadb");
let levels_db = new db.crearDB("niveles");
const dinero = new db.crearDB("Dinero");
const level = new db.crearDB("CanalNiveles");
module.exports = {
  nivelesFunc: async message => {
    if (!levels_db.tiene(message.guild.id))
      levels_db.establecer(message.guild.id, {});
    if (!levels_db.tiene(`${message.guild.id}.${message.author.id}`))
      levels_db.establecer(`${message.guild.id}.${message.author.id}`, {
        xp: 0,
        nivel: 1
      });
    let { xp, nivel } = await levels_db.obtener(
      `${message.guild.id}.${message.author.id}`
    );
    let randomxp = Math.floor(Math.random() * 4) + 1;
    let levelup = 5 * nivel ** 2 + 50 * nivel + 100;

    Math.floor(Math.random() * (1001 - 100)) + 100;
    let rdm = Math.floor(Math.random() * (1001 - 100)) + 100;


    if (xp + randomxp >= levelup) {
      levels_db.establecer(`${message.guild.id}.${message.author.id}`, {
        xp: 0,
        nivel: parseInt(nivel + 1)
      });

    message.channel.send(
          `🟢 **Felicidades**, ${
            message.member
          }, **Subiste al nivel:** ${parseInt(nivel + 1)} 🟢`
        )
        .then(m => m.delete(6000));
      dinero.sumar(`${message.guild.id}.${message.author.id}`, rdm);
    } else {
      levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp);
      console.log(`${message.author.tag}, ganaste: ${randomxp}`);
      return;
    }
  },
  getRank: (users, message) => {
    let userlist = [];

    for (var key in users) {
      let usuario = message.guild.members.has(key)
        ? message.guild.members.get(key).user.tag
        : `Salio del server (${key})`;
      userlist.push([usuario, users[key].nivel, users[key].xp]);
    }

    userlist.sort((user1, user2) => {
      return user2[1] - user1[1] || user2[2] - user1[2];
    });
    return userlist;
  }
};
