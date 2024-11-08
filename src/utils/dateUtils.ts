export function calculateAge(dateString: string) {
  // Split the date string into year, month, and day
  const [year, month, day] = dateString.split("-").map(Number);

  // Get the current date
  const currentDate = new Date();

  // Calculate the birth date
  const birthDate = new Date(year, month - 1, day);

  // Calculate the age
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust the age if the current month and day are earlier than the birth month and day
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}
