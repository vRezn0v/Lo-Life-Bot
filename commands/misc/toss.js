const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'toss',
    category: 'misc',
    usage: '\`\`\`toss\`\`\`',
    run: async (client, message, args) => {
        let outputs = ['Heads', 'Tails'];
        result = Math.round(Math.random());
        const embed = new MessageEmbed()
                        .setColor("#F0F000")
                        .setTitle("Tossed Into The Garbage")
                        .setDescription("\`\`\`You got " + outputs[result] + ".\`\`\`")
                        .setTimestamp()
                        .setFooter("Brought To You By The Witcher, now toss a coin");
        return message.channel.send(embed);
    }   
}