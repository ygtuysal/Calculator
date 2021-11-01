import useStyles from "./display.style"

const ALLOWED_CHARS = '0123456789.+-/*%='

export type IDisplayProps = {
    value: string
    onKey: (key: string) => Promise<void>
}
export const Display = (props: IDisplayProps) => {

    const handleKeyDown = async ({key}: React.KeyboardEvent) => {
        if (key==='Escape') {
            await props.onKey(key)
        }
        if (key==='Enter') {
            await props.onKey(key)
        }
        if (key.length===1 && ALLOWED_CHARS.indexOf(key)) {
            await props.onKey(key)
        }
    }

    const classes = useStyles()
    return (
        <div className={classes.container}>
            <input className={classes.display}
                   autoFocus={true}
                   value={props.value}
                   onKeyDown={handleKeyDown}
            />
        </div>
    )
}