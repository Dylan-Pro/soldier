exports.run = async (client, msg, args) => {
  const moment = require("moment");
  const Discord = require("discord.js");
  const filterLevels = {
    DISABLED: "Off",
    MEMBERS_WITHOUT_ROLES: "No Role",
    ALL_MEMBERS: "Everyone"
  };
  let verifLevels = ["Ningúno", "Bajo", "Medio", "Alto", "Muy Protegido"] // Etos son los niveles de verificaciÃ³n del servidor

  const embed = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setThumbnail(msg.guild.iconURL)
    .addField("❯ Nombre:", msg.guild.name, true)
    .addField("❯ ID:", msg.guild.id, true)
    .addField(
      "❯ Fecha Creacion:",
      moment.utc(msg.guild.createdAt).format("MM/DD/YYYY h:mm A"),
      true
    )
    .addField("❯ Dueño:", msg.guild.owner.user.tag, false)
    .addField("❯ Contador Boost:", msg.guild.premiumSubscriptionCount || 0, true)
    .addField(
      "❯ Nivel Boost:",
      msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : "None",
      true
    )
    .addField("❯ Region", msg.guild.region.toUpperCase(), true)
    .addField(
      "❯ Filtros Explicitos",
      filterLevels[msg.guild.explicitContentFilter],
      false
    )
    .addField(
      "❯ Nivel Verificacion",
      msg.guild.verificationLevel,
      true
    )
    .addField("❯ Miembros", msg.guild.memberCount, true)
    .addField("❯ Roles", msg.guild.roles.size, true)
    .addField(
      "❯ Canales",
      msg.guild.channels.filter(channel => channel.type !== "category").size
    );
 return msg.channel.send(embed);
};
