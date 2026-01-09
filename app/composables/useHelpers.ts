// composables/useHelpers.ts

/**
 * Truncate a string and add ellipsis if it's too long
 * @param text - The original string
 * @param maxLength - Max length before truncating
 * @returns truncated string
 */
export function useTruncateText(text: string, maxLength: number = 50): string {
    if (!text) return ''
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
}

/**
 * Capitalize first letter of a string
 */
export function useCapitalize(text: string): string {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Format date nicely (YYYY-MM-DD → Month Day, Year)
 */
export function useFormatDate(date: string | Date): string {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
