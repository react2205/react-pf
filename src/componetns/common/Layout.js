function Layout({ name }) {
	return (
		<section className={`content ${name}`}>
			<figure></figure>
			<div className='inner'>
				<h2>{name}</h2>
			</div>
		</section>
	);
}

export default Layout;
