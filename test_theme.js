import puppeteer from 'puppeteer';

async function testTheme() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  console.log('Testing theme toggle on /courses page...\n');
  
  try {
    await page.goto('http://localhost:3000/courses', { waitUntil: 'networkidle2' });
    
    // Get initial state (light mode)
    const lightBg = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).backgroundColor;
    });
    console.log('✓ Light mode background:', lightBg);
    
    // Check if CSS variables are working
    const darkCanvasVar = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--theme-canvas').trim();
    });
    console.log('✓ --theme-canvas variable:', darkCanvasVar);
    
    // Toggle to dark mode
    const toggleBtn = await page.$('button[aria-label*="theme"], button[aria-label*="dark"], button[aria-label*="light"]');
    if (toggleBtn) {
      console.log('✓ Found theme toggle button');
      await toggleBtn.click();
      await page.waitForTimeout(500);
      
      // Check dark mode
      const darkBg = await page.evaluate(() => {
        return window.getComputedStyle(document.documentElement).backgroundColor;
      });
      console.log('✓ Dark mode background:', darkBg);
      
      // Check if .dark class was added
      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      console.log('✓ .dark class on html:', hasDarkClass);
      
      if (lightBg !== darkBg) {
        console.log('\n✨ Theme toggle is WORKING! Background changed from light to dark.');
      } else {
        console.log('\n⚠ Theme toggle issue: Background did not change.');
      }
    } else {
      console.log('⚠ Could not find theme toggle button');
    }
    
    // Check if hero banner is using theme colors
    const heroBg = await page.evaluate(() => {
      const hero = document.querySelector('[class*="hero-banner"]') || document.querySelector('[class*="banner"]');
      return hero ? window.getComputedStyle(hero).backgroundColor : 'not found';
    });
    console.log('✓ Hero banner background:', heroBg);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

testTheme();
