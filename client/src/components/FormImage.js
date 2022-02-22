import {React, Fragment, useState} from "react";

function FormImage(){

    const [file, setFile] = useState(null);
    

    const selectedImage = (e) => {
        setFile(e.target.files[0])
    }

    const sendImage = () => {
        if(!file){
            alert("You must upload an image")
            return
        }

        const formData = new FormData()
        formData.append("image", file)

        fetch("/images/post", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(response => {
            console.log(response)})
        .catch(error => {
            console.error(error)
        })

        document.getElementById("fileInput").value = null;

        setFile(null)
    }

    return(
        <Fragment>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <a href="#" className="navbar-brand">Image App</a>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="card p-3">
                    <div className="row">
                        <div className="col-10">
                            <input id="fileInput" onChange={selectedImage} className="form-control" type="file"/>
                        </div>
                        <div className="col-2">
                            <button onClick={sendImage} className="btn btn-primary col-12" type="button">Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default FormImage;