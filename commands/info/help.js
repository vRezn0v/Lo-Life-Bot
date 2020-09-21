const { readdirSync } = require("fs");
const { RichEmbed } = require("discord.js")

module.exports = {
    name: 'help',
    usage: '[prefix]help (cmd?)',
    description: 'returns help texts',
    run: async (client, message, args) => {
        var allcmds = [];
        readdirSync("./commands").forEach(dir => {
            const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
            for (let file of commands) {
                let pull = require(`../${dir}/${file}`);
                allcmds.push(pull.name);
            }
        });
        if (args.length===0||args[0]==='list'){
            var description = [];
            readdirSync("./commands").forEach(dir => {
                const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
                var cmdnames = [];
                for (let file of commands) {
                    let pull = require(`../${dir}/${file}`);
                    cmdnames.push(pull.name);
                }
                cmdnames = cmdnames.join(', ');
                description.push('**' + dir.toUpperCase() + ' Commands:**' + '\`\`\`' + cmdnames + '\`\`\`');
            });
            description = description.join('\n');
            const cmdlist = new RichEmbed()
                            .setColor('#CC0000')
                            .setTitle("Commands List")
                            .setDescription(description);
            message.channel.send(cmdlist);
        }
        else if (allcmds.includes(args[0])){
            message.channel.send("You Got It Chief.");
        }
    }
}