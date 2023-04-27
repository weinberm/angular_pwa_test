import { Component, OnInit } from '@angular/core';
import { ILocation } from './ILocations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  offline: boolean = false;

  public locations : ILocation[] = []

  ngOnInit() {
    this.offline = !navigator.onLine;
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  updateOnlineStatus() {
    this.offline = !navigator.onLine;
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // alert(
          //   `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
          // );
          var x : ILocation = {latitude :position.coords.latitude, longitude: position.coords.longitude}
          this.locations.push(x)
          console.log(this.locations)
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}