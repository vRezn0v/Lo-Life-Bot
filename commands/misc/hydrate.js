const { hydrate } = require('../../server.json');

module.exports = {
    name: 'hydrate',
    usage: 'mention a user (optional)',
    description: 'reminds you of a much needed thing, hydration',
    run: async (client, message, args) => {
        var tmin = 120;
        console.log('Message recieved from ' + message.author.id + ' at ' + Date.now().toString());
        var timemeasure = args[1];
        var returntime = Number(args[0]);
        switch (timemeasure) {
            case 's':
                returntime = returntime * 1000;
                break;

            case 'm':
                returntime = returntime * 1000 * 60;
                break;

            case 'h':
                returntime = returntime * 1000 * 60 * 60;
                break;

            case 'd':
                returntime = returntime * 1000 * 60 * 60 * 24;
                break;

            default:
                returntime = returntime * 1000;
                break;
        }
        let target = message.member;
        if (args[2]!=null){
            target = message.mentions.members.first() || message.guild.members.get(args[0]);
        }
        console.log(args);
        client.setTimeout(function () {
            var content = "Hey there! Drink up before I delete your knees";
            target.send(content);
        },returntime);
        
    }
}