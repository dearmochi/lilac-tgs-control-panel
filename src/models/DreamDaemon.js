const SecurityLevels = {
  Trusted: 0,
  Safe: 1,
  Ultrasafe: 2,
};

const DreamDaemon = { SecurityLevels: SecurityLevels };
export default DreamDaemon;

export const getSecurityLevelName = lvl => {
  switch (lvl) {
    case 0:
      return "Trusted";
    case 1:
      return "Safe";
    case 2:
      return "Ultrasafe";
    default:
      return "?";
  }
};

export const getGracefulAction = dd => {
  if (dd.softRestart) {
    return "Restart";
  } else if (dd.softShutdown) {
    return "Shutdown";
  }
};

export const getStatus = status => {
  switch (status) {
    case 0:
      return { text: "Offline", color: "red" };
    case 1:
      return { text: "Restoring", color: "yellow" };
    case 2:
      return { text: "Online", color: "green" };
    case 3:
      return { text: "Delayed Restart", color: "orange" };
    default:
      return { text: "?" };
  }
};