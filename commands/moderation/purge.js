const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { authorIsModerator } = require('../../helpers');

module.exports = {
    name: "purge",
    category: "moderation",
    description: "Purges n messages from active channel. (Can not be older than 15 days)",
    usage: `**Requires Elevated Access**\`\`\`purge <number of messages>\`\`\``,
    run: async(client, message, args) => {
        if (authorIsModerator(message)){
            const channel = message.channel;
            const user = message.mentions.users.first();
            const amount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
            console.log(user + "\n" + amount);
            channel.bulkDelete(amount+1, true)
            .then(messages => {
                const embed = new MessageEmbed()
                .setColor("#001a00")
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL)
                .setAuthor("def not Rez in disguise")
                .setDescription(stripIndents`**Purged:** ${amount} messages.`);
                channel.send(embed).then(m => m.delete({ timeout: 5000 }));
                console.log(`Bulk deleted ${messages.size} messages`)
            })
            .catch(console.error);
        } else {
            message.reply("Unauthorized! Find you and feed you cookies with water I must.");
        }
    }
}