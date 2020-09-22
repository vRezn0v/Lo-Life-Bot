const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
    client.user.setActivity("flying into the sun.", { type: "PLAYING"});
    console.log(`MothBot Reporting to Duty Sire!`);
});


client.on('message', msg => {
    console.log(msg.author.username + '@' + msg.channel.name + '>>' + msg.content);
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
	    command.run(client, msg, args);
    } catch (error) {
	    console.error(error);
	    msg.reply('Couldn\'t Execute Command: ' + commandName);
    }
});

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
})

client.login(token);