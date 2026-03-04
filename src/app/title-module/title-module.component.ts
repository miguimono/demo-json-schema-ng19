import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-title-module',
  templateUrl: './title-module.component.html',
  styleUrl: './title-module.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleModuleComponent {
  title = input<string>('JsonSchema-ng19');
  subtitle = input<string>('');
}
