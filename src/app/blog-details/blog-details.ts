import { Component,OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-details',
  imports: [RouterLink],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  post = signal<any>(null);

  ngOnInit() {

    const currentSlug = this.route.snapshot.paramMap.get('slug');

    this.http.get<any>('posts.json').subscribe({
      next: (data) => {
        const foundPost = data.posts.find((p: any) => p.slug === currentSlug);
        this.post.set(foundPost);
      },
      error: (err) => console.error('خطأ في جلب تفاصيل المقال:', err)
    });
  }
}
