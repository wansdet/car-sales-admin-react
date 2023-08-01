export interface IListItem {
    index: number
    label: string
    path: string
    icon: string
}

export const homeItems: IListItem[] = [
    {
        index: 0,
        label: 'Home',
        path: '/',
        icon: 'home',
    },
]

export const vehiclesListItems: IListItem[] = [
    {
        index: 1,
        label: 'Vehicle Inventory',
        path: '/vehicles/vehicles-list',
        icon: 'list',
    },
    {
        index: 2,
        label: 'Vehicle Sales',
        path: '/vehicles/vehicle-sales-list',
        icon: 'list',
    },
]

export const usersListItems: IListItem[] = [
    {
        index: 3,
        label: 'Customers',
        path: 'customers/customers-list',
        icon: 'people',
    },
    {
        index: 4,
        label: 'Users',
        path: '/users/users-list',
        icon: 'people',
    },
]

export const reportsListItems: IListItem[] = [
    {
        index: 5,
        label: 'Monthly Sales Report Totals',
        path: '/vehicles/reports/monthly-sales',
        icon: 'bar-chart',
    },
    {
        index: 6,
        label: 'Monthly Sales by Vehicle Type',
        path: '/vehicles/reports/monthly-sales-type',
        icon: 'bar-chart',
    },
    {
        index: 7,
        label: 'Annual Sales Report by Brand',
        path: '/vehicles/reports/annual-sales-brand',
        icon: 'pie-chart',
    },
    /*
    {
        index: 8,
        label: 'Monthly Sales by Employee',
        path: '/reports/sales-report-employee',
        icon: 'report',
    },
     */
]
