import { Box } from '@mui/material';
import SideNav from '../components/Sidenav';

const AdminRoot = (): JSX.Element => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
            </Box>
        </>
    );
};

export default AdminRoot;
