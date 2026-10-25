/* Scoped to class names starting with "ew-". Primary button uses the Svikara royal blue. */
export const elsewhereCss = `
.ew-nav{position:absolute;top:0;left:0;right:0;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:clamp(14px,3vh,24px) clamp(14px,3vw,28px)}
.ew-brand{font-weight:500;font-size:clamp(11px,1.6vw,13px);letter-spacing:.35em;text-transform:uppercase;color:rgba(245,243,236,.75);text-decoration:none}
.ew-links{display:flex;gap:clamp(18px,2.6vw,32px)}
.ew-link{position:relative;font-size:14px;color:rgba(245,243,236,.82);text-decoration:none;transition:color .3s}
.ew-link::after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.2,.7,.2,1)}
.ew-link:hover,.ew-link:focus-visible{color:#fff}
.ew-link:hover::after,.ew-link:focus-visible::after{transform:scaleX(1)}
.ew-copy{position:absolute;left:0;right:0;top:clamp(92px,14vh,150px);z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 20px}
.ew-title{margin:0;max-width:16ch;font-weight:700;font-size:clamp(40px,6.6vw,96px);line-height:.96;letter-spacing:-.04em;color:#fff;text-shadow:0 2px 30px rgba(10,20,50,.35);text-wrap:balance}
.ew-sub{margin:clamp(14px,2.2vh,22px) 0 0;max-width:44ch;min-height:3em;font-size:clamp(15px,1.5vw,19px);line-height:1.5;color:rgba(255,255,255,.92);text-shadow:0 1px 16px rgba(10,20,50,.45);text-wrap:pretty}
.ew-ctas{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:clamp(18px,3vh,30px)}
.ew-pill{display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 24px;border-radius:999px;font:inherit;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;transition:transform .25s ease,background .3s ease,border-color .3s ease}
.ew-pill:active{transform:scale(.97)}
.ew-small{height:38px;padding:0 16px;font-size:13px}
.ew-primary{background:#1a56db;color:#fff;border:1px solid #1a56db}
.ew-primary:hover{background:#1440a8;border-color:#1440a8}
.ew-glass{color:#fff;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.12);backdrop-filter:blur(14px) saturate(150%);-webkit-backdrop-filter:blur(14px) saturate(150%)}
.ew-glass:hover{background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.4)}
.ew-hint{font-size:13px;color:rgba(255,255,255,.8);white-space:nowrap;animation:ew-pulse 2.4s ease-in-out infinite}
.ew-swap{display:inline-block;animation:ew-swap .8s cubic-bezier(.2,.7,.2,1)}
@keyframes ew-swap{from{opacity:0;transform:translateY(8px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes ew-pulse{0%,100%{opacity:.45}50%{opacity:.95}}
.ew-nav a:focus-visible,.ew-pill:focus-visible,.ew-icon:focus-visible{outline:2px solid #fff;outline-offset:3px}
@media (max-width:720px){.ew-links{display:none}.ew-hint{display:none}}
@media (prefers-reduced-motion:reduce){.ew-hint,.ew-swap{animation:none}.ew-link::after,.ew-pill{transition:none}}
`;
