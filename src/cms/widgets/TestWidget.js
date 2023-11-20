import React from 'react';
import CMS from 'decap-cms-app'

const ObjectControl = CMS.getWidget('object').control
const ObjectPreview = CMS.getWidget('object').preview;

export class UuidControl extends React.Component {
  objectRef;

  constructor(props) {
    super(props);
    this.objectRef = React.createRef();
  }

	handleChange = (...args) => {
		console.log(...args);
		this.props.onChange(...args);
	}

  handleGenerate = () => {
		console.log(this.objectRef.current)
		//this.props.onChange(this.props.value.replace(/(<scoreboard>.*<\/scoreboard>)/, ''));
  }

	render() {
		const {
			forID,
			value,
			onChange,
			classNameWrapper,
		} = this.props;

		console.log(this.props)
		/*const body = this.props.field.get('body', '');
		const name = this.props.field.get('name', '');
		console.log(body, name);*/

		return (
			<div style={{ "display": "flex" }}>
				<button onClick={this.handleGenerate} style={{ marginLeft: "1em" }}>Generate test</button>
				<ObjectControl {...this.props} ref={this.objectRef} onChange={this.handleChange} />
			</div >
		)

		/*return (
			<div style={{ "display": "flex" }}>
				<input
					type="hidden"
					id={forID}
					className={classNameWrapper}
					value={value}
					onChange={e => onChange(e.target.value.trim())}
				/>
				<div>{value}</div>
				<button onClick={() => {}} style={{ marginLeft: "1em" }} >Regenerate ID</button>
			</div >
		);*/
	}
}

UuidControl.defaultProps = {
	value: '',
}


export function UuidPreview(props) {
	return <ObjectPreview {...props} />;
}