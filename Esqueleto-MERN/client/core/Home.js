import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import visionImg from './../assets/computer-vision-machine-learning-1024x630-1.jpg'
import { Link } from "react-router-dom";
/**
 * Material-UI usa JSS, que e um CSS-in-JS stilo para stilizar nossos componentes.
 */

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}))

/**
 * Função que define e exporta a função componente Home.
 */

export default function Home(){
    const classes = useStyles()
      return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                  Home Page
            </Typography>
            <Link to="/users">Users</Link><br/>
            <Link to="/signup">Cadastrar</Link><br/>
            <Link to="/signin">Logar</Link><br/>
            <CardMedia className={classes.media}
                         image={visionImg} title="Computer Vision"/>
            <CardContent>
                <Typography variant="body2" component="p">
                      Welcome to the MERN Skeleton home page
                </Typography>
            </CardContent>
        </Card>
    )
}