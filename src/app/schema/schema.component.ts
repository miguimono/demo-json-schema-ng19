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

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
  imports: [JsonSchema],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaComponent {
  // --- Inputs básicos ---
  title = input<string>('json-schema-ng19: ');
  id = input<number | string | null>(null);
  schemeData = input<any | null>(null);

  showLegend = input<boolean>(true);
  legendTitle = input<string>('Leyenda de colores');

  // --- Mensajes ---
  isLoading = input<boolean>(false);
  isError = input<boolean>(false);
  emptyMessage = input<string>('No hay datos para mostrar.');
  loadingMessage = input<string>('Cargando json-schema...');
  errorMessage = input<string>('Error al cargar el json-schema.');

  // --- Colores / acentos ---
  accentByKey = input<string | null>(null);
  accentInverse = input<boolean>(false);
  accentFill = input<boolean>(false);
  showColorTrue = input<boolean>(false);
  showColorFalse = input<boolean>(false);
  showColorNull = input<boolean>(false);

  descriptionShowColorTrue = input<string | null>(null);
  descriptionShowColorFalse = input<string | null>(null);
  descriptionShowColorNull = input<string | null>(null);

  // --- Layout ---
  layoutAlign = input<'firstChild' | 'center'>('center');

  // --- Viewport ---
  viewportHeight = input<number | null>(null);
  minViewportHeight = input<number | null>(null);
  showToolbar = input<boolean>(true);

  // --- DataView ---
  jsonTitleKeys = input<string[]>();
  labelData = input<Record<string, string>>();
  hiddenKeysGlobal = input<string[]>();
  noWrapKeys = input<string[]>();

  showImage = input<string | null>(null);
  imageSizePx = input<number>(32);
  imageShape = input<ImageShape>('square'); // opcional: "square" | "rounded" | "circle"
  imageBorder = input<boolean>(false);

  imageBg = input<string | null>('transparent');
  imageFit = input<ImageFit>('contain');
  enableCollapse = input<boolean>(true);

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

  /**
   * Ítems de leyenda aplicando accentInverse:
   * - accentInverse = false → verde=true, rojo=false.
   * - accentInverse = true  → verde=false, rojo=true.
   * - gris siempre representa null.
   */
  legendItems = computed<{ color: 'green' | 'red' | 'grey'; text: string }[]>(
    () => {
      const items: { color: 'green' | 'red' | 'grey'; text: string }[] = [];
      const inv = this.accentInverse();

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

  /** Mapa completo de configuración para el <schema> interno. */

  settings = computed<SchemaSettings>(() => ({
    messages: {
      isLoading: this.isLoading(),
      isError: this.isError(),
      emptyMessage: this.emptyMessage(),
      loadingMessage: this.loadingMessage(),
      errorMessage: this.errorMessage(),
    },
    colors: {
      accentByKey: this.accentByKey(),
      accentFill: this.accentFill(),
      accentInverse: this.accentInverse(),
      showColorTrue: this.showColorTrue(),
      showColorFalse: this.showColorFalse(),
      showColorNull: this.showColorNull(),
    },
    layout: {
      layoutAlign: this.layoutAlign(),
    },
    viewport: {
      height: this.viewportHeight() ?? undefined,
      minHeight: this.minViewportHeight() ?? undefined,
      showToolbar: this.showToolbar(),
    },
    dataView: {
      titleKeyPriority: this.jsonTitleKeys(),
      labelData: this.labelData(),
      hiddenKeysGlobal: this.hiddenKeysGlobal(),
      noWrapKeys: this.noWrapKeys(),
      showImage: this.showImage(),
      imageSizePx: this.imageSizePx(),
      imageShape: this.imageShape(),
      imageBorder: this.imageBorder(),
      imageBg: this.imageBg(),
      imageFit: this.imageFit(),
      enableCollapse: this.enableCollapse(),
      autoResizeCards: true,
    },
  }));
}
