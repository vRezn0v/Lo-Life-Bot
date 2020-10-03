const { getMember } = require('../../helpers');

module.exports = {
    name: 'showroles',
    category: 'rolemanager',
    run: async (client, message, args) => {
        const roles = new Map();
        if (args.length===0||args[0]=='all') {
            message.guild.roles.cache.forEach(e => roles.set(e.name, e.id)) || "none";
        } else {
            target = getMember(message);
            target.roles.cache.forEach(e => roles.set(e.name, e.id)) || "none";
        }
        console.log(roles);
    }
}