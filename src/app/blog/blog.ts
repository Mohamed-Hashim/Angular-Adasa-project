import { Component,OnInit, inject, signal, computed  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  private http = inject(HttpClient);

  allPosts = signal<any[]>([]);
  selectedTag = signal<string>('الكل');
  
  searchQuery = signal<string>(''); 

  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(4);

  ngOnInit() {
    this.http.get<any>('posts.json').subscribe({
      next: (data) => this.allPosts.set(data.posts),
      error: (err) => console.error('error', err)
    });
  }

  tags = computed(() => {
    const list = new Set<string>();
    list.add('الكل');
    this.allPosts().forEach(post => {
      if (post.tags) { post.tags.forEach((tag: string) => list.add(tag)); }
    });
    return Array.from(list);
  });

  filteredPosts = computed(() => {
    let posts = this.allPosts();
    const activeTag = this.selectedTag();
    const query = this.searchQuery().toLowerCase().trim();

    if (activeTag !== 'الكل') {
      posts = posts.filter(post => post.tags && post.tags.includes(activeTag));
    }

    if (query !== '') {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query)
      );
    }

    return posts;
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredPosts().length / this.itemsPerPage());
  });

  pageNumbers = computed(() => {
    const pages = [];
    for (let i = 1; i <= this.totalPages(); i++) { pages.push(i); }
    return pages;
  });

  paginatedPosts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.filteredPosts().slice(startIndex, endIndex);
  });

  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery.set(inputElement.value);
    this.currentPage.set(1); 
  }

  selectTag(tag: string) {
    this.selectedTag.set(tag);
    this.currentPage.set(1); 
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
