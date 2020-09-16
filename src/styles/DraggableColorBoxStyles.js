import  chroma  from 'chroma-js';
import sizes from './sizes';

const styles = {
    root : {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        '&:hover svg' : {
            color: props =>
            chroma(props.color).luminance() <= 0.7 ? "rgba(0,0,0,0.6)" : "white",
            transform : 'scale(1.3)'
        },
        [sizes.down('lg')]: {
            width : '25%',
            height: '20%'
        },
        [sizes.down('md')]: {
            width : '50%',
            height: '10%'
        },
        [sizes.down('sm')]: {
            width : '100%',
            height: '10%'
        },
        [sizes.down('xs')]: {
            width : '100%',
            height: '10%'
        }
    },
    boxName : {
        position: 'absolute',
        left : 0,
        bottom : 0,
        width: '100%',
        letterSpacing: '.5px',
        padding : '10px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display : 'flex',
        justifyContent : 'space-between',
        color: props =>
        chroma(props.color).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
    },
    icon : {
        transition : 'all .3s ease-in-out'
    }
}

export default styles;