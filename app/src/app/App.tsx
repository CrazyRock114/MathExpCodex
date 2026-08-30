import { catalogById } from '../data/catalog';
import { CatalogPage } from '../components/CatalogPage';
import { ExperimentPage } from '../components/ExperimentPage';
import { useHashRoute } from './hash-route';

export function App() {
  const route = useHashRoute();
  const experiment =
    route.name === 'experiment' ? catalogById.get(route.experimentId) : undefined;

  return (
    <>
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <header className="site-header">
        <a className="brand" href="#/">
          <span aria-hidden="true">π</span>
          <span>MathExpCodex</span>
        </a>
        <p>从直观操作走向数学理解</p>
      </header>
      <main id="main-content">
        {route.name === 'catalog' ? (
          <CatalogPage />
        ) : (
          <ExperimentPage experiment={experiment} requestedId={route.experimentId} />
        )}
      </main>
      <footer className="site-footer">
        当前为渐进迁移版目录；实验互动仍由经过回归测试的旧页面承载。
      </footer>
    </>
  );
}

