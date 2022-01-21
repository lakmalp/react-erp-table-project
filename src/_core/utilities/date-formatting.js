import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

// refer https://date-fns.org/v2.28.0/docs/format for formatting
export const formatDate = (val) => {
  try {
    return format(parseISO(val), 'yyyy-MM-dd');
  } catch (err) {
    return val
  }
}

export const formatDateTime = (val) => {
  try {
    return format(parseISO(val), 'yyyy-MM-dd HH:mm');
  } catch (err) {
    return ""
  }
}