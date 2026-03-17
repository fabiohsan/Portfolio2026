import React from 'react';
import ContractAdmin from './components/ContractAdmin';
import PortfolioInProduction from './components/PortfolioInProduction';

const normalizePathname = (pathname: string) => {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '');
};

function App() {
  const isAdmin = normalizePathname(window.location.pathname) === '/admin';

  if (isAdmin) {
    return <ContractAdmin />;
  }

  return <PortfolioInProduction />;
}

export default App;
