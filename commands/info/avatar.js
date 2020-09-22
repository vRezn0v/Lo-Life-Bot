const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    category: 'info',
    usage: `\`\`\`avatar <@user?>\`\`\``,
    run: async (client, message, args) => {
        var target = message.mentions.members.first() || message.author;
        console.log(target);
        const embed = new MessageEmbed()
                        .setTitle(target.username + "\'s Avatar")
                        .setDescription(`[Download](${target.avatarURL({ format: 'png', dynamic: true, size: 1024 })})`)
                        .setImage(target.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
        return message.channel.send(embed);
    }
}