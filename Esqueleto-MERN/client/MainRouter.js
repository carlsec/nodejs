import React from 'react'
import PrivateRoute from './auth/PrivateRoute'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Menu from './core/Menu'
/**
 * O MainRouter vai ajudar a renderizar nosso codigo customizado do React componentes com respeito as localizações
 * na aplicação.
 * Swith: Swith e um componente in React Router que renderiza a rota chamada.
 */

 const MainRouter = () => {
    return (<div>
    <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
      </Switch>
    </div>
   )
}

export default MainRouter