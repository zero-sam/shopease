import ProductCard from "./ProductCard";
export default function ProductList({ products }) {
	if (!products || products.length === 0) {
		return <p style={{ textAlign: "center" }}>No products found.</p>;
	}
	return (
		<div style={{
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
			gap: "24px",
			marginTop: "32px"
		}}>
			{products.map(product => (
				<ProductCard key={product._id || product.id} product={product} />
			))}
		</div>
	);
}
