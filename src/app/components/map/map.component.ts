/* eslint-disable object-curly-newline */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Compass from '@arcgis/core/widgets/Compass';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Search from '@arcgis/core/widgets/Search';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapView', { static: true }) mapViewDiv: ElementRef | undefined;

  private mapView!: MapView;

  private map!: Map;

  ngOnInit(): void {
    this.map = new Map({
      ground: 'world-elevation',
      basemap: 'satellite',
    });
    this.initializeMapView();
    this.initialiazeWidgets();
  }

  ngOnDestroy(): void {
    if (this.mapView) {
      this.mapView.destroy();
    }
  }

  private initializeMapView(): void {
    this.mapView = new MapView({
      container: this.mapViewDiv?.nativeElement,
      map: this.map,
      center: [64, 41],
      zoom: 6,
    });
  }

  private initialiazeWidgets(): void {
    const searchWidget = new Search({
      view: this.mapView,
    });

    // Add the search widget to the top right corner of the view
    this.mapView.ui.add(searchWidget, {
      position: 'top-right',
    });

    const scaleBar = new ScaleBar({
      view: this.mapView,
      unit: 'dual',
    });

    // Add the ScaleBar widget to the view
    this.mapView.ui.add(scaleBar, 'bottom-left');

    // Create the Compass widget
    const compass = new Compass({
      view: this.mapView,
    });

    this.mapView.ui.add(compass, 'top-left');
  }
}
