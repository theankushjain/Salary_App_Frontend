import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { MenuService } from 'src/app/services/menu.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface NavbarItem {
  routeLink: string;
  icon: string;
  label: string;
  items?: NavbarItem[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})

export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(public router: Router, private menuService: MenuService) {}

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      this.getMenus();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  getMenus() {
    this.menuService.getMenus().subscribe(
      (response: any) => {
        navbarData.length = 0;
        navbarData.push(...this.transformApiData(response));
      },
      (error) => {
        console.log(error);
      }
    );
  }


  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  
 transformApiData(apiData: any[]): NavbarItem[] {
  const transformedData: NavbarItem[] = [];
  const topLevelItems = apiData.filter((item) => !item.parentMenu);

  topLevelItems.forEach((item) => {
    const topLevelItem: NavbarItem = {
      routeLink: item.routeLink,
      icon: item.icon,
      label: item.label,
      items: [],
    };

    const childItems = apiData.filter((child) => child.parentMenu?.id === item.id);
    if (childItems.length > 0) {
      topLevelItem.items = this.transformApiData(childItems);
    }

    transformedData.push(topLevelItem);
  });

  const remainingItems = apiData.filter((item) => item.parentMenu);
  remainingItems.forEach((item) => {
    const parentItem = transformedData.find((i) => i.label === item.parentMenu?.label);
    if (parentItem) {
      parentItem.items?.push({
        routeLink: item.routeLink,
        icon: item.icon,
        label: item.label,
        items: [],
      });
    }
  });
  return transformedData;
 }

  
}
