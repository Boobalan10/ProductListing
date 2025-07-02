
function ProductCard({ productData }) {
    return (
        <div className='card-sec d-flex flex-column h-100'>
            <div className='product-img-sec h-100'>
                <img src={productData.imagePath} alt="productImage" />
            </div>
            <div className='product-content row justify-content-between mx-0 mt-2'>
                <div className='product-details'>
                    <p className='mb-1'>{productData.creator}</p>
                    <h5 className='mb-0'>{productData.title}</h5>
                </div>
                <div className='price'>
                    <h5>{productData.pricingOption === 0 ? `$${productData.price}` : productData.pricingOption === 1 ? 'FREE' : productData.pricingOption === 2 ? 'View Only' : ''}</h5>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
