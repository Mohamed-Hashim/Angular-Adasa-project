import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Blog } from './blog/blog';
import { About } from './about/about';
import { BlogDetails } from './blog-details/blog-details';

export const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
{ path: 'home', component: Home },
{ path: 'blog', component: Blog },
{ path: 'about', component: About },
{ path: 'blog/:slug', component: BlogDetails }, 
{ path: '**', redirectTo: '/home' } // Wildcard route for 404s
];
