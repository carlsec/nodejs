import { createTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

/**
 * Configuração do theme
 */

const theme = createTheme({
    typography: {
        uneNextVariantes: true,
    },
    palette: {
        primary: {
            light: '#5c67a3',
            main: '#3f4774',
            dark: '#2e355b',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#000',           
        },
        openTitle: '#3f4771',
        protectedTitle: pink['400'],
        type: 'light'
    }
})

export default theme