const events = msg.payload.sunevents;
const timeZoneGMT = 'GMT';
const timeZoneEDT = 'America/New_York';

events.forEach(event => {
    let eventName = event.event_name;
    let eventDateTime = new Date(event.datetime);
    let localTimeEDT = new Intl.DateTimeFormat('en-US', { timeZone: timeZoneEDT, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3, hourCycle: 'h23' }).format(eventDateTime);
    let localTimeGMT = new Intl.DateTimeFormat('en-US', { timeZone: timeZoneGMT }).format(eventDateTime);
    msg[eventName] = { time: localTimeEDT, datetimeEDT: eventDateTime, datetimeGMT: event.datetime };
});  // assign msgs to each sun event with several variations

let now = new Date();
let nowTimeEDT = new Date(now.toLocaleString('en-US', { timeZone: timeZoneEDT, hour24: false }));
let sunsetTime = new Date(now.toLocaleDateString() + ' ' + msg.sunset.time);
let sunriseTime = new Date(msg.sunrise.datetimeEDT);
let sunriseMinutes = sunriseTime.getHours() * 60 + sunriseTime.getMinutes();
let sunsetMinutes = sunsetTime.getHours() * 60 + sunsetTime.getMinutes();
let minutesBetween = ((sunsetMinutes - sunriseMinutes) + 1440) % 1440; //minutes between sunrise and sunset
let rampUp = minutesBetween / 2;
let rampDown = minutesBetween / 2;

msg.minutesBetween = minutesBetween;
msg.time = nowTimeEDT.toLocaleString('en-US', { timeZone: timeZoneEDT, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3, hourCycle: 'h23' });
let delayInMinutes = (minutesBetween / 2) / 100;
let delay = ((minutesBetween / 2) / 100) * 1000; // calculate delay to next message
let sunRemaining = Math.round((sunsetTime - new Date(now.toLocaleDateString() + ' ' + msg.time)) / (60 * 1000)); // calculates remaining time in minutes
let brightness = 100
//what phase are we in? rampup or rampdown?
let currentPhase = sunRemaining > rampUp ? 'rampUp' : 'rampDown';

msg.phase = currentPhase;  //outputs to msg the phase
msg.brightness = brightness;
msg.sunRemaining = sunRemaining;
msg.delayInMinutes = delayInMinutes;

if (currentPhase === 'rampUp') {
//    brightness = Math.floor((minutesBetween - sunRemaining) / (delayInMinutes * 100));
}

if (currentPhase === 'rampDown') {
//    brightness = 100 - Math.floor(((rampDown - sunRemaining) / (delayInMinutes)) * 100); // calculate brightness percentage and round to lower whole number
}

msg.payload = {
    domain: "light",
    service: "turn_on",
    data: {
        brightness_pct: brightness,
    }
};

msg.delay = delay

return msg;
