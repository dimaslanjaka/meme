import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Loader from './components/Loader';

const lazyHandler = async function (element: Promise<any>) {
  const awaited = await element;
  // component export
  if ('Component' in awaited) return { Component: awaited.Component };
  // default export
  if ('default' in awaited) return { Component: awaited.default };
  return { Component: awaited };
};

/**
 * create multiple routes based on defined path
 * @param path
 * @param element
 * @returns
 * @example
 * defined path is 'home' will be returned 'home', 'home.html', 'home/index.html'
 */
const _createMultipleRoute = (path: string, element: RouteObject['element'] | RouteObject['lazy']): RouteObject[] => {
  if (element instanceof Promise) {
    const lazy = () => lazyHandler(element);
    return [
      {
        path,
        lazy
      },
      // create path.html
      {
        path: `${path}.html`,
        lazy
      },
      // create path/index.html
      {
        path: `${path}/index.html`,
        lazy
      }
    ];
  }
  return [
    {
      element,
      path
    },
    // create path.html
    {
      element,
      path: `${path}.html`
    },
    // create path/index.html
    {
      element,
      path: `${path}/index.html`
    }
  ];
};

const router = createBrowserRouter([
  {
    path: '/meme',
    async lazy() {
      const { default: Component } = await import('@components/Layout');
      return { Component };
    },
    children: [
      ..._createMultipleRoute('editor', import('@routes/Editor')),
      ..._createMultipleRoute('template', import('@routes/Template')),
      {
        path: '*',
        async lazy() {
          const { default: Component } = await import('@components/NoMatch');
          return { Component };
        }
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}
