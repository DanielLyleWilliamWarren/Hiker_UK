/* eslint-disable object-curly-newline */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import WMTSLayer from '@arcgis/core/layers/WMTSLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Compass from '@arcgis/core/widgets/Compass';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Search from '@arcgis/core/widgets/Search';
import { environment } from 'secrets';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapView', { static: true }) mapViewDiv: ElementRef | undefined;

  private OS_LAYER!: WMTSLayer;

  private mapView!: MapView;

  private map!: Map;

  ngOnInit(): void {
    this.createWMTSLayer();
    this.map = new Map({
      basemap: {
        baseLayers: [this.OS_LAYER],
      },
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
      zoom: 6,
    });
  }

  private createWMTSLayer(): void {
    const wmtsLayer = new WMTSLayer({
      url: 'https://api.os.uk/maps/raster/v1/wmts',
      activeLayer: {
        id: 'Outdoor', // or Outdoor / Light
      },
      // Important: add your API key
      customParameters: {
        key: environment.osMaps.apiKey,
      },
    });
    this.OS_LAYER = wmtsLayer;
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
