


export default {
    root : {
        position : 'relative',
        backgroundColor : 'white',
        borderRadius : '5px',
        overflow : 'hidden',
        padding : '.5rem',
        cursor : 'pointer',
        '&:hover svg' : {
            opacity : 1
        }
    },
    colors : {
        backgroundColor : 'grey',
        width : '100%',
        height : '130px',
        borderRadius : '5px',
        overflow : 'hidden'
    },
    title: {
       display : 'flex',
       justifyContent: 'space-between',
       alignItems: 'center',
       margin: '0',
       paddingTop: '.5rem',
       fontSize: '1rem',
       color: 'black',
       position: 'relative',
    },
    emoji : {
       marginLeft: '.5rem',
       fontSize: '1.5rem',
    },
    miniColor: {
        width : '20%',
        height: '25%',
        display : 'inline-block',
        margin : '0 auto',
        position : 'relative',
        marginBottom : '-3.5px',
    },
    deleteIcon : {
        color: 'white',
        backgroundColor : '#eb3d30',
        width : '20px',
        height: '20px',
        position : 'absolute',
        right: 0,
        top: 0,
        padding: '10px',
        zIndex: 10,
        opacity: 0,
        transition : 'all .4s ease-in-out'
    }
}