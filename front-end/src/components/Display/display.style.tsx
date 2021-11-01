import {makeStyles} from "@material-ui/core";

 const useStyles = makeStyles(() => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '5px',
            paddingRight: '5px',
            marginTop: '50px',    
        },
        display: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            border: '3px solid orange',
            boxShadow: 'inset 0 0 4px black',
            backgroundColor: 'gray',
            minHeight: '20px',
            padding: '3px',
            textAlign: 'right',
        }
    }
})

export default useStyles;