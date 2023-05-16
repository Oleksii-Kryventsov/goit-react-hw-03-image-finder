import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    };

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        return (
            createPortal(
                <Overlay
                    onClick={this.handleBackdropClick}>
                    <ModalContainer>
                        {this.props.children}
                    </ModalContainer>
                </Overlay>,
                modalRoot
            )
        )
    }
    
};

Modal.propTypes = {
    Children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};