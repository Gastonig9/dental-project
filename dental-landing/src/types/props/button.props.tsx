export interface ButtonProps {
    justifyButton: 'center' | 'end' | 'start'
    widthButton: string
    widthContain?: string
    titleButton: string
    isLink?: boolean
    marginTop?: string
    marginBottom?: string
    onAction?: () => void
}