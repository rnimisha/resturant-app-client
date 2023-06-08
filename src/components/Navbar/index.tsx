import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import NAVITEMS from '../../constant/navitems';
import { Button } from '@mui/material';
import COLOR from '../../constant/color';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const Navbar = (props: Props) => {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
            Resturnant Name
        </Typography>
        <Divider />
        <List>
            {NAVITEMS.map((item, index) => (
            <ListItem key={index} disablePadding>
                <Link to={item.path}>
                    <ListItemButton sx={{ textAlign: 'center', color: 'black'}}>
                        <ListItemText primary={item.name} sx={{textDecoration: 'none'}}/>
                    </ListItemButton>
                </Link>
            </ListItem>
            ))}
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar component="nav" elevation={0}  sx={{backgroundColor: COLOR.primary, boxShadow: '-1px 6px 5px -1px rgba(252,228,177,0.21)'}}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    color={COLOR.black}
                    fontWeight={'bold'}
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Resturant
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {NAVITEMS.map((item, index) => (
                        <Link to ={item.path} key={index}>
                            <Button sx={{ color: COLOR.black }}>
                                {item.name}
                            </Button>
                        </Link>
                    ))}
                </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}

export default Navbar