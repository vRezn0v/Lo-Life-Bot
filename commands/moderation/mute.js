const { muteRole } = require('../../server.json');
const { authorIsModerator, logEvent, isAdmin } = require('../../helpers');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mute',
    category: 'moderation',
    description: 'Mute the tagged member indefinitely',
    usage: `**Requires Elevated Access**\n\`\`\`mute @user\`\`\``,
    run: async (client, message, args) => {
        if (authorIsModerator(message)){
            let reason='N/A';
            console.log(args[0]);
            let target = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!target){
                return message.reply("Person not found, please use a proper mention.").then(m => m.delete(10000));
            }
            if (isAdmin(target)||target.user.bot){
                const senate = new MessageEmbed()
                                .setColor("#FFFF00")
                                .setTitle('**Error:** User Too Powerful')
                                .setDescription("\`\`\`He is the Senate, RUN!\`\`\`")
                                .setTimestamp();
                return message.channel.send(senate);
            }
            if (args[1]){
                reason = args[1];
            }
            let role;
            message.guild.roles.cache.forEach(element => {
                if (element.name===muteRole) {
                    role = element.id;
                }
            });
            target.roles.add(role).catch(console.error);
            logEvent(message, target, reason, "mute");
        }
        else {
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