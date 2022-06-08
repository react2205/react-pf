function Popup({ children }) {
	return (
		<aside className='pop'>
			<div className='con'>
				{children}
				<span className='close'>close</span>
			</div>
		</aside>
	);
}

export default Popup;
