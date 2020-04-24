const { setLogState } = require('../../helpers');
const { log_state, vote_mute_threshold, vote_mute_roles} = require('../../server.json');

module.exports = {
    name: 'config',
    category: 'moderation',
    description: "Configure Astrid (Only Usable By Administrators)",
    usage: "See help",
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')){
            message.reply("You are not authorized to perform this action.");
        }
        else {
            console.log(args);
            if (args[0]==null||args[0]=="help"){
                message.channel.send("help, logging, votemute");
            }
            if (args[0]=="logging"){
                if (args[1]==null||args.length>2){
                    message.reply("Usage: config logging enable|disable");
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
                    //setLogState(state);
                    message.channel.send("Logging " + args[1] + "d");
                    console.log(log_state);
                }
            }
            else if (args[0]=="votemute"){
                if (args[1]==null){
                    message.channel.send("Usage: config votemute threshold|roleset");
                }
                else if (args[1]=="threshold"){
                    if (args[2]==null){
                        message.channel.send(`**Current Threshold:**  ${vote_mute_threshold}`)
                    }
                    else if (args[2]>=3){
                        //setMuteThreshold(args[1]);
                        message.channel.send(`Threshold Updated to ${args[2]}`);
                    }
                    else {
                        message.channel.send(`Please use a valid integer above 3`);
                    }
                }
                else if (args[2]=="roles"){
                    if (args[3]=="add"){
                        //TODO: USE GET ROLE FUNCTION TO APPEND ROLE TO ARRAY AND RE DO HELPER FUNCTIONS
                    }
                }
            }
        }
    }
}