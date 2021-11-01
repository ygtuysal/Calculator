
import useStyles from "./key.style"

export type IKeyProps = {
    label: string,
    return?: string,
    doubleWidth?: boolean,
    color?: string
    onPress: (label: string) => Promise<void>
}
export const Key = (props: IKeyProps) => {

    const handleClick = async () => {
        await props.onPress(props.return || props.label)
    }

    const classes = useStyles()

    let klass = (props.doubleWidth ? classes.doubleWidth : classes.key)
    let style
    if (props.color) {
        style={backgroundColor: props.color}
    }
    return (
        <div className={klass} style={style} onClick={handleClick}>
            {props.label}
        </div>
    )
}