import dayjs from 'dayjs'
import 'dayjs/locale/es'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// Setear locale global
dayjs.locale('es')
dayjs.extend(customParseFormat)

export function formatDate(dateStr: string): string {
  const date = dayjs(dateStr, 'YYYY-MM-DD', true)
  return date.format('D [de] MMMM [de] YYYY')
}
