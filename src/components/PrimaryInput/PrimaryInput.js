import React, { Component } from "react";
import "./PrimaryInput.sass";

class PrimaryInput extends Component {

    renderErrorMessage() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.lpg("INPUT", nextProps.value);
    }

    render() {
        return (
            <>
                <label>{this.props.title}</label>
                <input placeHolder={this.props.placeholder}
                value={this.props.value}
                onChange={
                    (event) => this.props.onTextChange(event.target.value, this.props.type)
                }
                type={this.props.type}/>
            {this.renderErrorMessage()}
            </>
        );
    }    
}

export default PrimaryInput;


