import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,Navbar], // Add RouterOutlet and RouterModule to imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('new_app');
}
