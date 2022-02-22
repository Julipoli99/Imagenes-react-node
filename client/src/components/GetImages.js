import {React, Fragment, useState, useEffect} from "react";
import Modal from "react-modal";

function GetImages(){
    const [image, setImage] = useState([]);
    const [listUpdated, setListUpdated] = useState(false);
    const [modalIsOpen, setModalisOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        Modal.setAppElement("body")

        fetch("/images/get")
        .then(response => response.json())
        .then(response => {
            setImage(response)
            setListUpdated(true)
        })
        .catch(error => {
            console.error(error)
        })
        setListUpdated(false)
    }, [listUpdated])

    const modalHandler = (isOpen, image) => {
        setModalisOpen(isOpen)
        setCurrentImage(image)
    }

    const imageDeleted = () => {
        let idImage = currentImage.split("-")
        idImage = parseInt(idImage[0])

        fetch("/images/delete/" + idImage, {
            method: "DELETE"
        })
        .then(res => res.text())
        .then(res => console.log(res))

        setModalisOpen(false)
        setListUpdated(true)
    }

    return(
        <Fragment>
            <div className="container mt-3" style={{display: "flex", flexWrap: "wrap"}}>
                {image.map(image => (
                    <div className="card m-2" key={image}>
                    <img src={image} className="card-img-top" style={{height: "200px"}}/>

                    <div className="card-body">
                        <button className="btn btn-dark" onClick={() => modalHandler(true, image)}>Ver imagen</button>
                    </div>
                </div>
                ))}
            </div>

            <Modal style={{content: {right: "20%", left: "20%"}}} isOpen={modalIsOpen} onRequestClose={() => modalHandler(false, null)}>
                <div className="card">
                    <img src={currentImage}/>
                    <div className="card-body">
                        <button onClick={() => imageDeleted()} className="btn btn-danger">Borrar</button>
                    </div>

                </div>
            </Modal>

        </Fragment>
    )
}

export default GetImages;