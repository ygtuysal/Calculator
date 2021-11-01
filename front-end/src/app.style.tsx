import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => {
    return {
        body: {
           width: '100%',
           height: '100%',
           display: 'flex',
           flexDirection: 'row',
           alignItems: 'center',
           justifyContent: 'center',
        },
        container: {
            flex: 0,
            display: 'flex',
            flexDirection: 'column',
        },
        modal: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '60px',
            zIndex: 100,
            background: 'transparent',
        },
        loader: {
            fontSize: '25px',
            color: 'black',
        }
    }
})

export default useStyles;