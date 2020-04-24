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
            if (args==null||args[0]=="help"){
                message.channel.send("help, logging, staff");
            }
        }
    }
}