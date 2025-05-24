export function generateStrongPassword() {
  const length = 20;
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "^&!@#*$%";

  const all = upper + lower + numbers + symbols;

  // Гарантовано додаємо 1 вел. літеру і 1 цифру
  let password = "";
  password += upper.charAt(Math.floor(Math.random() * upper.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));

  // Додаємо решту символів довжиною до 15
  for (let i = 2; i < length; i++) {
    password += all.charAt(Math.floor(Math.random() * all.length));
  }

  // Перемішати символи в паролі
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}
