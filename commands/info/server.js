const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'server',
    usage: 'server',
    description: 'returns information about server',
    run: async (client, message, args) => {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var userCount = message.guild.members.cache.filter(member => !member.user.bot).size;
        var botCount = message.guild.members.cache.filter(member => member.user.bot).size; 
        const serverinfo = new MessageEmbed()
            .setColor('0xFF1493')
            .setTitle(message.guild.name)
            .setDescription(`**Server Details**`)
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addFields({
                name: 'Created At:',
                value: '```' + message.guild.createdAt.getDate() + ' ' + month[message.guild.createdAt.getMonth()] + ' ' + message.guild.createdAt.getFullYear() + '```',
                inline: false
            }, {
                name: 'Server ID:',
                value: '```' + message.guild.id + '```',
                inline: true
            }, {
                name: 'Owner:',
                value: '```' + message.guild.owner.user.username + '#' + message.guild.owner.user.discriminator + '```',
                inline: true
            }, {
                name: 'Member Count: ' + message.guild.members.cache.size,
                value: '```' + userCount+' humans'+' & '+botCount+' bots' + '```',
                inline: false
            }, {
                name: `Region`,
                value: '```' + message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1) + '```'
            })
            .setTimestamp()
            .setFooter("Powered By Tea");
        
        message.channel.send(serverinfo);
        
    }
}