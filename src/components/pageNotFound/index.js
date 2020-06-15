import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './pageNotFound.scss';

function PageNotFound() {
    return (
        <div className="PageNotFound">
            <div className="mainbox">
                <div className="err">4</div>
                <div className="logo404">
                    <div className="ackee spin-ques">
                        <h1>ackee</h1>
                    </div>
                </div>
                {/* <i className=" far fa-question-circle fa-spin spin-ques"></i> */}
                <div className="err2">4</div>
                <div className="info msg">
                    <div className="info-line1">OOPS, SORRY WE CAN'T FIND THAT PAGE!</div>
                    <div className="info-line2">
                        Either something went wrong or the page doesn't exist anymore.
                    </div>
                    <NavLink to="/">
                        <Button type="button" className="home-btn" variant="outline-info"><i className="fa fa-home" /> Go to home page</Button>
                    </NavLink>
                </div>
            </div>
            {/* <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="#">home</a> and try from there.</p></div> */}
        </div>
        // </div>
        // <div className="PageNotFound">
        //     <div className="content">
        //         <div className="logo404">
        //             4
        //     <div className="ackee">
        //                 <h1>ackee</h1>

        //             </div>
        //     4
        //     </div>
        //         <div className="info">
        //             <div className="info-line1">OOPS, SORRY WE CAN'T FIND THAT PAGE!</div>
        //             <div className="info-line2">
        //                 Either something went wrong or the page doesn't exist anymore.
        //             </div>
        //             <NavLink to="/">
        //                 <Button type="button" className="home-btn" variant="outline-info"><i className="fa fa-home" /> Go to home page</Button>
        //             </NavLink>
        //         </div>
        //     </div>
        // </div>

    )
}

export default PageNotFound;