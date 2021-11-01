import {Display} from "./components/Display/display";
import {useState} from "react";
import {Keyboard} from "./components/Keyboard/keyboard";
import {api} from "./api/api";
import useStyles from "./app.style";


export const App = () => {
    const [displayValue, setDisplayValue] = useState<string>('0')
    const [isLoading, setLoading] = useState<boolean>(false)

    const handleKey = async (key: string) => {
        let value = displayValue
        try {
            setLoading(true)
            const res = await api({displayValue: value, key})
            setLoading(false)
            setDisplayValue(res.value)
        } catch (err) {
            console.error(err)
        }
    }

    const classes = useStyles()

    let jsxLoader
    if (isLoading) {
        jsxLoader = (
            <div className={classes.modal}>
                <div className={classes.loader}>
                    Calculaiting...
                </div>
            </div>
        )
    }

    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <Display
                    value={displayValue}
                    onKey={handleKey}
                />
                <Keyboard
                    onKey={handleKey}
                />
            </div>
            {jsxLoader}
        </div>
    )
}