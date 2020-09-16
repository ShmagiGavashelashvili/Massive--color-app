import sizes from './sizes';
import bg from './bg.svg';


export default  {
    '@global': {
        '.fade-exit' : {
            opacity : 1
        },
        '.fade-exit-active': {
            opacity : 0,
            transition : 'opacity 500ms ease-out'
        }
    },
        root: {
            /* background by SVGBackgrounds.com */
            backgroundColor: "#ee5522",
            backgroundImage: `url(${bg})`,
            height: '100vh',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent : 'center',
            overflow: 'scroll'
        },
        container : {
            width: '50%',
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            flexWrap: 'wrap',
            [sizes.down('md')]: {
                width: '75%'
            },
            [sizes.down('xs')]: {
               width: '60%'
            }
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            color: 'white',
            alignItems: 'center',
            '& a' : {
                textDecoration: 'none',
                color : 'white',
                marginRight: '35px'
            }
        },
        palettes : {
            boxSizing : 'border-box',
            width: '100%',
            display : 'grid',
            gridTemplateColumns : 'repeat(3, 30%)',
            gridGap : '1rem',
            [sizes.down('sm')]: {
                gridTemplateColumns : 'repeat(2, 50%)'
            },
            [sizes.down('xs')]: {
                gridTemplateColumns : 'repeat(1, 100%)'
            }
        }
    }