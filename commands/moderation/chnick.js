const { MessageEmbed } = require('discord.js');
const { isModerator, getMember, isAdmin } = require('../../helpers');

module.exports = {
    name: 'chnick',
    category: 'moderation',
    usage: `**Privilege Required**\n\`\`\`chnick <@user?> [nickname!]\`\`\``,
    run: async (client, message, args) => {
        // check perms
        let nick;
        if (args.length===1){
            nick = args[0];
        } else if (args.length===2) {
            nick = args[1];
        }
        if (isModerator(message)){
            // find target
            let target = getMember(message);
            target.setNickname(nick);
            // execute action
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