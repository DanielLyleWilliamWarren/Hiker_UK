/* eslint-disable object-curly-newline */
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import Basemap from '@arcgis/core/Basemap';
import WMTSLayer from '@arcgis/core/layers/WMTSLayer';
import '@arcgis/map-components/components/arcgis-locate';
import '@arcgis/map-components/dist/components/arcgis-compass';
import '@arcgis/map-components/dist/components/arcgis-map';
import '@arcgis/map-components/dist/components/arcgis-scale-bar';
import '@arcgis/map-components/dist/components/arcgis-zoom';
import { environment } from 'secrets';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class MapComponent implements OnInit {
  @ViewChild('view', { static: true }) mapViewDiv!: ElementRef;

  ngOnInit(): void {
    this.initializeMap();
  }

  /**
   * The initializeMap function creates a map with a WMTS layer showing topographic data and sets the initial
   * view to the central highlands.
   */
  private initializeMap(): void {
    const wmtsLayer = new WMTSLayer({
      url: '/os-proxy',
      activeLayer: { id: 'Outdoor_3857', tileMatrixSetId: 'EPSG:3857' },
      customParameters: {
        key: environment.osMaps.apiKey,
      },
      serviceMode: 'KVP',
      copyright: 'Contains OS data © Crown copyright and database right 2023',
    });

    const customBasemap = new Basemap({
      baseLayers: [wmtsLayer],
      title: 'OS Maps',
    });
    this.mapViewDiv.nativeElement.basemap = customBasemap;
  }
}
