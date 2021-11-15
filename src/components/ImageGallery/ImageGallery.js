import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import ImageGalleryItem from '../ImageGalleryItem';
import fetchImages from '../../services/imageApi';
import Spinner from '../Loader/Loader'
import LoadMoreBtn from '../Button'
import Modal from '../Modal'
const shortid = require('shortid');

console.log(shortid.generate());


export default function ImageGallery({ pictureName }) {

    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [pictures, setPictures] = useState([]);
    const [baseApi] = useState("https://pixabay.com/api/");
    const [myKey] = useState('23171615-fcdc729843fe7af43a640cf8d');
    const [page, setPage] = useState(1);
    const [largeUrl, setLargeUrl] = useState('');
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (!pictureName) {
            return;
        }
        setStatus('pending');
        setPictures([]);
        setPage(1);
        fetchImages(pictureName, baseApi, myKey, page)
            .then(pictures => {
                console.log(pictures);
                if (pictures.length === 0) {
                    setStatus('rejected');;
                }
                setPictures(pictures);
            })
            .then(setStatus('resolved'))

            .catch(error => {
                setError(error);
                setStatus('rejected')
            })
    }, [baseApi, setPictures, myKey, page, pictureName]);

    useEffect(() => {
        if (page === 1) {
            return;
        }
        setStatus('pending');
        fetchImages(pictureName, baseApi, myKey, page)
            .then(pictures => {
                if (pictures.length === 0) {
                    return setStatus('rejected')
                }
                setPictures(pictures);
            })
            .then(setStatus('resolved'))
            .then(() => window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            }))
            .catch(error => {
                setError(error);
                setStatus('rejected')
            })
    }, [baseApi, myKey, page, pictureName, pictures, setPictures]);



    const onLoadMoreBtn = () => {
        setPage((prevPage) => prevPage + 10);

    }

    console.log(page)
    const toggleModal = () => {
        setShowModal(!showModal)

    };
    const takeModalPicture = (url) => {
        setLargeUrl(url)
        setShowModal(true)

    };

    if (status === 'idle') {
        return <h1 className="title"> Enter what are you looking for.</h1>
    }
    if (status === 'pending') {
        return <Spinner />

    }
    if (status === 'rejected') {
        return <h1 className="title">
            By searching "{pictureName}" nothing found, sorry.<br />
            Try enter something else
        </h1>
    }
    if (status === 'resolved') {
        return (
            <div>
                <ul className="ImageGallery">
                    {pictures.map((picture) => (
                        <ImageGalleryItem
                            key={shortid.generate()}
                            webformatURL={picture.webformatURL}
                            largeImageURL={picture.largeImageURL}
                            onOpen={takeModalPicture}
                        />
                    ))}
                </ul>
                {showModal && (
                    <Modal onClose={toggleModal}>
                        <img src={largeUrl} alt="modal-img" />
                    </Modal>
                )
                }
                <LoadMoreBtn onLoadMoreBtn={onLoadMoreBtn} />
            </div >
        )
    }
}


ImageGallery.propTypes = {
    inputValue: PropTypes.string,
};















// import { Component } from 'react';
// import PropTypes from "prop-types";
// import ImageGalleryItem from '../ImageGalleryItem';
// import fetchImages from '../../services/imageApi';
// import Spinner from '../Loader/Loader'
// import LoadMoreBtn from '../Button'
// import Modal from '../Modal'


// export default class ImageGallery extends Component {
//     state = {
//         pictureName: null,
//         error: null,
//         status: 'idle',
//         pictures: [],
//         baseApi: "https://pixabay.com/api/",
//         myKey: '23171615-fcdc729843fe7af43a640cf8d',
//         page: 1,
//         largeUrl: " ",
//         showModal: false,
//     }

//     componentDidUpdate(prevProps, prevState) {
//         const { baseApi, myKey, page } = this.state;
//         const { pictureName } = this.props;

//         if (prevProps.pictureName !== this.props.pictureName) {

//             this.setState({ status: 'pending' });
//             this.setState({ pictures: [] });
//             this.setState({ page: 1 })

//             fetchImages(pictureName, baseApi, myKey, page)
//                 .then((pictures) => {
//                     if (pictures.length === 0) {
//                         return this.setState({ status: 'rejected' });

//                     }
//                     this.getPictures(pictures);

//                 })

//                 .then(this.setState({ status: 'resolved' }))
//                 .catch((error) => this.setState({ error, status: 'rejected' }));


//         }
//         else if (prevState.page !== this.state.page && this.state.page !== 1) {
//             this.setState({ status: 'pending' });

//             fetchImages(pictureName, baseApi, myKey, page)
//                 .then((pictures) => this.getPictures(pictures))
//                 .then(this.setState({ status: 'resolved' }))
//                 .then(() => window.scrollTo({
//                     top: document.documentElement.scrollHeight,
//                     behavior: 'smooth',
//                 })
//                 )
//                 .catch((error) => this.setState({ error, status: 'rejected' }))
//         }
//     }


//     getPictures = (arr) => {
//         const newArr = arr.map((picture) => {
//             return {
//                 id: picture.id,
//                 webformatURL: picture.webformatURL,
//                 largeImageURL: picture.largeImageURL
//             };
//         });

//         this.setState({
//             pictures: [...this.state.pictures, ...newArr],
//         });
//     };
//     onLoadMoreBtn = () => {
//         this.setState({
//             page: this.state.page + 1,
//         })
//     }
//     toggleModal = () => {
//         this.setState(({ showModal }) => ({
//             showModal: !showModal,
//         }))
//     };
//     takeModalPicture = (url) => {
//         this.setState({ largeUrl: url, showModal: true })
//     };

//     render() {

//         const { pictures, status, largeUrl, showModal } = this.state

//         if (status === 'idle') {
//             return <h1 className="title"> Enter what are you looking for.</h1>
//         }
//         if (status === 'pending') {
//             return <Spinner />

//         }
//         if (status === 'rejected') {
//             return <h1 className="title">
//                 By searching "{this.props.pictureName}" nothing found, sorry.<br />
//                 Try enter something else
//             </h1>
//         }
//         if (status === 'resolved') {
//             return (
//                 <div>
//                     <ul className="ImageGallery">
//                         {pictures.map((picture) => (
//                             <ImageGalleryItem
//                                 key={picture.id}
//                                 webformatURL={picture.webformatURL}
//                                 largeImageURL={picture.largeImageURL}
//                                 onOpen={this.takeModalPicture}
//                             />
//                         ))}
//                     </ul>
//                     {showModal && (
//                         <Modal onClose={this.toggleModal}>
//                             <img src={largeUrl} alt="modal-img" />
//                         </Modal>
//                     )
//                     }
//                     <LoadMoreBtn onLoadMoreBtn={this.onLoadMoreBtn} />
//                 </div >
//             )
//         }
//     }

// }


// ImageGallery.propTypes = {
//     inputValue: PropTypes.string,
// };