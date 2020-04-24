const fs = require('fs');

module.exports = {
    getMember(message, toFind = ''){
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);

        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes.toFind ||
                member.user.tag.toLowerCase().includes(toFind);
            });
        }

        if (!target)
            target = message.member;

        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date);
    },
    checkState: function() {
        return log_state;
    },
    setLogState: function(state) {
        jsonReader('./config.json', (err, config) => {
            if (err) {
                console.log('Error reading file:',err)
                return
            }

            config.log_state = state;
            
            fs.writeFile('./config.json', JSON.stringify(config), (err) => {
                if (err) console.log('Error writing file:', err)
            })
        })
    },
    addPowerRole: function(role){
        jsonReader('./config.json', (err, config) => {
            if (err) {
                console.log('Error reading file:',err)
                return
            }

            config.power_roles_array.append(role);
            
            fs.writeFile('./config.json', JSON.stringify(config), (err) => {
                if (err) console.log('Error writing file:', err)
            })
        })
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
    }
}