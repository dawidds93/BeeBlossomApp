interface ContainerProps {
    children: React.ReactNode
    className?: string
    as?: keyof JSX.IntrinsicElements
}

export default function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
    return <Tag className={`container ${className}`}>{children}</Tag>
}
