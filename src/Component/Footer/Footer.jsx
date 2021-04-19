import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AiFillGithub,  } from 'react-icons/ai';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '20px',
    background: "linear-gradient(45deg, #1b2145 30%, rgb(97 97 97 / 90%) 90%)",
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fafafa'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
  
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <AppBar position='relative' className={classes.root} color='secondary'>
      <Toolbar className={classes.toolbar}>
        <a className={classes.flex} href='https://github.com/Vldkvll'>
          <AiFillGithub color='#fafafa' size='48px' />
          <Typography variant='h4'>Github</Typography>
        </a>
        
      </Toolbar>
    </AppBar>
  )
}

export default Footer;