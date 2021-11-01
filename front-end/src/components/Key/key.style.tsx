import {makeStyles} from "@material-ui/core";


const KEY_SIZE=30
const BGCOLOR='gray'
const COLOR='white'
const PADDING=5
const MARGIN=5
const DOUBLEWIDTH=KEY_SIZE*2+PADDING*2+MARGIN


const useStyles = makeStyles(() => {
    return {
        key: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${KEY_SIZE}px`,
            height: `${KEY_SIZE}px`,
            backgroundColor: BGCOLOR,
            color: COLOR,
            padding: `${PADDING}px`,
            textAlign: 'center',
            verticalAlign: 'middle',
            marginRight: `${MARGIN}px`,
            cursor: 'pointer',
        },
        doubleWidth: {
            width: `${DOUBLEWIDTH}px`,
            height: `${KEY_SIZE}px`,
            backgroundColor: BGCOLOR,
            color: COLOR,
            padding: `${PADDING}px`,
            textAlign: 'center',
            verticalAlign: 'middle',
            marginRight: `${MARGIN}px`,
            cursor: 'pointer',
        },
    }
})

export default useStyles;