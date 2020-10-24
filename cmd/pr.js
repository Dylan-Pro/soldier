exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  let badges = {
    DISCORD_EMPLOYEE: "Empleado Discord",
    DISCORD_PARTNER: "Partner Discord",
    HYPESQUAD_EVENTS: "Eventos HypeSquad",
    BUGHUNTER_LEVEL_1: "Cazador Bugs nivel 1",
    HOUSE_BRAVERY: "Casa Bravery",
    HOUSE_BRILLIANCE: "Casa Brilliance",
    HOUSE_BALANCE: "Casa Balance",
    EARLY_SUPPORTER: "Soporte",
    TEAM_USER: "Usuario Team",
    SYSTEM: "Sistema",
    BUGHUNTER_LEVEL_2: "Cazador Bugs nivel 2",
    VERIFIED_BOT: "Bot Verificado",
    VERIFIED_DEVELOPER: "Developer Verificado"
  };

  let user = message.author;

  const embed = new Discord.RichEmbed().addField(
    "Badges", user.flags.toArray().length > 0 ? user.flags.toArray().map(flag => badges[flag]) : "No tiene badges", true);
  message.channel.send(embed);
};
