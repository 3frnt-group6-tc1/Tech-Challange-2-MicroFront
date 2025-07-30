import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ThemeService } from '../../services/Theme/theme.service';
import { AuthService } from '../../services/Auth/auth.service';

import { IconExitComponent } from '../../assets/icons/icon-exit.component';
import { IconHamburgerComponent } from '../../assets/icons/icon-hamburger.component';
import { IconDarkmodeComponent } from '../../assets/icons/icon-darkmode.component';
import { IconLogoComponent } from '../../assets/icons/icon-logo.component';
import { MenuComponent } from '../menu/menu.component';
import { ButtonComponent } from '../button/button.component';
import { NavigationUtil } from '../../utils/navigation.util';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    IconExitComponent,
    IconHamburgerComponent,
    IconDarkmodeComponent,
    IconLogoComponent,
    MenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobile: boolean = false;
  tablet: boolean = false;
  menuOpen: boolean = false;

  userName: string = '';

  isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(
    public themeService: ThemeService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  @ViewChild('menuRef') menuRef?: ElementRef;
  private resizeListener = () => this.checkScreen();
  private clickListener!: (event: MouseEvent) => void;

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', this.resizeListener);

    this.clickListener = this.handleClickOutside.bind(this);
    document.addEventListener('click', this.clickListener, true);

    if (this.menuOpen) {
      document.body.classList.add('overflow-hidden');
    }

    window.addEventListener('message', this.handleHostMessage.bind(this));

    // Scroll to anchor if present in URL on init
    if (window.location.hash) {
      const anchor = window.location.hash.substring(1);
      if (anchor) {
        this.scrollToSection(anchor);
      }
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
    document.removeEventListener('click', this.clickListener, true);
    this.enableScroll();

    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  checkScreen(): void {
    const width = window.innerWidth;
    this.mobile = width <= 639;
    this.tablet = width >= 640 && width <= 1279;
  }

  toggleMenu(event?: MouseEvent): void {
    if (event) event.stopPropagation();

    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      this.enableScroll();
    }
  }

  private enableScroll(): void {
    document.body.classList.remove('overflow-hidden');
  }

  private handleClickOutside(event: MouseEvent): void {
    if (!this.menuOpen) return;

    const target = event.target as Node;
    const menuElement = this.menuRef?.nativeElement;
    const hamburgerButton = document.querySelector(
      '.app-icon-hamburger'
    )?.parentElement;

    if (menuElement && menuElement.contains(target)) return;

    if (hamburgerButton && hamburgerButton.contains(target)) return;

    this.closeMenu();
  }

  get showLandingMobileMenu(): boolean {
    const condition = (this.mobile || this.tablet) && this.menuOpen;

    if (condition) {
      document.body.classList.add('overflow-hidden');
    } else {
      this.enableScroll();
    }

    return condition;
  }

  setMenuRef(ref: ElementRef): void {
    this.menuRef = ref;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.enableScroll();
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToPanel(): void {
    this.router.navigate(['/login']);
  }

  private handleHostMessage(event: MessageEvent) {
    if (!event.data || typeof event.data !== 'object') return;
    if (event.data.type === 'scrollToAnchor' && event.data.anchor) {
      this.scrollToSection(event.data.anchor);
    }

    if (event.data.type === 'theme' && event.data.theme) {
      this.toggleTheme(event.data.theme);
    }
  }

  toggleTheme(theme: 'light' | 'dark'): void {
    const root = document.documentElement;
    root.className = '';
    root.classList.add(theme);
  }

  public scrollToSection(sectionId: string): void {
    NavigationUtil.scrollToSection(sectionId);
  }
}
