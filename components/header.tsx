import ListItemButton from '@mui/material/ListItemButton';
import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText,  } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState, Fragment } from 'react';


type LayoutProps = {
  children?: React.ReactNode
  home?: boolean
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Header = ({ children, home }: LayoutProps) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer =
  (anchor: Anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Fragment key='top'>
              <IconButton size="large" edge="start" color='inherit' aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer('top', true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor='top' open={state['top']} onClose={toggleDrawer('top', false)}>
                {list('top')}
              </Drawer>
            </Fragment>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Posts</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  )
}

export default Header