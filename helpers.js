const fs = require('fs');

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const { vote_mute_roles, logChannel } = require('./server.json');
const config = require('./server.json');

module.exports = {
    hydration_messages : [
        "Drink Up!",
        "Wind down and take a drink of water, brave traveller.",
        "Drink some water before I delete your kneecaps.",
        "You sure you are not forgetting to drink ocean sauce?",
        "Here's a reminder to get your refill of ice juice."
    ],
    getMember(message){
        let toFind = message.mentions.members.first() || message.member;
        let target = message.guild.members.resolve(toFind);
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date);
    },
    checkState: function() {
        return log_state;
    },
    setLogState: function(state) {
        config.log_state = state;
        fs.writeFile('./server.json', JSON.stringify(config, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(config));
            console.log('writing to ' + 'config');
        });
    },
    addPowerRole: function(role){
        config.power_roles_array.push(role);
        fs.writeFile('./server.json', JSON.stringify(config, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(config));
            console.log('writing to ' + 'config');
        });
    },
    removePowerRole: function(role){
        jsonReader('./config.json', (err, config) => {
            if (err) {
                console.log('Error reading file:',err)
                return
            }

            config.power_roles_array.delete(role);
            
            fs.writeFile('./config.json', JSON.stringify(config), (err) => {
                if (err) console.log('Error writing file:', err)
            })
        })
    },
    listPowerRole: function() {
        let x = config.power_roles_array;
        return x;
    },
    isHelper: function(message){
        let perms = message.member.permissions;
        if (perms.has('MANAGE_NICKNAMES'))
            return true;
        else 
            return false;
    },
    isModerator: function(message){
        let perms = message.member.permissions;
        if (perms.has('MUTE_MEMBERS'))
            return true;
        else 
            return false;
    },
    isVoteEligible: function(message, userid){
        const user = message.guild.members.get(userid);
        const hasRole = user.roles.some(role => vote_mute_roles.includes(role.name));
        console.log(hasRole);
        if (hasRole){
            return true;
        }
        else {
            return false;
        }
    },
    logEvent: function(message, member, reason, type){
        if (type=="mute"){
            var color = "#ff0000";
            var name = "Mute";
        }
        else if (type=="unmute"){
            var color = "#00ff00";
            var name = "Unmute";
        }
        const embed = new MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .setAuthor(name, member.user.displayAvatarURL)
            .setDescription(stripIndents`**Member:** ${member} [${member.user.id}]
            **Responsible Moderator:** ${message.member}
            **Reason:** ${reason}`);

        const channel = message.guild.channels.find(c => c.name === logChannel);

        return channel.send(embed);
    }
}