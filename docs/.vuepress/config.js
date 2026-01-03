import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Spokane Food Justice',
  description: 'Building a sustainable and equitable food system in Spokane',
  
  // GitHub Pages deployment configuration
  base: '/',
  
  theme: defaultTheme({
    // Navbar
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'About',
        link: '/about',
      },
      {
        text: 'Get Involved',
        link: '/get-involved',
      },
    ],
    
    // Sidebar
    sidebar: {
      '/': [
        {
          text: 'Welcome',
          children: ['/', '/about', '/get-involved'],
        },
      ],
    },
    
    // Repository information
    repo: 'spokane-food-justice/spokane-food-justice.github.io',
    docsDir: 'docs',
    docsBranch: 'main',
    editLink: false,
  }),
  
  bundler: viteBundler(),
})
