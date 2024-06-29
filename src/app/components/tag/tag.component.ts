import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  public readonly tagPrefix = '#';
  @Input({required: true}) tag: string;

}
