import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { RolesService } from "src/app/services/roles.service";

export interface Role {
    name: string;
    // Other properties in your role object
  }

export const Languages = [
    {
        language:'English',
        symbol: 'EN'
    },
    {
        language:'Hindi',
        symbol: 'HI'
    }
];

export const notifications = [
    {
        icon: 'far fa-cloud-download',
        subject: 'Download Complete',
        description: 'Lorem ipsum dolor sit amet consectetur  quisquam.'
    },
    {
        icon: 'far fa-cloud-upload',
        subject: 'Upload Complete',
        description: 'Lorem ipsum dolor sit amet consectetur  quisquam.'
    },
    {
        icon: 'far fa-trash',
        subject: '350 MB Trash Files',
        description: 'Lorem ipsum dolor sit amet consectetur  quisquam.'
    },
];

export const userItems = [
    {
        icon: 'far fa-user',
        label: 'Profile'
    },
    {
        icon: 'far fa-cog',
        label: 'Settings'
    },
    {
        icon: 'far fa-unlock-alt',
        label: 'Lock Screen'
    },
    {
        icon: 'far fa-power-off',
        label: 'Logout',
        condition: 'loggedIn',
        action: 'logoutUser()'
    }
]