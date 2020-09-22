const {getMember, formatDate, isVoteEligible } = require("../../helpers.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: 'userinfo',
    aliases: ["whois","who","user"],
    category: "info",
    description: 'Info for tagged user, duh!',
    usage: "userinfo <@user?>",
    run: async (client, message, args) => {
        const target = getMember(message);
        const joined = formatDate(target.joinedTimeStamp);
        const created = formatDate(target.user.createdAt);
        //const role = target.guild.roles;
        //console.log(target.guild.roles);
        var roles = [];
        const role = target.roles.cache.forEach(e => roles.push(e)) || "none";
        roles = roles.join(', ');
        //isVoteEligible(message, '284153835591696385');
        const embed = new MessageEmbed()
            .setFooter(target.displayName, target.displayAvatarURL)
            .setImage(target.user.displayAvatarURL)
            .setColor(target.displayHexColor === "#000000" ? "#ffffff" : target.displayHexColor)
            .addField("Member Information", stripIndents`**Display Name:** ${target.displayName}
            **Joined at:** ${joined}`, true)

            .addField("User Information", stripIndents`**ID:** ${target.id}
            **Username:** ${target.user.username}
            **Tag:** ${target.user.tag}
            **Created at:** ${created}
            **Roles:** ${roles}`, true)
            .setTimestamp()
        message.channel.send(embed);
    }
}