import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
    type OrderType,
    type ProductType,
} from '../../utils/interface/interface';
import { type Column } from '../../constant/columns';
import COLOR from '../../constant/color';
import {
    DeleteIcon,
    UpdateIcon,
    ViewIcon,
} from '../../containers/Cart/cart.styled';

interface PropsType {
    data: ProductType[] | OrderType[];
    total: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    columns: readonly Column[];
    deleteAction?: (id: number) => void;
    editAction?: (id: number) => Promise<void>;
    viewAction?: (id: number) => void;
    id: 'product_id' | 'order_id';
}
const AppTable = ({
    data,
    total,
    page,
    setPage,
    columns,
    deleteAction,
    editAction,
    viewAction,
    id,
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
                                    style={{
                                        zIndex: 8000,
                                        minWidth: column.minWidth,
                                        backgroundColor: COLOR.lightPrimary,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                style={{
                                    backgroundColor: COLOR.lightPrimary,
                                }}
                            >
                                Actions
                            </TableCell>
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
                                        const value = (
                                            row as ProductType & OrderType
                                        )[column.id];
                                        return (
                                            <TableCell
                                                key={index}
                                                align={column.align}
                                                sx={{ padding: '30px 15px' }}
                                            >
                                                {column.format
                                                    ? column.format(
                                                          value as string
                                                      )
                                                    : value}
                                                {}
                                            </TableCell>
                                        );
                                    })}

                                    <TableCell>
                                        {viewAction && (
                                            <ViewIcon
                                                onClick={() => {
                                                    if (viewAction && id in row)
                                                        viewAction(
                                                            Number(
                                                                row[
                                                                    id as keyof typeof row
                                                                ]
                                                            )
                                                        );
                                                }}
                                            />
                                        )}

                                        {editAction && (
                                            <UpdateIcon
                                                onClick={() => {
                                                    if (editAction && id in row)
                                                        editAction(
                                                            Number(
                                                                row[
                                                                    id as keyof typeof row
                                                                ]
                                                            )
                                                        ).catch((err) => {
                                                            console.log(err);
                                                        });
                                                }}
                                            />
                                        )}

                                        {deleteAction && (
                                            <DeleteIcon
                                                onClick={() => {
                                                    if (deleteAction)
                                                        deleteAction(
                                                            Number(
                                                                row[
                                                                    id as keyof typeof row
                                                                ]
                                                            )
                                                        );
                                                }}
                                            />
                                        )}
                                    </TableCell>
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
