import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { type ProductType } from '../../utils/interface/interface';
import { type Column } from '../../constant/columns';

interface PropsType {
    data: ProductType[];
    total: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    columns: readonly Column[];
}
const AppTable = ({
    data,
    total,
    page,
    setPage,
    columns,
}: PropsType): JSX.Element => {
    const handleChangePage = (event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data?.map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index}
                                >
                                    {columns.map((column, index) => {
                                        return (
                                            <TableCell
                                                key={index}
                                                align={column.align}
                                            >
                                                {row[column.id]}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>edit delete</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage=""
                rowsPerPageOptions={[]}
                component="div"
                count={total}
                rowsPerPage={6}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
};

export default AppTable;
