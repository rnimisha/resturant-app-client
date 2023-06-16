import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { type navType } from '../../constant/navitems';

import { Link } from 'react-router-dom';
import COLOR from '../../constant/color';
import { MiniIcon } from '../CountCard/CountCard.styled';

interface PropsType {
    navlist: navType;
    open: boolean;
}

const NavList = ({ navlist, open }: PropsType): JSX.Element => {
    return (
        <List>
            {navlist.map((item, index) => (
                <Link to={item.path} key={index}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: COLOR.black,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <span>
                                    <MiniIcon className="material-symbols-rounded">
                                        {item.icon}
                                    </MiniIcon>
                                </span>
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}
        </List>
    );
};

export default NavList;
