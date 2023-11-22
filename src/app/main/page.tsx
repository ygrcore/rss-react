// 'use client'

// import App from '../../App'
import dynamic from 'next/dynamic';
import '../../index.css';

// export const generateStaticParams = () => [{ main: "page" }];
const App = dynamic(() => import('../../App'), { ssr: false });

export default function Page() {
  return <App />;
}
