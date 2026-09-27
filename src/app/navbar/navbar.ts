import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Required for routing link

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive], // Required for routing link
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
