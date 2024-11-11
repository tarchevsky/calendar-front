import { InputHTMLAttributes, forwardRef } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    extra?: string // классы к родительскому div
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, extra, ...rest }, ref) => {
        return (
            <div className={`${extra}`}>
                <label className='input input-bordered flex items-center gap-2'>
                    {label}
                    <input ref={ref} {...rest} className='grow' />
                </label>
            </div>
        )
    }
)

Field.displayName = 'field'