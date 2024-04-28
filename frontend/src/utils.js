// @author Raj Patel

export function validateFirstName(firstName) {
  if (!/^[a-zA-Z]+$/.test(firstName)) {
    return false;
  }
  return true;
}

export function validateEmail(email) {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return false;
  }
  return true;
}

export function convertUtcToAdt(utdDateString) {
  const utcDate = new Date(utdDateString);
  const adtDate = utcDate.toLocaleString("en-US", {
    timeZone: "America/Halifax",
  });
  return adtDate;
}

export function humanReadableTime(utdDateString) {
  const utcDate = new Date(utdDateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "America/Halifax",
  };
  return utcDate.toLocaleString("en-US", options);
}

export function getTimeFromDate(utdDateString) {
  const dateObject = new Date(utdDateString);
  const adtDateString = dateObject.toLocaleString("en-CA", {
    timeZone: "Canada/Atlantic",
  });
  return adtDateString.split(",")[1].trim();
}
