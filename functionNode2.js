const events = msg.payload.sunevents;
const timeZoneEDT = 'America/New_York';

//take the sun events from the sunevent node and make them then their own .msgs
events.forEach(event => {
    let eventName = event.event_name;
    let eventDateTime = new Date(event.datetime);
    let localTimeEDT = new Intl.DateTimeFormat('en-US', { timeZone: timeZoneEDT, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3, hourCycle: 'h23' }).format(eventDateTime);
    let localTimeGMT = new Intl.DateTimeFormat('en-US', { timeZone: timeZoneGMT }).format(eventDateTime);
    msg[eventName] = { time: localTimeEDT, datetimeEDT: eventDateTime, datetimeGMT: event.datetime };
});



return msg;