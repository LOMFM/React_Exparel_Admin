import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../_styles/modal.css';

export default class Modal extends Component {

    constructor(){
        super()

        this.checkCloseModal = this.checkCloseModal.bind(this)
    }

    checkCloseModal = (e) => {
        if( e.target.classList && e.target.classList.contains("backdrop") ){
            this.props.onClose();
        }
    }

    render() {
        return (
            <>
                {
                    this.props.show ? (
                        <div className="backdrop" style={ backdropStyle } onClick={(e) => this.checkCloseModal(e)}>
                            <div className={this.props.class + " modal"} style={ modalStyle } >
                                <h2 className="modal-title">{this.props.title}</h2>
                                {this.props.children}
                            </div>
                        </div>
                    ) : null
                }
            </>
        )
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#333a',
    padding: 50,
    width: '100vw',
    height: '100vh',
    zIndex: 1299
};

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 1000,
    minHeight: 300,
    margin: '0 auto',
    padding: 30
};