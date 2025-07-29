import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ThemeService } from '../../services/Theme/theme.service';

import { ButtonComponent } from '../button/button.component';
import { IconExitComponent } from '../../assets/icons/icon-exit.component';
import { NavigationUtil } from '../../utils/navigation.util';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ButtonComponent, IconExitComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() mobile: boolean = false;
  @Input() tablet: boolean = false;
  @Input() menuOpen: boolean = false;

  @Input() menuRef: any;

  @ViewChild('menuRef') menuRefElement!: ElementRef;

  @Output() menuRefReady = new EventEmitter<ElementRef>();
  @Output() closeMenu = new EventEmitter<void>();

  private routerSub: Subscription | undefined;

  constructor(
    private readonly router: Router,
    public readonly themeService: ThemeService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.menuRefElement) {
      this.menuRefReady.emit(this.menuRefElement);
    }
  }

  isActive(path: string): boolean {
    // Remove query params e fragment
    const cleanUrl = this.router.url.split('?')[0].split('#')[0];
    return cleanUrl === path || cleanUrl.startsWith(path + '/');
  }

  get themeButton(): string {
    return this.themeService.isDarkMode() ? 'ghost-white' : 'outline-cyan-blue';
  }

  goToRegister(): void {
    NavigationUtil.emitNavigationEvent('/register');
  }

  goToPanel(): void {
    NavigationUtil.emitNavigationEvent('/panel');
  }

  public scrollToSection(sectionId: string): void {
    NavigationUtil.scrollToSection(sectionId);
  }
}
