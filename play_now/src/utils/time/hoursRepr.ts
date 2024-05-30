export function hoursRepr(hoursCount: number): string {
  const hoursRest = hoursCount % 10;

  if (10 <= hoursCount && hoursCount <= 20) {
    return "часов";
  } else if (hoursRest === 0) {
    return "часов";
  } else if (hoursRest === 1) {
    return "час";
  } else if (hoursRest === 2 || hoursRest === 3 || hoursRest === 4) {
    return "часа";
  } else {
    return "часов";
  }
}
