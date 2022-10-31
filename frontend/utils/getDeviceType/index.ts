export enum DeviceType {
  desktop = 'desktop',
  desktopSmall = 'desktopSmall',
  tablet = 'tablet',
  smartphone = 'smartphone',
}

export default function deviceTypeByWidth(): DeviceType {
  let deviceWidth = 0
  if (typeof window !== 'undefined') {
    deviceWidth = window.innerWidth
  }

  if (deviceWidth <= parseInt('659px', 10)) {
    return DeviceType.smartphone
  }
  if (deviceWidth <= parseInt('980px', 10)) {
    return DeviceType.tablet
  }
  if (deviceWidth <= parseInt('1260px', 10)) {
    return DeviceType.desktopSmall
  }
  return DeviceType.desktop
}
