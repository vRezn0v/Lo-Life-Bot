const { authorIsModerator, getMember, authorIsAdmin } = require("../../helpers")
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'addrole',
    category: 'moderation',
    usage: `**Requires Elevated Privilege**\`\`\`addrole @user <roleid>\`\`\``,
    run: async (client, message, args) => {
        if (authorIsModerator(message)) {
            let target = getMember(message);
            let role = args[1];
            role = message.guild.roles.cache.get(role);
            if (message.member.roles.highest.position>role.position||authorIsAdmin(message)) {
                target.roles.add(role).catch(console.error);
                const done = new MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle(`:white_check_mark: **Role Granted**`)
                        .setDescription(`\`\`\`Role: ${role.name} granted to ${target.displayName}.\`\`\``)
                        .setFooter(`Amazing Job, ${message.member.displayName}`)
                        .setTimestamp();
                return message.channel.send(done);
            }
            else {
                const permerr = new MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle(`:lock: **Warning!**`)
                        .setDescription('\`\`\`Role you are trying to grant is waaaay above your paygrade :/\`\`\`')
                        .setFooter(`Don't think that you can pull a sneaky on me, ${message.member.displayName}`)
                        .setTimestamp();
                return message.channel.send(permerr);
            }
        } else {
            const warn = new MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle(`:lock: **Warning!**`)
                        .setDescription('\`\`\`You Are Not Authorized For This Action.\`\`\`')
                        .setFooter(`Don't think that you can pull a sneaky on me, ${message.member.displayName}`)
                        .setTimestamp();
            return message.channel.send(warn);
        }
    }
}