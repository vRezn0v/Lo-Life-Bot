const {getMember, formatDate } = require("../../helpers.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: 'userinfo',
    aliases: ["whois","who","user"],
    category: "info",
    description: 'Info for tagged user, duh!',
    usage: "[username | id, |mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const role = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("Member Information", stripIndents`**Display Name:** ${member.displayName}
            **Joined at:** ${joined}
            **Roles:** ${role}`, true)

            .addField("User Information", stripIndents`**ID:** ${member.user.id}
            **Username:** ${member.user.username}
            **Tag:** ${member.user.tag}
            **Created at:** ${created}`, true)

            .setTimestamp()

            if (member.user.presence.game)
                embed.addField('Currently Playing', `${member.user.presence.game.name}`);

            message.channel.send(embed);
    }
}