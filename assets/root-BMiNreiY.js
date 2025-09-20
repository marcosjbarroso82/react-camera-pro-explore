import{w as n,q as i,p as e,M as c,L as l,S as p,t as m,O as d,i as u}from"./chunk-B7RQU5TL-BOJUz5g2.js";import{T as h}from"./ThemeContext-TIzzcNTG.js";const g=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"},{rel:"manifest",href:"/react-camera-pro-explore/manifest.json"},{rel:"icon",href:"/react-camera-pro-explore/favicon.ico"}];function j({children:r}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1, user-scalable=no, orientation=landscape"}),e.jsx("meta",{name:"theme-color",content:"#0f172a"}),e.jsx("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),e.jsx("meta",{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"}),e.jsx("meta",{name:"apple-mobile-web-app-title",content:"Camera Pro"}),e.jsx(c,{}),e.jsx(l,{}),e.jsx("script",{dangerouslySetInnerHTML:{__html:`
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
            `}})]}),e.jsxs("body",{children:[e.jsx(h,{children:r}),e.jsx(p,{}),e.jsx(m,{}),e.jsx("script",{dangerouslySetInnerHTML:{__html:`
              // Register service worker
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/react-camera-pro-explore/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `}})]})]})}const w=n(function(){return e.jsx(d,{})}),y=i(function({error:t}){let o="Oops!",s="An unexpected error occurred.",a;return u(t)&&(o=t.status===404?"404":"Error",s=t.status===404?"The requested page could not be found.":t.statusText||s),e.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[e.jsx("h1",{children:o}),e.jsx("p",{children:s}),a]})});export{y as ErrorBoundary,j as Layout,w as default,g as links};
