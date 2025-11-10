import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
 
@Component({ 
  selector: 'app-menu', 
  standalone: true, 
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './menu.html', 
  styleUrls: ['./menu.scss'] 
}) 
export class Menu {} 

