/*
  Simple smoke-check script.
  - If `esbuild-register` is available it will register an on-the-fly JSX transpiler and try to server-render the two components.
  - If esbuild-register is not installed it prints clear instructions to run the smoke check locally.

  Usage: node scripts/smoke-check.js
*/

(async function(){
  try {
    // Try to require esbuild-register to allow importing JSX/ESM in Node
    let register;
    try {
      register = require('esbuild-register/dist/node').register;
    } catch (err) {
      try {
        register = require('esbuild-register').register;
      } catch (err2) {
        console.log('\n☁️  smoke-check: `esbuild-register` not found.');
        console.log('Run this to install dev deps and re-run the smoke check:');
        console.log('\n  npm install --save-dev esbuild-register\n');
        process.exit(0);
      }
    }

    // Register esbuild to transpile JSX on the fly (automatic JSX runtime)
    register({
      jsx: 'automatic',
      target: 'es2019'
    });

  // Resolve React and ReactDOMServer from the project root to avoid multiple React copies
  const path = require('path');
  // Resolve from the frontend package where the components live
  const projectRoot = path.join(__dirname, '..', 'agentic-demo-frontend');
  const React = require(require.resolve('react', { paths: [projectRoot] }));
  const ReactDOMServer = require(require.resolve('react-dom/server', { paths: [projectRoot] }));

    // Create a minimal global window/document via jsdom so components that check for window won't crash
    let jsdom;
    try {
      jsdom = require('jsdom');
    } catch (err) {
      console.log('\njsdom is not installed. Install it to improve the smoke test:');
      console.log('\n  npm install --save-dev jsdom\n');
      // still continue without jsdom
    }

    if (jsdom) {
      const { JSDOM } = jsdom;
      const dom = new JSDOM('<!doctype html><html><body></body></html>');
      global.window = dom.window;
      global.document = dom.window.document;
      global.navigator = { userAgent: 'node.js' };
      // Some libraries check for SVGElement/HTMLElement — provide minimal stubs
      global.SVGElement = dom.window.SVGElement || function(){};
      global.HTMLElement = dom.window.HTMLElement || function(){};
    }

    // Import components
    const ContactBanner = require('../agentic-demo-frontend/src/components/ContactBanner.jsx').default;
    const AgenticJourney = require('../agentic-demo-frontend/src/components/AgenticJourney.jsx').default;

    console.log('\nRendering ContactBanner...');
    const bannerHtml = ReactDOMServer.renderToString(React.createElement(ContactBanner));
    console.log('ContactBanner rendered — length:', bannerHtml.length);

    console.log('\nRendering AgenticJourney (first slide)...');
    const journeyHtml = ReactDOMServer.renderToString(React.createElement(AgenticJourney, { setActiveTab: ()=>{} }));
    console.log('AgenticJourney rendered — length:', journeyHtml.length);

    console.log('\n✅ Smoke check passed: components rendered to string without throwing.');
  } catch (err) {
    console.error('\n❌ Smoke check failed with an error:\n');
    console.error(err && (err.stack || err));
    console.log('\nIf this is due to missing dev dependencies, run:');
    console.log('\n  npm install --save-dev esbuild-register jsdom\n');
    process.exit(1);
  }
})();
