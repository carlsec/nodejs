import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'


const isActive = (history, path) => {
    if (history.location.pathname == path)
      return {color: '#ff4081'}
    else
      return {color: '#ffffff'}
  }

  const Menu = withRouter(({history}) => (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon/>
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive(history, "/users")}>Users</Button>
        </Link>
        {
        /**Aqui verificamos se o usuario esta autenticado pois os botões não devem aparecer se o usuario estiver logado*/
        !auth.isAuthenticated() && (<span>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In
              </Button>
            </Link>
          </span>)
        }
        {
        /**Aqui verificamos se o usuario esta autenticado pois os botões devem aparecer*/
        auth.isAuthenticated() && (<span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
            </Link>
            <Button color="inherit" onClick={() => {
                auth.clearJWT(() => history.push('/'))
              }}>Sign out</Button>
          </span>)
        }
      </Toolbar>
    </AppBar>
  ))

  export default Menu