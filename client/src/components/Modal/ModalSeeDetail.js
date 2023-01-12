import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

export default function ModalSeeDetail({ basicModal, setBasicModal, toggleShow, data }) {
    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog centered className="custom">
                    <MDBModalContent>
                        <MDBModalBody className="custom">{data}</MDBModalBody>

                        <MDBModalFooter></MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
