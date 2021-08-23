import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'

/**
 * O MainRouter vai ajudar a renderizar nosso codigo customizado do React componentes com respeito as localizações
 * na aplicação.
 * Swith: Swith e um componente in React Router que renderiza a rota chamada.
 */

 const MainRouter = () => {
    return ( <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
      </Switch>
    </div>
   )
}
export default MainRouter