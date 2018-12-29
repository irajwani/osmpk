import React from 'react'
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
	static propTypes = {
		isModalOpen: PropTypes.bool.isRequired,
		closeModal: PropTypes.func.isRequired,
		style: PropTypes.shape({
			modal: PropTypes.object,
			overlay: PropTypes.object
		})
	};

	constructor(props) {
		super(props);
	}

	// render modal
	render() {
		return (
			<div
				style={[{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			overflow: "auto",
			zIndex: 1
		}, {
					display: this.props.isModalOpen ? "block" : "none"
				}]}
			>
				<div style={ {
				position: "fixed",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0,0,0,0.5)",
				}} 
				onClick={this.props.closeModal} 
				/>
				<div onClick={this.props.closeModal} />
				<div style={{
				position: "relative",
				width: 500,
				padding: 20,
				boxSizing: "border-box",
				backgroundColor: "#fff",
				margin: "40px auto",
				borderRadius: 3,
				zIndex: 2,
				textAlign: "left",
				boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
				
			}}>{this.props.children}</div>
			</div>
		);
	}
}