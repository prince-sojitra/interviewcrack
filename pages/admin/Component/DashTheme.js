import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useState } from 'react';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

function Page() {
    const router = useRouter();
    const pathnames = router.pathname.split('/').filter((x) => x);
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            {/* <Link href="/admin" color="inherit">
                Dashboard
            </Link> */}
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return last ? (
                    <Typography color="textPrimary" key={index} sx={{ color: "white" }}>
                        {value === 'admin' ? 'Dashboard' : value.split("").map((el, i) => i === 0 ? el.toUpperCase() : el)}
                    </Typography>
                ) : (
                    <Link href={to} color="textPrimary" key={index} style={{ color: "white" }}>
                        {value === 'admin' ? 'Dashboard' : value.split("").map((el, i) => i === 0 ? el.toUpperCase() : el)}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}



const drawerWidth = 240;

function DashTheme(props) {
    let router = useRouter()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const LogoutBTN = () => {
        localStorage.removeItem('Admin_Token')
        router.push('/admin/login')
    }

    let menuData = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: <SpaceDashboardIcon />
        },
        {
            name: "Category",
            path: "/admin/category",
            icon: <CategoryIcon />
        },
        {
            name: "Sub Category",
            path: "/admin/subcategory",
            icon: <ControlPointDuplicateIcon />
        },
        {
            name: "Q & A",
            path: "/admin/questionanswer",
            icon: <HelpOutlineIcon />
        }
    ]

    const drawer = (
        <div>
            <Toolbar sx={{backgroundColor : "#1976d2",color : 'white'}}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Interview Portal
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuData.map((text) => (
                    <Link href={text.path} key={text.name} >
                        <ListItem >
                            <ListItemButton sx={{ backgroundColor: router.pathname === text.path ? '#1976d2' : '', borderRadius: router.pathname === text.path ? '5px' : '', color: router.pathname === text.path ? '#fff' : '#000000DE', "&:hover": { backgroundColor: router.pathname === text.path ? '#1976d2' : '' } }}>
                                <ListItemIcon sx={{ color: router.pathname === text.path ? '#fff' : '', borderRadius: router.pathname === text.path ? '5px' : '' }}>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: 360, color: "white" }}>
                        <Page />
                    </Box>
                    <Box>
                        <IconButton aria-label="delete" size="large" sx={{color : 'white'}} onClick={LogoutBTN}>
                            <MeetingRoomIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}

DashTheme.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default DashTheme;
