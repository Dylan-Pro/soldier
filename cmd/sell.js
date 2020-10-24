const Discord = require("discord.js");
const db = require("megadb");
exports.run = async (client, message, args) => {
  const dinero = new db.crearDB("Dinero");
  const inventario = new db.crearDB("inventarios");
  const userbalance = await dinero.obtener(`${message.guild.id}.${message.author.id}`);
  const userinventario = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
  let bot = client.user.username;
  const prefix_db = new db.crearDB("prefixes");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }

  const embed = new Discord.RichEmbed()

    .setAuthor(bot + " ┊ Sell", client.user.avatarURL)
    .setDescription("Ejemplo: `" + prefix + "sell` [objeto]")
    .setColor("RANDOM")
    .setThumbnail(
      "https://lh3.googleusercontent.com/proxy/ZvTO67F4dYfiu5wh5CQQghUpxyWt9zoUF7to7qfiwltHEKIOyTJgOHjOgNT6UwmFK3pjYY16rYUyx_sLXm-Y7G2Rd8PISgr3KhBBlaVI5It5JME2tHnnvloyMlPp5mbu06GxXbSn7Zuhfo2GXJUw-DI1"
    )
    .setFooter(
      "Si no sabes el nombre de lo que has comprado usa " + prefix + "shop"
    )
    .setTimestamp();
  if (!args[0]) {
    message.channel.send(embed);
  } else if (args[0].toLowerCase() == "football") {
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
    if (!userinventarioxd.includes("⚽"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has vendido la medalla **Football** ⚽")
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 5000);
    inventario.extract(`${message.guild.id}.${message.author.id}`, "⚽");
  } else if (args[0].toLowerCase() == "basket") {
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
    if (!userinventarioxd.includes("🏀"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has vendido la medalla **Basket** 🏀")
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 10000);
    inventario.extract(`${message.guild.id}.${message.author.id}`, "🏀");
  } else if (args[0].toLowerCase() == "programador") {
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
    if (!userinventarioxd.includes("🔰"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has vendido la medalla **Programador** 🔰")
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 25000);
    inventario.extract(`${message.guild.id}.${message.author.id}`, "🔰");
    } else if (args[0].toLowerCase() == "tecnico") {
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
    if (!userinventarioxd.includes("🛠️"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has vendido la medalla **Tecnico** 🛠️")
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 1500);
    inventario.extract(`${message.guild.id}.${message.author.id}`, "🛠️");
    } else if (args[0].toLowerCase() == "programador") {
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
    if (!userinventarioxd.includes("🔰"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has vendido la medalla **Programador** 🔰")
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 25000);
    inventario.extract(`${message.guild.id}.${message.author.id}`, "🔰");
    } else if (args[0].toLowerCase() == "relojero") {
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
    if (!userinventarioxd.includes("🧭"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has vendido la medalla **Relojero** 🧭")
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 35000);
    inventario.extract(`${message.guild.id}.${message.author.id}`, "🧭");
     } else if (args[0].toLowerCase() == "medico") {
    const userinventarioxd = await inventario.obtener(`${message.guild.id}.${message.author.id}`)
    if (!userinventarioxd.includes("💉"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has vendido la medalla **Medico** 💉")
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 45000);
    inventario.extract(`${message.guild.id}.${message.author.id}`, "💉");
  } else if (args[0]) {
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Esa medalla no existe")
        .setColor("RED")
    );
  }
};
