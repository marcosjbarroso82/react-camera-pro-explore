import{w as a,q as i,p as e,M as l,L as c,S as p,t as d,O as m,i as u}from"./chunk-B7RQU5TL-BOJUz5g2.js";import{T as h}from"./ThemeContext-TIzzcNTG.js";const x=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"},{rel:"manifest",href:"/manifest.json"},{rel:"icon",href:"/favicon.ico"}];function j({children:s}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1, user-scalable=no, orientation=landscape"}),e.jsx("meta",{name:"theme-color",content:"#0f172a"}),e.jsx("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),e.jsx("meta",{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"}),e.jsx("meta",{name:"apple-mobile-web-app-title",content:"Camera Pro"}),e.jsx(l,{}),e.jsx(c,{}),e.jsx("script",{dangerouslySetInnerHTML:{__html:`
              // Single Page Apps for GitHub Pages
              (function(l) {
                if (l.search[1] === '/' ) {
                  var decoded = l.search.slice(1).split('&').map(function(s) { 
                    return s.replace(/~and~/g, '&')
                  }).join('?');
                  window.history.replaceState(null, null,
                      l.pathname.slice(0, -1) + decoded + l.hash
                  );
                }
              }(window.location))
            `}})]}),e.jsxs("body",{children:[e.jsx(h,{children:s}),e.jsx(p,{}),e.jsx(d,{}),e.jsx("script",{dangerouslySetInnerHTML:{__html:`
              // Register service worker
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `}})]})]})}const w=a(function(){return e.jsx(m,{})}),y=i(function({error:t}){let r="Oops!",n="An unexpected error occurred.",o;return u(t)&&(r=t.status===404?"404":"Error",n=t.status===404?"The requested page could not be found.":t.statusText||n),e.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[e.jsx("h1",{children:r}),e.jsx("p",{children:n}),o]})});export{y as ErrorBoundary,j as Layout,w as default,x as links};
