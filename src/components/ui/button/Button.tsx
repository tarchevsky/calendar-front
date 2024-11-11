import {ButtonHTMLAttributes, ReactNode} from "react";
import cn from "clsx";
import styles from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant: 'btn-primary' | 'btn-secondary' | 'btn-disabled'
    isCircle?: boolean
}

export function Button({children, variant = 'btn-primary', isCircle, className, ...rest}: Props) {
    return <button className={cn(styles.btn, styles[variant], 'btn btn-wide', {
        [styles.circle]: isCircle
    }, className)} {...rest}>{children}</button>
}