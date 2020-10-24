const weather = require("weather-js");
const Discord = require("discord.js");
exports.run = async (client, message, args, discord) => {
  weather.find({ search: args.join(" "), degreeType: "C" }, function(
    err,
    result
  ) {
    if (args.length < 1) return message.reply("❌ Debes especificar un pais");

    var current = result[0].current;
    var location = result[0].location;

    let embed = new Discord.RichEmbed()

      .setDescription("`" + current.skytext + "`")
      .setAuthor(`☁️ Clima ☁️`)
      .setThumbnail(current.imageUrl)
      .setColor("18CBDA")
      .addField("⏰ » Zona Horaria", `GMT${location.timezone}`)
      .addField("🏳️ » País", current.observationpoint)
      .addField(
        "🌡️ » Temperatura",
        `${current.temperature}º ${location.degreetype}`
      )
      .addField("🍃 » Viento", current.windspeed)
      .addField("💦 » Humedad", `${current.humidity}%`)
      .addField("📅 » Fecha", current.day + " " + current.date)
      .setTimestamp();

    message.reply(embed);
  });
};
