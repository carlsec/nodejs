import React from 'react'
import { Avatar, IconButton, List, ListItemAvatar, ListItemText, Paper, Typography } from "@material-ui/core";
import { ArrowForward, Person } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list } from "./api-user";
import { makeStyles } from '@material-ui/styles'


/** Estamos usando a React Hook para adionar o estado dessse componente de função */

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(1),
      margin: theme.spacing(5)
    },
    title: {
      margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    }
  }))

export default function Users() {
    const classes = useStyles()
    const [users, setUsers] = useState([])
    
    /**Usamos o useEffect para chamar o metodo list do user-api.js */
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setUsers(data)
            }
        })

        return function cleanup(){
            abortController.abort() /** Abortar a busca quando o comportamento desmonta */
        }
    }, [])

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => {
                    return <Link to={"/user/" + item._id} key={i}>
                        <ListItemAvatar>
                            <Avatar>
                                <Person/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.name}/>
                        <IconButton>
                            <ArrowForward/>
                        </IconButton>
                    </Link>
                })
            }
            </List>
        </Paper>
    )
}