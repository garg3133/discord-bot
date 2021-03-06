//Driver file for codechef command

const Discord = require('discord.js');
const fs = require('fs');
const enmap = require('enmap');

const ccommand = new enmap();

fs.readdir('./commands/codechef/',(err,File)=>{
    if(err) console.log(err);

    File.forEach(file=>{
        if(!file.endsWith('.js')) return;

        let cfile = require(`./codechef/${file}`);
        let cname = file.split('.')[0];
        console.log(`Loading command ${cname}`);
        ccommand.set(cname,cfile);
    })
})

exports.run = (client,message,args)=>{
    
    const cmd = ccommand.get(args.shift());

    if(!cmd){
        let embed = new Discord.RichEmbed();
        for(const [cmd,file] of ccommand.entries()){
            if(file.info)
                embed.addField(cmd,file.info);
        }
        message.channel.send(embed);
        return;
    }
    cmd.run(client,message,args);
}

exports.info = "Commands related to codechef.\nUse only codechef for commands";