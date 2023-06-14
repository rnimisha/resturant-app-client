import { Box } from '@mui/material';
import SideNav from '../components/Sidenav';

const AdminRoot = (): JSX.Element => {
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <SideNav />
            </Box>
        </>
    );
};

export default AdminRoot;
