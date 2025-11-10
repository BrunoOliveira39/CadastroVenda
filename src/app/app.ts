import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './components/menu/menu';
 
@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [CommonModule, RouterOutlet, Menu], 
  templateUrl: './app.html', 
  styleUrls: ['./app.scss'] 
}) 
export class App { 
  title = 'Cadastros'; 
} 

