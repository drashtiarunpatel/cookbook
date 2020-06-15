import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function CommonModal(props) {
    return (
        <Modal backdrop="static" show={props.showModal} onHide={() => props.cancelBtnFunc}>
            {props.modalTitle && <Modal.Header>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>}
            <Modal.Body dangerouslySetInnerHTML={{ __html: props.modalBody }}></Modal.Body>
            <Modal.Footer>
                {
                    props.navlink && props.navlink.length ?
                        <NavLink to={props.navlink}><Button variant="primary" onClick={props.cancelBtnFunc}>Okay</Button></NavLink>
                        :
                        <>
                            {props.confirmBtnText && <Button variant="primary" onClick={props.confirmBtnFunc}>{props.confirmBtnText}</Button>}
                            {props.cancelBtnText && <Button variant="danger" onClick={props.cancelBtnFunc}>{props.cancelBtnText}</Button>}
                        </>
                }
            </Modal.Footer>
        </Modal >
    )
}
export default CommonModal;