function timeToMinutes(time) {
  const [hour, minutes] = time.split(':').map(Number);
  return hour * 60 + minutes;
}

function isMeetingRelevant(dayStart, dayEnd, eventStart, eventDuration) {
  dayStart = timeToMinutes(dayStart);
  dayEnd = timeToMinutes(dayEnd);
  eventStart = timeToMinutes(eventStart);
  const eventEnd = eventStart + eventDuration;
  if (eventStart < dayStart || eventEnd > dayEnd) {
    return false;
  }
  return true;
}

console.log(isMeetingRelevant('08:00', '17:30', '14:00', 90));
console.log(isMeetingRelevant('8:0', '10:0', '8:0', 120));
console.log(isMeetingRelevant('08:00', '14:30', '14:00', 90));
console.log(isMeetingRelevant('14:00', '17:30', '08:0', 90));
console.log(isMeetingRelevant('8:00', '17:30', '08:00', 900));
