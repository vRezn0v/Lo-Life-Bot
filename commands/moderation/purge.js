const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const { isModerator } = require('../../helpers');
module.exports = {
    name: "purge",
    category: "moderation",
    description: "Purges n messages from active channel.",
    usage: "purge <number of messages>",
    run: async(client, message, args) => {
        if (isModerator(message)){
            const user = message.mentions.users.first();
            const amount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
            console.log(user + "\n" + amount);
            message.channel.fetchMessages({
                limit: 100,
               }).then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : Client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount+1);
                } else {
                    messages = messages.array().slice(0, amount+1);
                }
                const embed = new RichEmbed()
                .setColor("#001a00")
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL)
                .setAuthor("def not Rez in disguise")
                .setDescription(stripIndents`**Purged:** ${amount} messages.`);
                const channel = message.channel;
                message.delete();
                channel.bulkDelete(messages).catch(error => console.log(error.stack));
                channel.send(embed).then(m => m.delete(10000));
            });
        } else {
            message.reply("Unauthorized! Find you and feed you cookies with water I must.");
        }
    }
}