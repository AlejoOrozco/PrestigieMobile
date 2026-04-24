import { BRAND_CHAMPAGNE } from '../../constants/brandColors'

type WhatsAppFloatingButtonProps = {
  message: string
  className?: string
}

function whatsappPhoneDigits(): string | undefined {
  const raw = import.meta.env.WHATSAPP_PHONE_E164 ?? ''
  const trimmed = String(raw)
    .trim()
    .replace(/^["']|["']$/g, '')
  const digits = trimmed.replace(/\D/g, '')
  return digits.length > 0 ? digits : undefined
}

function whatsappUrlWithText(text: string): string {
  const phone = whatsappPhoneDigits()
  if (!phone) return '#'
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export function WhatsAppFloatingButton({
  message,
  className,
}: WhatsAppFloatingButtonProps) {
  return (
    <a
      href={whatsappUrlWithText(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={[
        'fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a882]/50 bg-black/55 shadow-[0_16px_36px_-18px_rgba(201,168,130,0.7)] backdrop-blur-sm transition-colors hover:bg-[#c9a882]/12 sm:bottom-5 sm:right-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ color: BRAND_CHAMPAGNE }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.15 6.36 2.15 11.74c0 1.89.55 3.72 1.59 5.29L2 22l5.16-1.68a9.98 9.98 0 0 0 4.88 1.25h.01c5.46 0 9.89-4.36 9.89-9.74C21.94 6.36 17.5 2 12.04 2zm0 17.89h-.01a8.27 8.27 0 0 1-4.22-1.15l-.3-.18-3.06 1 1-2.98-.2-.31a8.01 8.01 0 0 1-1.24-4.23c0-4.46 3.69-8.09 8.23-8.09 2.2 0 4.26.84 5.81 2.36a8 8 0 0 1 2.42 5.73c0 4.46-3.69 8.1-8.24 8.1zm4.52-6.1c-.25-.12-1.48-.72-1.71-.8-.23-.08-.39-.12-.56.12-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.2a7.36 7.36 0 0 1-1.36-1.67c-.14-.24-.02-.37.1-.49.1-.1.25-.26.37-.39.12-.14.16-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.32-.77-1.8-.2-.47-.4-.4-.56-.4h-.47c-.16 0-.43.06-.66.3-.23.24-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.16 1.75 2.75 4.25 3.85.59.25 1.06.4 1.42.51.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z" />
      </svg>
    </a>
  )
}
