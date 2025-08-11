export function existing(field) {
  return !!field;
}

export function passwordV(field) {
  return (
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      field
    ) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(field)
  );
}

export function phoneV(field) {
  return /^\+?[1-9][0-9]{10,10}$/.test(field);
}

export function emailV(field) {
  return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(field);
}

export function number(field) {
  return /^\d+$/.test(field);
}

export function date(field) {
  if (!field) return false;
  const inputDate = new Date(field);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return inputDate <= currentDate;
}
