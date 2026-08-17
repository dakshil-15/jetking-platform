import { STORAGE_KEYS } from '@/lib/constants/storage';

/**
 * Applies the persisted theme before first paint.
 *
 * This has to run synchronously in <head>: any later and the page paints in
 * light mode first, producing a white flash for dark-mode users.
 */
export const themeScript = `(function(){try{
var s=localStorage.getItem('${STORAGE_KEYS.theme}');
var d=s==='dark'||(s==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
var e=document.documentElement;
e.classList.toggle('dark',d);
e.style.colorScheme=d?'dark':'light';
}catch(_){}})();`;
