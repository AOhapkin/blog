import { format, parseISO } from 'date-fns'

export const formatDate = (date) => {
  if (!date) {
    return null
  } else {
    const dateISO = parseISO(date)
    return format(dateISO, 'MMMM d, yyyy')
  }
}

export const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  } else {
    return str;
  }
}
