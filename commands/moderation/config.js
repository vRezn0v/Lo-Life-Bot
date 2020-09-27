const { MessageEmbed } = require('discord.js');
const { setLogState, authorIsAdmin } = require('../../helpers');
const { log_state, vote_mute_threshold, server_prefix } = require('../../server.json');

module.exports = {
    name: 'config',
    category: 'moderation',
    description: "Configure Astrid (Only Usable By Administrators)",
    usage: `**Requires Elevated Access**\n
            **Args**\n\`\`\`logging <enable|disable|state>\nvotemute <threshold *N*|roleset *ROLE*>\npowerroles <add *role*|remove *role*|list>\`\`\``,
    run: async (client, message, args) => {
        if (!authorIsAdmin(message)){
            message.reply("You are not authorized to perform this action.");
        }
        else {
            if (args[0]=="show") {
                const embed = new MessageEmbed()
                                .setTitle(`${message.guild.name} Config`)
                                .setDescription(`**Prefix:** ${server_prefix}\n**Vote Threshold:** ${vote_mute_threshold}\n**Logging Status:** ${log_state}`)
                                .setTimestamp()
                                .setFooter("Brought To You By Raid Shadow Legends");
                return message.channel.send(embed);
            }
            else if (args[0]=="logging"){
                if (args[1]==null||args.length>2){
                    message.reply("Usage: config logging <enable|disable>");
                }
                else if (args[1]=='enable'||args[1]=='disable'||args[1]=='state'){
                    var state;
                    if (args[1]=='enable'){
                        state = true;
                        if (state==log_state){
                            message.channel.send("Logging is already enabled");
                            return;
                        }
                    }
                    else if (args[1]=='disable'){
                        state = false;
                        if (state==log_state){ 
                            message.channel.send("Logging is already disabled");
                            return;
                        }
                    }
                    else if (args[1]=='state'){
                        message.channel.send(`Logging is set to ${log_state}`);
                        return;
                    }
                    setLogState(state);
                    message.channel.send("Logging " + args[1] + "d");
                    console.log(log_state);
                }
            }
            else if (args[0]=="votemute"){
                if (args[1]==null){
                    message.channel.send("Usage: config votemute <threshold n|roleset rolename>");
                }
                else if (args[1]=="threshold"){
                    if (args[2]==null||args[2]=='status'){
                        message.channel.send(`**Current Vote Threshold:**  ${vote_mute_threshold}`);
                    }
                    else if (args[2]>=3){
                        //setMuteThreshold(args[1]);
                        message.channel.send(`Threshold Updated to ${args[2]}`);
                    }
                    else {
                        message.channel.send(`Please use a valid number above 3`);
                    }
                }
                else if (args[2]=="powerroles"){
                    if (args[3]=="add"){
                        //TODO: USE GET ROLE FUNCTION TO APPEND ROLE TO ARRAY AND RE DO HELPER FUNCTIONS
                    }
                }
            }
        }
    }
}