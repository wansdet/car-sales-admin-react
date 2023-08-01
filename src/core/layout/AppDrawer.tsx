import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import {
    Divider,
    List,
    ListItem,
    Typography,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import AssessmentIcon from '@mui/icons-material/Assessment'
import BarChartIcon from '@mui/icons-material/BarChart'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/People'
import PieChartIcon from '@mui/icons-material/PieChart'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import Toolbar from '@mui/material/Toolbar'
import ViewListIcon from '@mui/icons-material/ViewList'

import { DrawerHeader } from '@/core/layout'
import {
    IListItem,
    homeItems,
    usersListItems,
    reportsListItems,
    vehiclesListItems,
} from './app-drawer-list-items'

const appTitle = 'Car Sales Admin'
const drawerWidth = 330

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))

export default function AppDrawer() {
    const theme = useTheme()
    const [open, setOpen] = React.useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const ItemIcon = (iconType: string) => {
        switch (iconType) {
            case 'home':
                return <HomeIcon />
            case 'list':
                return <ViewListIcon />
            case 'people':
                return <PeopleIcon />
            case 'report':
                return <AssessmentIcon />
            case 'bar-chart':
                return <BarChartIcon />
            case 'pie-chart':
                return <PieChartIcon />
            case 'stats':
                return <QueryStatsIcon />
            default:
                return <ViewListIcon />
        }
    }

    const ListItems = (items: IListItem[]) => {
        return (
            <List>
                {items.map((item: IListItem) => (
                    <ListItem
                        key={item.index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={selectedIndex === item.index}
                            onClick={(event) =>
                                handleListItemClick(event, item.index)
                            }
                        >
                            <ListItemIcon>{ItemIcon(item.icon)}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleListItemClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index)
    }

    return (
        <React.Fragment>
            <AppBar data-testid="app-bar" position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        data-testid="app-title"
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        {appTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer data-testid="app-drawer" variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {ListItems(homeItems)}
                <Divider />
                {ListItems(vehiclesListItems)}
                <Divider />
                {ListItems(usersListItems)}
                <Divider />
                {ListItems(reportsListItems)}
            </Drawer>
        </React.Fragment>
    )
}
