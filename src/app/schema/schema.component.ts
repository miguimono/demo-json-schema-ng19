import {
  ImageFit,
  ImageShape,
  SchemaComponent as JsonSchema,
  SchemaSettings,
} from '@miguimono/json-schema/ng19';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  TemplateRef,
} from '@angular/core';
import { environment } from '../../environments/environment';
import { getFullSchemaDefaults } from '../shared/schema-settings-defaults';

const FULL_DEFAULTS = getFullSchemaDefaults();

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
  imports: [JsonSchema],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaComponent {
  readonly showJsonDebugSection = environment.schemaDebug.showJsonSection;
  readonly showSchemaInputsDebugSection =
    environment.schemaDebug.showSchemaInputsSection;

  // --- Inputs básicos ---
  // title = input<string>('json-schema-ng19: ');
  id = input<number | string | null>(null);
  schemeData = input<any | null>(null);
  schemaSettings = input<SchemaSettings | null>(null);

  showLegend = input<boolean>(true);
  legendTitle = input<string>('Leyenda de colores');

  // --- Mensajes ---
  isLoading = input<boolean>(FULL_DEFAULTS.messages.isLoading);
  isError = input<boolean>(FULL_DEFAULTS.messages.isError);
  emptyMessage = input<string>(FULL_DEFAULTS.messages.emptyMessage);
  loadingMessage = input<string>(FULL_DEFAULTS.messages.loadingMessage);
  errorMessage = input<string>(FULL_DEFAULTS.messages.errorMessage);

  // --- Colores / acentos ---
  linkStroke = input<string>(FULL_DEFAULTS.colors.linkStroke);
  linkStrokeWidth = input<number>(FULL_DEFAULTS.colors.linkStrokeWidth);
  accentByKey = input<string | null>(FULL_DEFAULTS.colors.accentByKey);
  accentInverse = input<boolean>(FULL_DEFAULTS.colors.accentInverse);
  accentFill = input<boolean>(FULL_DEFAULTS.colors.accentFill);
  showColorTrue = input<boolean>(FULL_DEFAULTS.colors.showColorTrue);
  showColorFalse = input<boolean>(FULL_DEFAULTS.colors.showColorFalse);
  showColorNull = input<boolean>(FULL_DEFAULTS.colors.showColorNull);
  colorTrue = input<string>(FULL_DEFAULTS.colors.colorTrue);
  colorFalse = input<string>(FULL_DEFAULTS.colors.colorFalse);
  colorNull = input<string>(FULL_DEFAULTS.colors.colorNull);

  descriptionShowColorTrue = input<string | null>(null);
  descriptionShowColorFalse = input<string | null>(null);
  descriptionShowColorNull = input<string | null>(null);

  // --- Layout ---
  layoutDirection = input<'RIGHT' | 'DOWN'>(
    FULL_DEFAULTS.layout.layoutDirection,
  );
  layoutAlign = input<'firstChild' | 'center'>(
    FULL_DEFAULTS.layout.layoutAlign,
  );
  linkStyle = input<'curve' | 'orthogonal' | 'line'>(
    FULL_DEFAULTS.layout.linkStyle,
  );
  curveTension = input<number>(FULL_DEFAULTS.layout.curveTension);
  straightThresholdDx = input<number>(FULL_DEFAULTS.layout.straightThresholdDx);
  columnGapPx = input<number>(FULL_DEFAULTS.layout.columnGapPx);
  rowGapPx = input<number>(FULL_DEFAULTS.layout.rowGapPx);

  // --- Viewport ---
  viewportHeight = input<number | null>(FULL_DEFAULTS.viewport.height);
  minViewportHeight = input<number | null>(FULL_DEFAULTS.viewport.minHeight);
  showToolbar = input<boolean>(FULL_DEFAULTS.viewport.showToolbar);
  toolbarShowLinkStyle = input<boolean>(
    FULL_DEFAULTS.viewport.toolbarControls.showLinkStyle,
  );
  toolbarShowLayoutAlign = input<boolean>(
    FULL_DEFAULTS.viewport.toolbarControls.showLayoutAlign,
  );
  toolbarShowLayoutDirection = input<boolean>(
    FULL_DEFAULTS.viewport.toolbarControls.showLayoutDirection,
  );

  // --- DataView ---
  jsonTitleKeys = input<string[]>(FULL_DEFAULTS.dataView.titleKeyPriority);
  hiddenKeysGlobal = input<string[]>(FULL_DEFAULTS.dataView.hiddenKeysGlobal);
  treatScalarArraysAsAttribute = input<boolean>(
    FULL_DEFAULTS.dataView.treatScalarArraysAsAttribute,
  );
  maxDepth = input<number | null>(FULL_DEFAULTS.dataView.maxDepth);
  labelData = input<Record<string, string>>(FULL_DEFAULTS.dataView.labelData);
  previewMaxKeys = input<number>(FULL_DEFAULTS.dataView.previewMaxKeys);
  valueMaxChars = input<number | null>(FULL_DEFAULTS.dataView.valueMaxChars);
  valueShowTooltip = input<boolean>(FULL_DEFAULTS.dataView.valueShowTooltip);
  noWrapKeys = input<string[]>(FULL_DEFAULTS.dataView.noWrapKeys);
  maxCardWidth = input<number | null>(FULL_DEFAULTS.dataView.maxCardWidth);
  maxCardHeight = input<number | null>(FULL_DEFAULTS.dataView.maxCardHeight);
  defaultNodeWidth = input<number>(
    FULL_DEFAULTS.dataView.defaultNodeSize.width,
  );
  defaultNodeHeight = input<number>(
    FULL_DEFAULTS.dataView.defaultNodeSize.height,
  );

  showImage = input<string | null>(FULL_DEFAULTS.dataView.showImage);
  imageSizePx = input<number>(FULL_DEFAULTS.dataView.imageSizePx);
  imageShape = input<ImageShape>(FULL_DEFAULTS.dataView.imageShape);
  imageBorder = input<boolean>(FULL_DEFAULTS.dataView.imageBorder);
  imageBg = input<string | null>(FULL_DEFAULTS.dataView.imageBg);
  imageFit = input<ImageFit>(FULL_DEFAULTS.dataView.imageFit);
  imageFallback = input<string | null>(FULL_DEFAULTS.dataView.imageFallback);

  enableCollapse = input<boolean>(FULL_DEFAULTS.dataView.enableCollapse);
  allowCardTextSelection = input<boolean>(
    FULL_DEFAULTS.dataView.allowCardTextSelection,
  );
  showCopyAllButton = input<boolean>(FULL_DEFAULTS.dataView.showCopyAllButton);
  autoResizeCards = input<boolean>(FULL_DEFAULTS.dataView.autoResizeCards);
  paddingWidthPx = input<number>(FULL_DEFAULTS.dataView.paddingWidthPx);
  paddingHeightPx = input<number>(FULL_DEFAULTS.dataView.paddingHeightPx);

  // --- Template para las cards ---
  cardTemplate = input<TemplateRef<any> | null>(null);

  /** Se renderiza la leyenda si hay al menos una descripción y no está forzada a ocultarse. */
  legendVisible = computed<boolean>(() => {
    if (!this.showLegend()) return false;
    return [
      this.descriptionShowColorTrue(),
      this.descriptionShowColorFalse(),
      this.descriptionShowColorNull(),
    ].some((text) => !!text);
  });

  effectiveAccentByKey = computed<string | null>(
    () => this.resolvedSettings().colors?.accentByKey ?? null,
  );

  effectiveAccentInverse = computed<boolean>(
    () => this.resolvedSettings().colors?.accentInverse ?? false,
  );

  /**
   * Ítems de leyenda aplicando accentInverse:
   * - accentInverse = false → verde=true, rojo=false.
   * - accentInverse = true  → verde=false, rojo=true.
   * - gris siempre representa null.
   */
  legendItems = computed<{ color: 'green' | 'red' | 'grey'; text: string }[]>(
    () => {
      const items: { color: 'green' | 'red' | 'grey'; text: string }[] = [];
      const inv = this.effectiveAccentInverse();

      const tTrue = this.descriptionShowColorTrue();
      const tFalse = this.descriptionShowColorFalse();
      const tNull = this.descriptionShowColorNull();

      const greenText = inv ? tFalse : tTrue;
      const redText = inv ? tTrue : tFalse;

      if (greenText) items.push({ color: 'green', text: greenText });
      if (redText) items.push({ color: 'red', text: redText });
      if (tNull) items.push({ color: 'grey', text: tNull });

      return items;
    },
  );

  legendColorMap = computed<Record<'green' | 'red' | 'grey', string>>(() => {
    const colors = this.resolvedSettings().colors;
    return {
      green: colors?.colorTrue ?? FULL_DEFAULTS.colors.colorTrue,
      red: colors?.colorFalse ?? FULL_DEFAULTS.colors.colorFalse,
      grey: colors?.colorNull ?? FULL_DEFAULTS.colors.colorNull,
    };
  });

  /** Mapa completo de configuración para el <schema> interno. */

  legacySettings = computed<SchemaSettings>(() => ({
    messages: {
      isLoading: this.isLoading(),
      isError: this.isError(),
      emptyMessage: this.emptyMessage(),
      loadingMessage: this.loadingMessage(),
      errorMessage: this.errorMessage(),
    },
    colors: {
      linkStroke: this.linkStroke(),
      linkStrokeWidth: this.linkStrokeWidth(),
      accentByKey: this.accentByKey(),
      accentFill: this.accentFill(),
      accentInverse: this.accentInverse(),
      showColorTrue: this.showColorTrue(),
      showColorFalse: this.showColorFalse(),
      showColorNull: this.showColorNull(),
      colorTrue: this.colorTrue(),
      colorFalse: this.colorFalse(),
      colorNull: this.colorNull(),
    },
    layout: {
      layoutDirection: this.layoutDirection(),
      layoutAlign: this.layoutAlign(),
      linkStyle: this.linkStyle(),
      curveTension: this.curveTension(),
      straightThresholdDx: this.straightThresholdDx(),
      columnGapPx: this.columnGapPx(),
      rowGapPx: this.rowGapPx(),
    },
    viewport: {
      height: this.viewportHeight() ?? undefined,
      minHeight: this.minViewportHeight() ?? undefined,
      showToolbar: this.showToolbar(),
      toolbarControls: {
        showLinkStyle: this.toolbarShowLinkStyle(),
        showLayoutAlign: this.toolbarShowLayoutAlign(),
        showLayoutDirection: this.toolbarShowLayoutDirection(),
      },
    },
    dataView: {
      titleKeyPriority: this.jsonTitleKeys(),
      hiddenKeysGlobal: this.hiddenKeysGlobal(),
      treatScalarArraysAsAttribute: this.treatScalarArraysAsAttribute(),
      maxDepth: this.maxDepth(),
      labelData: this.labelData(),
      previewMaxKeys: this.previewMaxKeys(),
      valueMaxChars: this.valueMaxChars(),
      valueShowTooltip: this.valueShowTooltip(),
      noWrapKeys: this.noWrapKeys(),
      maxCardWidth: this.maxCardWidth(),
      maxCardHeight: this.maxCardHeight(),
      defaultNodeSize: {
        width: this.defaultNodeWidth(),
        height: this.defaultNodeHeight(),
      },
      showImage: this.showImage(),
      imageSizePx: this.imageSizePx(),
      imageShape: this.imageShape(),
      imageBorder: this.imageBorder(),
      imageBg: this.imageBg(),
      imageFit: this.imageFit(),
      imageFallback: this.imageFallback(),
      enableCollapse: this.enableCollapse(),
      allowCardTextSelection: this.allowCardTextSelection(),
      showCopyAllButton: this.showCopyAllButton(),
      autoResizeCards: this.autoResizeCards(),
      paddingWidthPx: this.paddingWidthPx(),
      paddingHeightPx: this.paddingHeightPx(),
    },
  }));

  resolvedSettings = computed<SchemaSettings>(
    () => this.schemaSettings() ?? this.legacySettings(),
  );

  debugDataJson = computed<string>(() => this.stringifySafe(this.schemeData()));

  debugSchemaInputsJson = computed<string>(() =>
    this.stringifySafe({
      settings: this.resolvedSettings(),
      cardTemplate: this.cardTemplate() ? '[TemplateRef provided]' : null,
    }),
  );

  private stringifySafe(value: unknown): string {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return '[No se pudo serializar el contenido]';
    }
  }
}
