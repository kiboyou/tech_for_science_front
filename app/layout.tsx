import { BackToTop } from '@/front/components/ui/BackToTop'
import { ScrollProgress } from '@/front/components/ui/ScrollProgress'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tech Pour Science',
  description: 'Immersive 3D science education landing page'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning data-theme="light" className="h-full overflow-x-hidden">
      <head>
        {/* Favicon et Open Graph logo */}
        <link rel="icon" href="/media/img_tech_s.png" type="image/png" />
        <meta property="og:image" content="/media/img_tech_s.png" />
        <link rel="apple-touch-icon" href="/media/img_tech_s.png" />
        <title>Tech Pour Science</title>
        <meta name="description" content="Immersive 3D science education landing page" />
      </head>
  <body className="min-h-screen antialiased bg-gradient-to-br from-white via-[#f5f9fb] to-[#e8f2f6] dark:from-black dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 overflow-x-hidden">
        {/* No-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            try {
              var k='tps:theme:v2';
              var s=localStorage.getItem(k);
              if(!s){
                var old=localStorage.getItem('tps:theme');
                if(old==='light'||old==='dark'){ s=old; }
              }
              var hasV2 = !!localStorage.getItem('tps:theme:v2');
              var t=s==='dark'||s==='light'?s:(hasV2 ? (window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light') : 'light');
              document.documentElement.dataset.theme=t;
              if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}
              if(!hasV2){ localStorage.setItem('tps:theme:v2', t); }
            } catch {}
          `,
          }}
        />
        <ScrollProgress />
        <BackToTop />
        {children}
      </body>
    </html>
  )
}
