import React, { useEffect, useState } from 'react';

export default function Products() {
  let productThumbnail;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/v1/products?fields=id,name,price,productImages.productThumbnail')
      .then((res) => res.json())
      .then((json) => setProducts(json.data.products));
  }, []);

  console.log(products);

  return (
    <div className='pt-8'>
      {/* Grid Container */}

      <div className='grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6 m-auto max-w-[1400px] w-[90%]'>
        {products.map((product) => {
          const productThumbnail = product.productImages.productThumbnail.url.replace(
            product.productImages.productThumbnail.url.split('/')[6],
            'c_thumb'
          );
          return (

            <div className='w-full border rounded-xl overflow-hidden'>
              <div className='w-full h-auto overflow-hidden aspect-square mb-12 border-b'>
                <img src={productThumbnail && productThumbnail} alt='' className='object-cover h-full w-full' />
              </div>

              <div className='flex justify-between items-center p-4'>
                <div>
                  <h3 className='text-2xl font-semibold capitalize'>{product?.name}</h3>
                  <p className='text-lg text-gray-500'>{product?.price} RWF</p>
                </div>
                <button className='bg-green-800 text-white p-2 inline-block rounded-xl text-base'>Add to cat</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
