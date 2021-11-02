import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");
export default function Modal({ onClose, children }) {
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleKeyDown = (event) => {
        if (event.code === "Escape") {
            onClose();
        }
    };

    const handleBackdropClick = (event) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    return createPortal(
        <div className="Overlay" onClick={handleBackdropClick}>
            <div className="Modal">{children}</div>
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
};

// import PropTypes from "prop-types";
// import { Component } from "react";
// import { createPortal } from "react-dom";

// const modalRoot = document.querySelector("#modal-root");
// export default class Modal extends Component {
//     componentDidMount() {
//         window.addEventListener("keydown", this.handleKeyDown);
//     }
//     componentWillUnmount() {
//         window.removeEventListener("keydown", this.handleKeyDown);
//     }

//     handleKeyDown = (event) => {
//         if (event.code === "Escape") {
//             this.props.onClose();
//         }
//     };

//     handleBackdropClick = (event) => {
//         if (event.currentTarget === event.target) {
//             this.props.onClose();
//         }
//     };
//     render() {
//         return createPortal(
//             <div className="Overlay" onClick={this.handleBackdropClick}>
//                 <div className="Modal">{this.props.children}</div>
//             </div>,
//             modalRoot
//         );
//     }
// }