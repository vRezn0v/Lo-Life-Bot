const { muteRole } = require('../../server.json');
const { logEvent, authorIsModerator } = require('../../helpers');

module.exports = {
    name: 'unmute',
    category: 'moderation',
    description: 'Unmute the tagged member',
    usage: `**Requires Elevated Access**\n\`\`\`unmute @user\`\`\``,
    run: async (client, message, args) => {
        if (authorIsModerator(message)){
            let reason='N/A';
            console.log(args[0]);
            let target = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!target){
                return message.reply("User not found, please use a proper mention.").then(m => m.delete(10000));
            }
            let hasRole = false;
            target.roles.cache.forEach(role => {
                if (role.name===muteRole){
                    hasRole = true;
                }
            })
            if (!hasRole) {
                return message.channel.send(`User ${target.displayName} is not muted.`).then(m => m.delete(10000));
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
            target.roles.remove(role).catch(console.error);
            logEvent(message, target, reason, "unmute");
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