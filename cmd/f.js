const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  var emoji = client.emojis.get("728086134638379040");
  let msg = await message.channel.send(
    "❌**Presiona <:fm:728086134638379040> para mostrar respetos.**"
  );
  msg.react(emoji);
  let a = 0;

  let reaccion = new Set();

  msg
    .awaitReactions(
      (reaction, user) => {
        if (user.bot) return;

        if (emoji === reaction.emoji) {
          if (reaccion.has(user.id)) {
            return;
          }

          reaccion.add(user.id);
          message.channel.send(` **${user.username}** ha dado sus respetos. `);
          a++;

          setTimeout(() => {
            reaccion.delete(user.id);
          }, 12000);
        }
      },
      { max: 1, time: 10000 }
    )
    .then(c => {
      if (a === 0) {
        message.channel.send(
          "Absolutamente nadie quiso dar sus respetos a **" +
            message.author.username +
            "**"
        );
      } else if (a === 1) {
        message.channel.send(
          "Al final solo una persona dio sus respetos a **" +
            message.author.username +
            "**"
        );
      } else {
        message.channel.send(
          "Al final " +
            a +
            " personas dieron sus respetos a **" +
            message.author.username +
            "**"
        );
      }
    });
};
