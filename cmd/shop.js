const Discord = require("discord.js");
const db = require("megadb");

const dinero = new db.crearDB("Dinero");
const banco = new db.crearDB("Banco");
exports.run = async (client, message, args) => {
  const prefix_db = new db.crearDB("prefixes");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }

  let bot = client.user.username;
  let botavatar = client.user.avatarURL;
  //let user =
  //message.mentions.members.first() ||
  //client.users.get(args[0]) ||
  //message.author;

  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed()

        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Usa " + prefix + "buy [objeto] para comprar")
        .setThumbnail(
          "https://images.emojiterra.com/google/android-10/128px/1f3ea.png"
        )
        .setAuthor(bot + " ┊ Tienda", botavatar)
        .setDescription(
          "**Para comprar las medallas debes tener tu money en:** `Dinero`"
        )
        .addField(
          "🏅 Medallas:",
          "**[1]** 🛠️(Tecnico) **[1,500]** \n **[2]** ⚽(Football) **[5,000]** \n **[3]** 🏀(Basket) **[10,000]** \n **[4]** 🔰(Programador) **(25,000)** \n **[5]** 🧭(Relojero) **[35,000]** \n **[6]** 💉(Medico) **[45.000]**",
          true
        )
        .addField("🛍️ Tienda OP:", "`" + prefix + "shop op`")
    );
  if (args[0] === "op") {
    const embed1 = new Discord.RichEmbed()

        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Usa " + prefix + "buyop [objeto] para comprar")
        .setThumbnail(
          "https://images.emojiterra.com/google/android-10/128px/1f3ea.png"
        )
        .setAuthor(bot + " ┊ Tienda OP", botavatar)
        .setDescription(
          "**Para comprar las medallas OP debes tener tu money en:** `Dinero`"
        )
        .addField("🎖️ Medallas OP:", `**[1]** <a:verify:729689385037070338>(Verificado) **[10,000]** \n **[2]** <a:mine:729695611644805211>(Minecraft) **[15,000]** \n **[3]** <a:boost:729696841410543636>(Booster) **[20,000]** \n **[4]** <a:wumpus:731353206780592150>(Wumpus) **[25,000]**`)
        .addField("🛍️ Tienda Normal:", "`" + prefix + "shop`")
    message.channel.send(embed1)
  }
};
