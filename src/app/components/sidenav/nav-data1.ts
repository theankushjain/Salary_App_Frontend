export const navbarData = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'employee/manage',
        icon: 'fal fa-user-plus',
        label: 'User Management',
        items:[
            {
                routeLink: 'employee/manage',
                label: 'Employee Management'
            },
            {
                routeLink:'role/manage',
                label: 'Role Management'
            },
            {
                routeLink: 'menu/manage',
                label: "Menu Management"
            },
            {
                routeLink: 'permission/manage',
                label:'Assign Permissions to Roles'
            },

        ]
    },
    {
        routeLink: 'departments/manage',
        icon:'fal fa-building',
        label: 'Branch Management',
        items:[
            {
                routeLink:'department/manage',
                label: 'Branch Management'
            },
        ]
    },
    {
        routeLink: 'salary',
        icon:'fal fa-money',
        label:'Salary Management',
        items: [
            {
                routeLink: 'products/level1.1',
                label: 'Level 1.1',
                items: [
                    {
                        routeLink: 'products/level2.1',
                        label: 'Level 2.1',
                    },
                    {
                        routeLink: 'products/level2.2',
                        label: 'Level 2.2',
                        items: [
                            {
                                routeLink: 'products/level3.1',
                                label: 'Level 3.1'
                            },
                            {
                                routeLink: 'products/level3.2',
                                label: 'Level 3.2'
                            }
                        ]
                    }
                ]
            },
            {
                routeLink: 'products/level1.2',
                label: 'Level 1.2',
            }
        ]
    },
    {
        routeLink: 'transfer',
        icon: 'fal fa-plane',
        label: 'Transfer Employees'
    },
    {
        routeLink: 'settings',
        icon: 'fal fa-cog',
        label: 'Settings',
        expanded: true,
    },
];