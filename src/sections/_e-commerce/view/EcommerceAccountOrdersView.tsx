import { useState, useMemo } from 'react';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import {
  Box,
  Tab,
  Tabs,
  Table,
  Stack,
  Switch,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Typography,
  TableContainer,
  InputAdornment,
  TablePagination,
  FormControlLabel,
  Card,
} from '@mui/material';
// hooks
import { useOrders } from 'src/services/useOrders';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import LoadingScreen from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';
//
import { EcommerceAccountLayout } from '../layout';
import {
  stableSort,
  getComparator,
  EcommerceAccountOrdersTableRow,
  EcommerceAccountOrdersTableHead,
  EcommerceAccountOrdersTableToolbar,
} from '../account/orders';
import { IOrder, OrderStatus } from 'src/types/order';
import OrderDetailsCard from '../account/orders/OrderDetailsCard';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = {
  'All Orders': 'all',
  'Completed': 'completed',
  'Pending': 'pending',
  'Cancelled': 'cancelled',
  'Refunded': 'refunded',
} as const;

export const TABLE_HEAD = [
  { id: 'orderNumber', label: 'Order ID'},
  { id: 'item', label: 'Item' , width: 120},
  { id: 'deliveryDate', label: 'Delivery date', width: 160 },
  { id: 'price', label: 'Price', width: 120 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersPage() {
  const [tab, setTab] = useState('All Orders');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('orderNumber');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { 
    orders, 
    pagination, 
    isLoading, 
    error: ordersError, 
    mutate: mutateOrders 
  } = useOrders();

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    const status = STATUS_OPTIONS[tab as keyof typeof STATUS_OPTIONS];
    return status === 'all' 
      ? orders 
      : orders.filter((order: IOrder) => order.status === status);
  }, [orders, tab]);

  console.log('Orders data:', {
    rawOrders: orders,
    pagination,
    loading: isLoading,
    error: ordersError
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (ordersError) {
    return (
      <EmptyContent
        title="Error loading orders"
        description={ordersError.message || 'Failed to load orders'}
        imgUrl="/assets/icons/empty/ic_error.svg"
        sx={{ py: 10 }}
      />
    );
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setPage(0);
    setSelected([]);
  };

  const handleSort = (id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredOrders.map((n: IOrder) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    
    if (selectedIndex === -1) {
      newSelected = [id];
    } else {
      newSelected = [];
    }
    
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredOrders.length) : 0;

  const isNotFound = !filteredOrders.length;

  return (
    <EcommerceAccountLayout>
      <Card sx={{ p: 2 }} >
      <Typography variant="h5" sx={{ mb: 1 }}>
        Orders
      </Typography>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
        >
          {Object.keys(STATUS_OPTIONS).map((tab) => (
            <Tab
              key={tab}
              label={tab}
              value={tab}
              icon={
                <Box
                  sx={{
                    mr: 1,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 
                      (tab === 'Completed' && 'success.main') ||
                      (tab === 'Pending' && 'warning.main') ||
                      (tab === 'Cancelled' && 'error.main') ||
                      (tab === 'Refunded' && 'info.main') ||
                      'text.disabled',
                  }}
                />
              }
            />
          ))}
        </Tabs>

        {isNotFound ? (
          <EmptyContent
            title={`No ${tab}`}
            description={`You don't have any ${tab.toLowerCase()} yet`}
            imgUrl="/assets/icons/empty/ic_order.svg"
            sx={{ py: 10 }}
          />
        ) : (
          <>
            <TableContainer>
              <EcommerceAccountOrdersTableToolbar
                rowCount={filteredOrders.length}
                numSelected={selected.length}
                onSelectAllRows={handleSelectAllRows}
              />

              <Scrollbar>
                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                  <EcommerceAccountOrdersTableHead
                    order={order}
                    orderBy={orderBy}
                    onSort={handleSort}
                    headCells={TABLE_HEAD}
                    rowCount={filteredOrders.length}
                    numSelected={selected.length}
                    onSelectAllRows={handleSelectAllRows}
                  />

                  <TableBody>
                    {stableSort(filteredOrders, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: IOrder) => (
                        <EcommerceAccountOrdersTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => handleSelectRow(row.id)}
                        />
                      ))}

                    {emptyRows > 0 && (
                      <TableRow
                        sx={{
                          height: (dense ? 36 : 57) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={9} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <Box sx={{ position: 'relative' }}>
              <TablePagination
                page={page}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />

              <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
                sx={{
                  pl: 2,
                  py: 1.5,
                  top: 0,
                  position: {
                    sm: 'absolute',
                  },
                }}
              />
            </Box>

            {selected.length === 1 && (
              <OrderDetailsCard 
                order={orders.find((order) => order.id === selected[0]) as IOrder} 
              />
            )}
          </>
        )}
      </Card>
    </EcommerceAccountLayout>
  );
}
