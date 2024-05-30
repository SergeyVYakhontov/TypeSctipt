export function daysRepr(daysCount: number): string {
  const hoursRest = daysCount % 10;

  if (10 <= daysCount && daysCount <= 20) {
    return "дней";
  } else if (hoursRest === 0) {
    return "дней";
  } else if (hoursRest === 1) {
    return "день";
  } else if (hoursRest === 2 || hoursRest === 3 || hoursRest === 4) {
    return "дня";
  } else {
    return "дней";
  }
}
