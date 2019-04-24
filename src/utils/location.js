export const getFullPath = (location)=>{
  if (location.search) {
    return `${location.pathname}?${location.search}`
  } else {
    return location.pathname
  }
}

export const getLocationKey = (location) => {
  return `${location.pathname}-${new Date().getTime()}`
}
