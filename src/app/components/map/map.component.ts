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
  @ViewChild('view', { static: true }) mapViewDiv: ElementRef | undefined;

  private view!: MapView;

  ngOnInit(): void {
    this.initializeMap();
    this.initialiazeWidgets();
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }

  private initializeMap(): void {
    const wmtsLayer = new WMTSLayer({
      url: '/os-proxy',
      activeLayer: { id: 'Outdoor_3857', tileMatrixSetId: 'EPSG:3857' },

      customParameters: {
        key: environment.osMaps.apiKey,
      },

      copyright: 'Contains OS data © Crown copyright and database right 2023',

    });

    const map = new Map({
      basemap: {
        baseLayers: [wmtsLayer],
      },
    });

    this.view = new MapView({
      container: this.mapViewDiv?.nativeElement,
      map,
      center: [-3.435973, 52.378051],
      constraints: { minScale: 2000, maxScale: 130000000 },
      scale: 500000,
    });
  }

  private initialiazeWidgets(): void {
    const searchWidget = new Search({
      view: this.view,
    });

    // Add the search widget to the top right corner of the view
    this.view.ui.add(searchWidget, {
      position: 'top-right',
    });

    const scaleBar = new ScaleBar({
      view: this.view,
      unit: 'dual',
    });

    // Add the ScaleBar widget to the view
    this.view.ui.add(scaleBar, 'bottom-left');

    // Create the Compass widget
    const compass = new Compass({
      view: this.view,
    });

    this.view.ui.add(compass, 'top-left');
  }
}
