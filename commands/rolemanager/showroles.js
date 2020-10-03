const { MessageEmbed } = require('discord.js');
const { getMember } = require('../../helpers');

module.exports = {
    name: 'showroles',
    category: 'rolemanager',
    run: async (client, message, args) => {
        const roles = new Map();
        if (args.length===0||args[0]=='all') {
            let lsr = [];
            message.guild.roles.cache.forEach(e => roles.set(e.name, e.id)) || "none";
            for (let [key, value] of roles.entries()) {
                lsr.push("**"+key+"**\t");
                lsr.push("\`\`\`");
                lsr.push(value);
                lsr.push("\`\`\`\n\n");
                //console.log(key + " " + "\`\`\`" + value + "\`\`\`");
            }

            lsr = lsr.join("");
            const embed = new MessageEmbed()
                            .setTitle("Roles List")
                            .setDescription(lsr)
                            .setColor("#0000FF");
            return message.channel.send(embed);
        } else {
            target = getMember(message);
            target.roles.cache.forEach(e => roles.set(e.name, e.id)) || "none";
        }
    }
}