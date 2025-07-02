import React from "react"

const ProductListView = React.lazy(() => import('../Views/ProductListView/ProductListView'));

export const RouterData = [
    { id: '1', name: 'Product List View', path: '/', element: ProductListView },
]