const tresenraya = require("tresenraya");

const usuario = message.mentions.users.first();
if (!usuario) return message.channel.send("Menciona a alguien");

const partida = new tresenraya.partida({
  jugadores: [message.author.id, usuario.id]
});

partida.on("ganador", (jugador, tablero, paso) => {
  // cuando encuentra a algún ganador se emite el evento 'ganador'

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(`🎲 Juego TicTacToe (GANASTE) 🎲`)
      .setDescription(
        "¡Ha ganado " +
          client.users.get(jugador).username +
          " en esta partida! Después de `" +
          paso +
          " pasos.`\n\n" +
          tablero.string +
          "\n\nLo siento, " +
          client.users.cache.get(partida.perdedor).username +
          "... 😦"
      )
  );
});

partida.on("empate", (jugadores, tablero, paso) => {
  // si se produce un empate se emite el evento 'empate'

  message.channel.send(
    "¡Ha habido un empate entre " +
      jugadores.map(x => client.users.get(x).username).join(" y ") +
      "!"
  );
});

message.channel.send(
  "Empieza " +
    client.users.get(partida.turno.jugador).username +
    ", elige un número del 1 al 9 [`" +
    partida.turno.ficha +
    "`]\n\n" +
    partida.tablero.string
);

const colector = message.channel.createMessageCollector(
  msg =>
    msg.author.id === partida.turno.jugador &&
    !isNaN(msg.content) &&
    (Number(msg.content) >= 1 && Number(msg.content) <= 9) &&
    partida.disponible(msg.content) &&
    !partida.finalizado
);

colector.on("collect", msg => {
  partida.elegir(msg.content); // elegir la posición dependiendo del contenido del mensaje recolectado

  if (partida.finalizado) {
    colector.stop();
    return;
  } // si la partida ya ha finalizado (ya sea por que alguien ha ganado o ha habido un empate), para el colector y retorna nada

  message.channel.send(
    "Turno de " +
      client.users.get(partida.turno.jugador).username +
      " [`" +
      partida.turno.ficha +
      "`]\n\n" +
      partida.tablero.string
  );
});
