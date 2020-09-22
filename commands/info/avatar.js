const { MessageEmbed } = require('discord.js');
const { getMember } = require('../../helpers.js');

module.exports = {
    name: 'avatar',
    category: 'info',
    usage: `\`\`\`avatar <@user?>\`\`\``,
    run: async (client, message, args) => {
        var target = message.mentions.mentions.first() || message.author;
        const embed = new MessageEmbed()
                        .setTitle(target.displayName + "\'s Avatar")
                        .setDescription(`Link: ${target.member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
                        .setImage(target.avatarURL);
        return message.channel.send(embed);
    }
}