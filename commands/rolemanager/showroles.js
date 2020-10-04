const { MessageEmbed } = require('discord.js');
const { getMember } = require('../../helpers');

module.exports = {
    name: 'showroles',
    category: 'rolemanager',
    run: async (client, message, args) => {
        const roles = new Map();
        let target, title, thumbnail;
        if (args.length===0||args[0]=='all') {
            message.guild.roles.cache.forEach(e => roles.set(e.name, e.id)) || "none";
            title = "Role List";
            thumbnail = message.guild.iconURL();
        } else {
            target = getMember(message);
            target.roles.cache.forEach(e => roles.set(e.name, e.id)) || "none";
            title = "Roles for " + target.displayName;
            thumbnail = target.user.avatarURL();
        }
        let lsr = [];
        for (let [key, value] of roles.entries()) {
            lsr.push("**"+key+"**\t");
            lsr.push("\`\`\`");
            lsr.push(value);
            lsr.push("\`\`\`\n");
        }
        lsr = lsr.join("");
        const embed = new MessageEmbed()
                            .setTitle(title)
                            .setDescription(lsr)
                            .setColor("#0000FF")
                            .setThumbnail(thumbnail);
        return message.channel.send(embed);
    }
}