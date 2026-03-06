import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    href?: string
    children: React.ReactNode
}

export default function Button({
    variant = 'primary',
    size = 'md',
    href,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const base =
        'inline-flex items-center justify-center font-medium tracking-wide rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap'

    const variants: Record<string, string> = {
        primary: 'text-white',
        ghost: 'border-2 bg-transparent',
        outline: 'border bg-transparent',
    }

    const sizes: Record<string, string> = {
        sm: 'px-5 py-2 text-xs',
        md: 'px-7 py-3 text-sm',
        lg: 'px-9 py-4 text-base',
    }

    const styles: Record<string, React.CSSProperties> = {
        primary: { backgroundColor: 'var(--amber)', color: 'white' },
        ghost: {
            borderColor: 'var(--amber)',
            color: 'var(--amber)',
        },
        outline: {
            borderColor: 'var(--brown)',
            color: 'var(--brown)',
        },
    }

    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

    if (href) {
        return (
            <Link href={href} className={cls} style={styles[variant]}>
                {children}
            </Link>
        )
    }

    return (
        <button className={cls} style={styles[variant]} {...props}>
            {children}
        </button>
    )
}
