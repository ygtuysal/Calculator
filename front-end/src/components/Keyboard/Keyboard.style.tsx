import {makeStyles} from "@material-ui/core";



const useStyles = makeStyles(() => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingBottom: '5px',
        }
    }
})

export default useStyles;