import sizes from './sizes';


export default {
    Navbar :{
        width: '100%',
        height: '6vh',
        display: 'flex',
        alignItems: 'center',
    },
    NavbarLogo :{
        marginRight: '15px',
        padding: '0 13px',
        backgroundColor: '#eceff1',
        fontSize: '22px',
        height: '100%',
        fontFamily: 'Roboto',
        display: 'flex',
        alignTtems: 'center',
        '& a' : {
            textDecoration:'none',
            color: '#47477b',
        },
        [sizes.down('xs')]:{
            display:'none'
        }
    },
    slider :{
        width: '350px',
        display: 'inline-block',
        margin: '0 10px',
        [sizes.down('sm')]:{
            width: '150px'
        },
        '& .rc-slider-track' : {
            backgroundColor: 'transparent'
        },
        '& .rc-slider-rail' : {
            height: '8px'
        },
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus' : {
            backgroundColor: 'teal',
            outline: 'none',
            border : '2px solid teal',
            boxShadow: 'none',
            width: '13px',
            height: '13px',
            marginTop: '-3px',
            marginLeft: '-7px',
        },
    },
    selectSlider :{
       marginLeft : 'auto'
    }
}