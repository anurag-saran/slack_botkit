var infinispan = require('infinispan');
var _ = require('underscore');
var Botkit = require('./node_modules/botkit/lib/Botkit.js');

var jdgHost = process.env.DATAGRID_HOTROD_SERVICE_HOST || "127.0.0.1";
var jdgPort = process.env.DATAGRID_HOTROD_SERVICE_PORT || 11222;



const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || "xoxb-170541997655-N5UxcE3e7wdE0Q8z9qjKvGp2";

function get_response(){
  var responses = [
    'There was a car coming.',
    'To get to the other side.',
    'To get the newspaper.',
    'Because it wanted to find out what those jokes were about.',
    'To boldly go where no chicken has gone before!',
    'Because the light was green.',
    'I could tell you, but then the Chicken Mafia would kill me.'
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
  token: SLACK_BOT_TOKEN
}).startRTM();

controller.hears(['why did the chicken cross the road'], 'direct_message,direct_mention,mention', function(bot, message) {
    var cacheResponse;
    var connected = infinispan.client({port: jdgPort, host: jdgHost}, {version: '2.2'});
     connected.then(function (client) {
        client.get(custID).then(
            function(value) {
                cacheResponse=value;
            });
        });
    console.log("*********DataFrom Cache:"+JSON.stringify(cacheResponse));
    
    
    
  bot.reply(message, get_response());
});

controller.hears(['help'], 'direct_message,direct_mention,mention', (bot, message) => {
    bot.reply(message, {
        text: `You can ask me things like:
    "What is my employee No"
    "Has my currents quater salary credited"
    "Pending time reports"`
    });
});


//var Bot = require('slackbots');
//
////settings
//var settings = {
//  token: 'xoxb-170541997655-N5UxcE3e7wdE0Q8z9qjKvGp2',
//    name: 'acmeagent'
//};
//
//var channel='employeequeries';
//
//var bot = new Bot(settings);
//
//bot.on('start', function(){
//    
//    bot.postMessageToChannel(channel, 'Hello Channel. I am successfully connected');
//});
//
//bot.on('message', function(message){
//    
//    console.log("~~~bot.on - message:"+message.text);
//    console.log("~~~bot.on - message:"+JSON.stringify(message));
//                
//    if(message.type === 'message' && Boolean(message.text))
//        {
//            console.log("@@@@@@@@:"+message.channel);
//            console.log("@@@@@@@@typeof message.channel:"+typeof message.channel);
//            console.log("@@@@@@@@typeof message.channel[0]:"+message.channel[0],'abc:'.indexOf('b'));
//            if(typeof message.channel === 'string' && message.channel[0] === 'C')
//            {   
//                
//                var textMsg= message.text.toLowerCase();
//                console.log("######### textMsg:"+ textMsg);
//                console.log("######### message.text:"+textMsg.indexOf('<@u50fxvbk9>'));
//                console.log("#########TypeOF:"+typeof(textMsg.indexOf('<@u50fxvbk9>')));
//                if(textMsg.indexOf('@U50FXVBK9') > -1){
//                    console.log("!!!!!!!!!Message From BOT.");
//                    bot.postMessageToChannel(channel, "Hey Thanks for the atention.");
//                }else {
//                   // bot.postMessageToChannel(channel, "Hey Thanks for ignoreing me.");
//                    console.log("!!!!!!!!!Hey Thanks for ignoreing me.");
//                }
//            }
//                
//    }
//    
//});
