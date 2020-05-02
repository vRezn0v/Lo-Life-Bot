const { muteRole } = require('../../server.json');
const { isModerator, logEvent } = require('../../helpers');

module.exports = {
    name: 'unmute',
    category: 'moderation',
    description: 'Unmute the tagged member',
    usage: '-unmute @mention',
    run: async (client, message, args) => {
        if (isModerator(message)){
            let reason='N/A';
            console.log(args[0]);
            let target = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!target){
                return message.reply("Person not found, please use a proper mention.").then(m => m.delete(10000));
            }
            const hasRole = target.roles.some(role => muteRole === role.name);
            if (!hasRole) {
                return message.channel.send(`User ${target.displayName} is not muted.`).then(m => m.delete(10000));
            }
            if (args[1]){
                reason = args[1];
            }
            let role = message.guild.roles.find(r => r.name === muteRole);
            target.removeRole(role).catch(console.error);
            logEvent(message, target, reason, "unmute");
        }
        else {
            message.reply("You are not authorized to perform this action. Incident logged.")
        }
    }
}