/**
 * O top-leval React componente vai conter todos os componentes das aplicações definidas nesse arquivo.
 * Configuramos o react componentes para usar o Material-UI, habilitamos o roteamente do FrontEnd e
 * garantimos que o react carregue todos os seus componentes.
 * 
 * O frontend vai ser acessado com a routa especifica em MainRouter componente.
 * MainRouter componente com ThemeProvider, o que dá a ele acesso ao tema Material-UI e BrowserRouter, 
 * que permite o roteamento de front-end com React Router.
 */

 import React from 'react'
 import MainRouter from './MainRouter'
 import {BrowserRouter} from 'react-router-dom'
 import { ThemeProvider } from '@material-ui/styles'
 import theme from './theme'
 import { hot } from 'react-hot-loader'

 // Depois que o codigo e bem renderizado no server-side, nos precisamos remover o server-side injection CSS quando o root react e montado.
const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
    return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter/>
        </ThemeProvider>
    </BrowserRouter>
)}

export default hot(module)(App)
