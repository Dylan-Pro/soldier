exports.run = async (client, message, args) => {
  const category = "category-id";
  let mtickets = true;
  let tchannels = [];
  let current = 0;
  let Discord = require("discord.js");
  const db = require("megadb");
  const prefix_db = new db.crearDB("prefixes");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }

  if (!args[0])
    return message.channel.send(
      "Usa para ver los comandos del los tickets: **" + `${prefix}ticket help` + "**"
    ); 
  
if(args[0] === "crear"){
  if (mtickets === false)
    return message.channel.send(
      `**Los boletos fueron suspendidos por cualquier administración**`
    );
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(`**NO Tienes permisos**`);
  console.log(current);
  let openReason = "";
  current++;
  message.guild.createChannel(`ticket-${current}`, "text").then(c => {
    tchannels.push(c.id);
    c.setParent(category);
    message.channel.send(`Su boleto ha sido abierto`);
    c.overwritePermissions(message.guild.id, {
      READ_MESSAGES: false,
      SEND_MESSAGES: false
    });
    c.overwritePermissions(message.author.id, {
      READ_MESSAGES: true,
      SEND_MESSAGES: true
    });

    if (args[1]) openReason = `Razon: [ **__${args.slice(1).join(" ")}__** ]`;
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setThumbnail(message.author.displayAvatarURL)
      .setColor("#36393e")
      .setDescription(
        "**Espera a un staff para que te ayude **\n" + openReason
      );
    c.send(`${message.author} Bienvenido a tu ticket`);
    c.send(embed);
  });
}
  if(args[0] === "mtickets"){
      if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send("No tienes permisos");
    if (args[1] && args[1].toLowerCase() === "enable") {
      mtickets = true;
      message.channel.send(`** El sistema de tickets se activó **`);
    } else if (args[1] && args[1].toLowerCase() === "disable") {
      mtickets = false;
      message.channel.send(`**El sistema de ticket se desactivo`);
    } else if (!args[1]) {
      if (mtickets === true) {
        mtickets = false;
        message.channel.send(`**Sistema de tickets cerrado**`);
      } else if (mtickets === false) {
        mtickets = true;
        message.channel.send(`**Sistema de tickets abierto**`);
      }
    }
  }
  if(args[0] === "cerrar"){
     if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(`No tienes permisos`);
    if (
      !message.channel.name.startsWith("ticket-") &&
      !tchannels.includes(message.channel.id)
    )
      return message.channel.send(`** Esto no es un boleto **`);

    message.channel.send(
      `** La TICKET se bloquea automáticamente después de 5 segundos **`
    );
    tchannels.splice(tchannels.indexOf(message.channel.id), 1);
    setTimeout(() => message.channel.delete(), 5000);
  }
  if(args[0] === "remover"){
     if (!message.channel.name.startsWith("ticket-")) {
      return message.channel.send(`**este comando solo para los tickets**`);
    }
    let member = message.mentions.users.first();
    if (!member || member.id === client.user.id) {
      return message.channel.send(`**Porfavor menciona un usuario**`);
    }
    if (
      !message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    ) {
      return message.channel.send(
        `**${member.user.tag}** No está en este ticket para eliminarlos.`
      );
    }
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    });
    message.channel.send(
      `**Hecho \nAutenticado, Fue removido ${member} del ticket**`
    );
  }
  if(args[0] === "añadir"){
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(`**Error** No tienes permisos`);
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send(`**Este comando solo para los tickets**`);
    let member = message.mentions.users.first();
    if (!member)
      return message.channel.send(`**Porfavor menciona un miembro**`);
    if (
      message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )
      return message.channel.send(
        `Este miembro ya esta en el ticket :rolling_eyes:`
      );
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    });
    message.channel.send(
      `**Hecho \nAutenticado, ha sido añadido ${member} al ticket**`
    );
  }
  if(args[0] === "help"){
     message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(`Lista Comandos`)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor("RANDOM")
        .addField(prefix+"ticket crear", "Abre ticket", true)
        .addField(prefix+"ticket cerrar", "Cierra ticket", true)
        .addField(prefix+"ticket mtickets", "Desactiva los ticket `PARA DEVS`", true)
        .addField(prefix+"ticket añadir", "Añade un usuario al ticket", true)
        .addField(prefix+"ticket remover", "Elimina un usuario del ticket", true)
    );
  }
};
