//ultimate goal is to ramp up a light beginning at sunrise, climbing to 100% by noon then ramping down for the remainder of daylight


//use sun node to create variables for each sun event - these variables should be Eastern Standard Time, without dates
events.forEach(event => {
    let eventName = event.event_name;
    let eventDateTime = new Date(event.datetime);
    let localTimeEDT = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3, hourCycle: 'h23' }).format(eventDateTime);
    msg[eventName] = { time: localTimeEDT };
});



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


return msg;