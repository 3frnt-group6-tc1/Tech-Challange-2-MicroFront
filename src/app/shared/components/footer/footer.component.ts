import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { systemConfig } from '../../../app.config';

import { TextComponent } from '../text/text.component';
import { IconWhatsappComponent } from '../../assets/icons/icon-whatsapp.component';
import { IconInstagramComponent } from '../../assets/icons/icon-instagram.component';
import { IconYoutubeComponent } from '../../assets/icons/icon-youtube.component';
import { IconLogoComponent } from '../../assets/icons/icon-logo.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    IconWhatsappComponent,
    IconInstagramComponent,
    IconYoutubeComponent,
    IconLogoComponent,
    ButtonComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  company: string = systemConfig.company;
  version: string = systemConfig.version;
  year: number = systemConfig.year;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
