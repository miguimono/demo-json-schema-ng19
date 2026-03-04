import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { SchemaSettings } from '@miguimono/json-schema/ng19';
import { ConfigBannerComponent } from './config-banner/config-banner.component';
import { DEFAULT_SCHEMA_DATA } from './data/default-schema-data';
import { SchemaComponent } from './schema/schema.component';
import { buildInitialSettings } from './shared/playground-defaults';
import { TitleModuleComponent } from './title-module/title-module.component';

@Component({
  selector: 'app-root',
  imports: [
    SchemaComponent,
    CommonModule,
    ConfigBannerComponent,
    TitleModuleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private platformId = inject(PLATFORM_ID);

  isBrowser = isPlatformBrowser(this.platformId);
  title = 'json-schema-ng19';

  defaultJsonObject = structuredClone(DEFAULT_SCHEMA_DATA);
  renderData: unknown = structuredClone(DEFAULT_SCHEMA_DATA);

  schemaTitle = 'JsonSchema-ng19';
  schemaLibraryVersion = '2.2.0';
  settingsFormModel: SchemaSettings = buildInitialSettings();

  onSettingsChange(settings: SchemaSettings): void {
    this.settingsFormModel = settings;
  }

  onRenderDataChange(data: unknown): void {
    this.renderData = data;
  }
}
