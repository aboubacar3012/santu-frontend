import { formatISO, parse } from 'date-fns';

export const convertDate = (dateStr: string) => {
  // Convert the string to a Date object
  const dateObj = new Date(dateStr);

  // Get the date components
  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
  const year = dateObj.getUTCFullYear();
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

  // Format the date in the desired format
  const formattedDate = `${day}/${month}/${year} à ${hours}:${minutes}`;
  return formattedDate;
}


export function convertDateToDDMMYYYY(date: string) {
  // Vérifier que la date est au format AAAA-MM-JJ
  var regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) {
    return;
  }

  // Séparer les composants de la date
  var [year, month, day] = date.split("-");

  // Retourner la date dans le format JJ/MM/AAAA
  return `${day}/${month}/${year}`;
}

// convert date to isoString: 2024-08-13 to IsoString
export const convertDateStringToISO = (date: string) => {
  if(!date) return;
  // Vérifier que la date est au format AAAA-MM-JJ
  var regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) {
      return;
  }

  // Retourner la date au format ISO
  return new Date(date).toISOString();
}

// utils/dateFormatter.js
// Convertir une date au format lund. 1/7 en chaîne ISO 8601
export const convertDateToISO = (inputDate:string) => {
  try {
    // Analyser la date au format d/M/yyyy
    // Ajouter l'année actuelle si non spécifiée
    const currentYear = new Date().getFullYear();
    const completeDate = `${inputDate}/${currentYear}`;
    const parsedDate = parse(completeDate, 'd/M/yyyy', new Date());

    // Vérifier si la date est valide
    if (isNaN(parsedDate.getTime())) {
      return;
    }

    // Formater la date en chaîne ISO 8601
    return formatISO(parsedDate);
  } catch (error) {
    return;
  }
};