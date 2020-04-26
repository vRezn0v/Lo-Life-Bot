const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const { reportchannel } = require("../../server.json");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention | id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        let target = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!target)
            return message.channel.send("Person not found, please use a proper mention.").then(m => m.delete(5000));
        if (target.permissions.has("BAN_MEMBERS") || target.user.bot)
            return message.channel.send("Unable to report, contact server staff please.").then(m => m.delete(5000));

        if(!args[1])
            return message.reply("A reason is required to report.").then(m => m.delete(5000));

        const channel = message.guild.channels.find(c => c.name === "reports");
        console.log(reportchannel);
        console.log(channel);
        if (!channel)
            return message.channel.send("Couldn't find set report channel.");

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", target.user.displayAvatarURL)
            .setDescription(stripIndents`**Member:** ${target} (${target.user.id})
            **Reported by:** ${message.member}
            **Reported in:** ${message.channel}
            **Reason:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
    }
}