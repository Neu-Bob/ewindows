//ultimate goal is to ramp up a light beginning at sunrise, climbing to 100% by noon then ramping down for the remainder of daylight


//use sun node to create variables for each sun event - these variables should be Eastern Standard Time, without dates
const events = msg.payload.sunevents;
const timeZoneEDT = 'America/New_York';
let sunriseTime;
let sunsetTime;

events.forEach(event => {
    const eventName = event.event_name;
    const eventDateTime = new Date(event.datetime);
    const localTimeEDT = new Intl.DateTimeFormat('en-US', { timeZone: timeZoneEDT, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3, hourCycle: 'h23' }).format(eventDateTime);
    msg[eventName] = { time: localTimeEDT };

    if (eventName === 'sunrise') {
        sunriseTime = localTimeEDT;
    } else if (eventName === 'sunset') {
        sunsetTime = localTimeEDT;
    }
});

const sunrise = new Date('2000-01-01T' + sunriseTime + ':00.000-04:00');
const sunset = new Date('2000-01-01T' + sunsetTime + ':00.000-04:00');
const daylightMinutes = (sunset.getTime() - sunrise.getTime()) / (1000 * 60);

msg.sunriseTime = sunriseTime;
msg.sunsetTime = sunsetTime;
msg.daylightMinutes = daylightMinutes;

return msg;



//create a variable and output a msg.dayLightMinutes for dayLightMinutes calculated by sunrise and sunset times
//create a variable and out for daylightMinutesRemaining

//delay between brightness steps
// delayInMinutes = (dayLightMinutes / 2) / 100  ((this will output minutes))
// let delayInMilliseconds = delayInMinutes * 60000

//Ramp Up & Ramp Down
//create a variable called brightness_pct

//ramp up brightness percentage 
//dayLightMinutes - 


//ramp down birghtness percentage
//
