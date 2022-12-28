import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function ModalSeeDetail({ basicModal, setBasicModal, toggleShow, data }) {
    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog centered className="custom">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="custom">{data}</MDBModalBody>

                        <MDBModalFooter></MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
