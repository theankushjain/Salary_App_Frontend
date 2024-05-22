import { LocationService } from 'src/app/services/location.service';
import { ChartData, ChartType } from 'chart.js';
import { RolesService } from './../../services/roles.service';
import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';

interface HierarchicalLocation {
  name: string;
  value: number; // Number of users
  children?: HierarchicalLocation[];
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent {

  public regionChartLabels: string[] = [];
  public regionChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
  };

  public roleChartLabels: string[] = [];
  public roleChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [] // Set the background colors for each slice
      }
    ]
  };
  public currentLevel: HierarchicalLocation[] = [];
  public currentLevelLabels: string[] = [];
  public currentLevelData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
  };

  constructor(private usersService: UsersService, private locationService: LocationService) {
    this.getUsers();
    this.getLocations();
  }


  getUsers() {
    this.usersService.getUser().subscribe(
      (response: any) => {
        console.log(response);
        this.prepareRoleChartData(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  prepareRoleChartData(userData: any[]) {
    const roleCountMap = new Map<string, number>();

    // Count the number of users for each role
    userData.forEach(user => {
      user.roles.forEach((role:any) => {
        const roleName = role.name;
        const count = roleCountMap.get(roleName) || 0;
        roleCountMap.set(roleName, count + 1);
      });
    });

    // Extract labels and data for the chart
    this.roleChartLabels = Array.from(roleCountMap.keys());
    this.roleChartData.labels = this.roleChartLabels;
    this.roleChartData.datasets[0].data = Array.from(roleCountMap.values());
    // Optionally set the background colors for each slice
    this.roleChartData.datasets[0].backgroundColor = this.getRandomColors(this.roleChartLabels.length);
  }

  getLocations() {
    this.locationService.getLocations().subscribe(
      (response: any) => {
        console.log(response);
        const hierarchicalLocationData = this.prepareHierarchicalLocationData(response);
        this.initializeRegionChartData(hierarchicalLocationData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  prepareHierarchicalLocationData(locationData: any[]): HierarchicalLocation[] {
    const hierarchicalLocations: HierarchicalLocation[] = [];

    // Helper function to recursively build the hierarchical structure
    const buildHierarchy = (locations: any[], parentLocation?: HierarchicalLocation) => {
      const locationMap = new Map<string, HierarchicalLocation>();

      locations.forEach(location => {
        const locationName = location.name;
        const userCount = location.users ? location.users.length : 0;

        const hierarchicalLocation: HierarchicalLocation = {
          name: locationName,
          value: userCount,
          children: []
        };

        locationMap.set(locationName, hierarchicalLocation);

        if (parentLocation) {
          parentLocation.children?.push(hierarchicalLocation);
        } else {
          hierarchicalLocations.push(hierarchicalLocation);
        }

        const childLocations = locationData.filter(l => l.parent && l.parent.name === locationName);
        buildHierarchy(childLocations, hierarchicalLocation);
      });
    };

    // Start building the hierarchy from the top-level locations
    const topLevelLocations = locationData.filter(location => !location.parent);
    buildHierarchy(topLevelLocations);

    return hierarchicalLocations;
  }

  initializeRegionChartData(hierarchicalLocationData: HierarchicalLocation[]) {
    this.currentLevel = hierarchicalLocationData;
    this.regionChartLabels = hierarchicalLocationData.map(region => region.name);
    this.regionChartData.labels = this.regionChartLabels;
    this.regionChartData.datasets[0].data = hierarchicalLocationData.map(region => region.value);
    this.regionChartData.datasets[0].backgroundColor = this.getRandomColors(hierarchicalLocationData.length);

    this.currentLevelLabels = this.regionChartLabels;
    this.currentLevelData = this.regionChartData;
  }

  // Helper function to generate random colors
  getRandomColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    return colors;
  }

  onChartClick(event: any) {
    if (event.active.length > 0) {
      const clickedIndex = event.active[0]._index;
      const clickedItem = this.currentLevel[clickedIndex];
  
      if (clickedItem.children) {
        this.currentLevel = clickedItem.children;
        this.currentLevelLabels = this.currentLevel.map(item => item.name);
        this.currentLevelData = {
          labels: this.currentLevelLabels,
          datasets: [
            {
              data: this.currentLevel.map(item => item.value),
              backgroundColor: this.getRandomColors(this.currentLevel.length)
            }
          ]
        };
      } else {
        // Reached the lowest level (districts)
        const parentLevel = this.findParentLevel(clickedItem);
        if (parentLevel) {
          this.initializeRegionChartData(parentLevel);
        } else {
          // Reset to the initial level (regional offices)
          this.initializeRegionChartData(this.currentLevel);
        }
      }
    }
  }
  
  findParentLevel(item: HierarchicalLocation): HierarchicalLocation[] | null {
    const parentLevel: HierarchicalLocation[] = [];
  
    let currentLevel = this.currentLevel;
    let found = false;
  
    while (!found && currentLevel.length > 0) {
      const parentItem = currentLevel.find(i => i.children && i.children.includes(item));
      if (parentItem) {
        if (parentItem.children) {
          parentLevel.push(...parentItem.children);
        }
        found = true;
      } else {
        const grandParentLevel = currentLevel.flatMap(i => (i.children ? i.children : []));
        currentLevel = grandParentLevel;
      }
    }
  
    return found ? parentLevel : null;
  }

}
