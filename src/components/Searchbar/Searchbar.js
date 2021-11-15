
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from "prop-types";

export default function Searchbar({ onSubmitProp }) {
    const [pictureName, setPictureName] = useState('')


    const handleNameChange = event => {
        setPictureName(event.currentTarget.value.toLowerCase())
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (pictureName.trim() === '') {
            toast.error("enter something!");
            return
        }

        onSubmitProp(pictureName);
        setPictureName('')

    };

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="on"
                    placeholder="Search images and photos"
                    name="pictureName"
                    value={pictureName}
                    onChange={handleNameChange}
                />
            </form>
        </header>
    )


}
Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};







// import { Component } from 'react';
// import { toast } from 'react-toastify';
// import PropTypes from "prop-types";

// export default class Searchbar extends Component {
//     state = {
//         pictureName: '',
//     };

//     handleNameChange = event => {
//         this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
//     };

//     handleSubmit = event => {
//         event.preventDefault();
//         if (this.state.pictureName.trim() === '') {
//             toast.error("enter something!");
//             return
//         }

//         this.props.onSubmitProp(this.state.pictureName);
//         this.setState({ pictureName: '' });

//     };
//     render() {
//         return (
//             <header className="Searchbar">
//                 <form className="SearchForm" onSubmit={this.handleSubmit}>
//                     <button type="submit" className="SearchForm-button">
//                         <span className="SearchForm-button-label">Search</span>
//                     </button>

//                     <input
//                         className="SearchForm-input"
//                         type="text"
//                         autoComplete="off"
//                         placeholder="Search images and photos"
//                         name="pictureName"
//                         value={this.state.pictureName}
//                         onChange={this.handleNameChange}
//                     />
//                 </form>
//             </header>
//         )
//     }

// }
// Searchbar.propTypes = {
//     onSubmit: PropTypes.func,
// };