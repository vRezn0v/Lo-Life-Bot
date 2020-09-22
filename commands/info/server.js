module.exports = {
    name: 'server',
    usage: 'server',
    description: 'returns information about server',
    run: async (client, message, args) => {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var userCount = message.guild.members.cache.filter(member => !member.user.bot).size;
        var botCount = message.guild.members.cache.filter(member => member.user.bot).size; 
        const serverinfo = {
            color: 0xFF1493,
            title: message.guild.name,
            description: '**Server Details**',
            thumbnail: {
                url: message.guild.iconURL,
            },
            fields: [
                {
                    name: 'Created At:',
                    value: '```' + message.guild.createdAt.getDate() + ' ' + month[message.guild.createdAt.getMonth()] + ' ' + message.guild.createdAt.getFullYear() + '```',
                    inline: false,
                },
                {
                    name: 'Server ID:',
                    value: '```' + message.guild.id + '```',
                    inline: true,
                },
                {
                    name: 'Owner:',
                    value: '```' + message.guild.owner.user.username + '#' + message.guild.owner.user.discriminator + '```',
                    inline: true,
                },
                {
                    name: 'Member Count: ' + message.guild.members.size,
                    value: '```' + userCount+' humans'+' & '+botCount+' bots' + '```',
                    inline: false,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
            ],
            
            timestamp: new Date(),
            footer: {
                text: 'powered by Anti Rebellion',
            },
        };
        
        message.channel.send({ embed: serverinfo });
        
    }
}