const { muteRole } = require('../../server.json');
const { isModerator, logEvent } = require('../../helpers');

module.exports = {
    name: 'mute',
    category: 'moderation',
    description: 'Mute the tagged member indefinitely',
    usage: `**Requires Elevated Access**\n
            \`\`\`mute @user\`\`\``,
    run: async (client, message, args) => {
        if (isModerator(message)){
            let reason='N/A';
            console.log(args[0]);
            let target = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!target){
                return message.reply("Person not found, please use a proper mention.").then(m => m.delete(10000));
            }
            if (target.permissions.has("BAN_MEMBERS")||target.user.bot){
                return message.reply("User can not be reported, please contact server staff or owner.")
            }
            if (args[1]){
                reason = args[1];
            }
            let role = message.guild.roles.find(r => r.name === muteRole);
            target.addRole(role).catch(console.error);
            logEvent(message, target, reason, "mute");
        }
        else {
            message.reply("You are not authorized to perform this action. Incident logged.")
        }
    }
}