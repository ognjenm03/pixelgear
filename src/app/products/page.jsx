import { getProducts } from '@/lib/actions';

export default async function ProductsPage(){
    const products = await getProducts();

    return (
         <div className="container mt-4">
            <h1>Products page</h1>
            <div className="row">
                {products.map(p => (
                    <div key={p.id} className="col-md-4 mb-4">
                        <div className="card">
                            {p.imageUrl && <img src={p.imageUrl} className="card-img-top" alt={p.name} />}
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">${p.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}