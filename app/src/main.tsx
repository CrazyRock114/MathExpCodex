import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { experimentIdFromLegacyHash, experimentIdFromPath } from './app/app-route';
import './styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('缺少 React 根节点 #root');
}

const legacyExperimentId = experimentIdFromLegacyHash(window.location.hash);
const isExperimentPage = experimentIdFromPath(window.location.pathname) !== null;

if (legacyExperimentId && !isExperimentPage) {
  window.location.replace(`./pages/${legacyExperimentId}.html`);
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
