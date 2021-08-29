/**
 * Local Storage: o estado de autenticação do usuário será lembrado nas guias de um navegador.
 * Session Storage: o estado de autenticação do usuário só será lembrado na guia da janela atual.
 */


import { signout } from './api-auth.js'

const auth = {
    /** Essa função vai retornar as credenciais ou false, dependendo se as credenciais forem encontradas em sessionStorage. */
    isAuthenticated() {
        if (typeof window == "undefined")
          return false
    
        if (sessionStorage.getItem('jwt'))
          return JSON.parse(sessionStorage.getItem('jwt'))
        else
          return false
      },
    
    /** A authenticate metodo pega o JWT credencial e chama a função. Ele armazena as credenciais em sessionStorage. */
    authenticated(jwt, cb) {
        if (typeof window !== "undefined")
          sessionStorage.setItem('jwt', JSON.stringify(jwt))
        cb()
      },

    /** Metoddo que limpa o jwt e desloga o usuario */
    clearJWT(cb) {
        if(typeof window !== "undefined")
           sessionStorage.removeItem('jwt')
        cb()
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
    }
}

export default auth