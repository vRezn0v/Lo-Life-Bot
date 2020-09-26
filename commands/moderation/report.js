const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const { reportChannel } = require("../../server.json");
const { isAdmin } = require("../../helpers");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "\`\`\`report <mention | id>\`\`\`",
    run: async (client, message, args) => {
        let target = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!target)
            return message.channel.send("Person not found, please use a proper mention.").then(m => m.delete(5000));
        if (isAdmin(target) || target.user.bot) {
            const senate = new MessageEmbed()
                                .setColor("#FC0000")
                                .setTitle('**Error:** Member Can Not Be Reported')
                                .setDescription("\`\`\`Please Contact Server Owner. Member Access Level Too High.\`\`\`")
                                .setTimestamp();
            return message.channel.send(senate);
        }
        if(!args[1])
            return message.reply("A reason is required to report.").then(m => m.delete(5000));

        const channel = message.guild.channels.cache.find(channel => channel.name === reportChannel);

        if (!channel)
            return message.channel.send("**ERROR:** Couldn't find set report channel. Check Server Config.");

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", target.user.displayAvatarURL)
            .setDescription(stripIndents`**Member:** ${target} (${target.user.id})
            **Reported by:** ${message.member}
            **Reported in:** ${message.channel}
            **Reason:** ${args.slice(1).join(" ")}`);
            if (message.deletable) message.delete();
        return channel.send(embed);
    }
}