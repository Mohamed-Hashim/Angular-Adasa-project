import { Component,OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private http = inject(HttpClient);
  
  posts = signal<any[]>([]); 

  ngOnInit() {
    this.http.get<any>('posts.json').subscribe({
      next: (data) => {
        this.posts.set(data.posts); 
      },
      error: (err) => console.error('Error:', err)
    });
  }
}