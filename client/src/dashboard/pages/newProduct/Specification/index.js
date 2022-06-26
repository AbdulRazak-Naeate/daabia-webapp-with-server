import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,

    CRow,
    CButton,
} from '@coreui/react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from '@mui/material'
import './index.css';

class Specification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorSpecsChildren: 3,
            sizeSpecsChildren: 3,
            colorChildren: [],
            sizeChildren: []
        }
        this.updateSpecsInput = this.updateSpecsInput.bind(this)
    }


    updateSpecsInput(option, action) { //adding or removing input elements 

        if (option === "color") {
            switch (action) {
                case "add":
                    this.addColorElement();
                    break;
                case "remove":
                    this.removecolorChildrenLastElement();
                    break;
                default:

            }
        } else if (option === "size") {
            switch (action) {
                case "add":

                    this.addSizeElement();
                    break;
                case "remove":
                    this.removesizeChildrenLastElement()//spread list ,prev eleme counts
                    break;
                default:

            }
        }
    }
    addSizeElement() {
        let index = this.state.sizeSpecsChildren;
        console.log("add " + index);

        this.setState(prevSlist => ({
            sizeChildren: [...prevSlist.sizeChildren,
            <CCol key={`ccol-size${index}`}><input className="size-specs" id={`size-specs-item${index}`} key={`cc-size-fcontrol${index}`} />  </CCol>]
        }))
        this.setState({ sizeSpecsChildren: this.state.sizeSpecsChildren + 1 })
    }
    addColorElement() {
        let index = this.state.colorSpecsChildren;
        this.setState(prevClist => ({
            colorChildren: [...prevClist.colorChildren,
            <CCol key={`ccol-color${index}`}><input className="color-specs" id={`color-specs-item${index}`} key={`cc-color-fcontrol${index}`} />  </CCol>]
        }))
        this.setState({ colorSpecsChildren: this.state.colorSpecsChildren + 1 })
    }

    removesizeChildrenLastElement() {
        var eleList = [...this.state.sizeChildren]
        var index = this.state.sizeSpecsChildren - 1;//keep 
        if (index !== -1);
        eleList.splice(index, 1);
        this.setState({ sizeChildren: eleList });
        this.setState({ sizeSpecsChildren: this.state.sizeSpecsChildren - 1 })
        console.log("removed " + index);

    }
    removecolorChildrenLastElement() {
        var eleList = [...this.state.colorChildren]
        var index = this.state.colorSpecsChildren - 1;//keep 
        if (index !== -1);
        eleList.splice(index, 1);
        this.setState({ colorChildren: eleList });
        this.setState({ colorSpecsChildren: this.state.colorSpecsChildren - 1 })
    }



    handleInit() {

        //adding color specs arrays on render
        for (let i = 0; i < this.state.colorSpecsChildren; i++) {
           // console.log(i)
            this.setState(prev => ({
                colorChildren: [...prev.colorChildren,
               <input className="color-specs" id={`color-specs-item${i}`} key={`cc-color-fcontrol${i}`} /> ]
            }))
        }

        //adding size specs arrays on render
        for (let j = 0; j < this.state.sizeSpecsChildren; j++) {

            this.setState(prevSlist => ({
                sizeChildren: [...prevSlist.sizeChildren,
                <input className="size-specs" id={`size-specs-item${j}`} key={`cc-color-fcontrol${j}`} />]
            }))
        }
    }
    componentDidMount() {
        this.handleInit();
    }
   
    render() {
        return (
            <CRow md={8} className="product-col-size-specs">
                <CCol md="6">
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Color Specifications</strong> <small>Type in all Product colors you have in stock For example White ,black or blue </small>
                        </CCardHeader>
                        <CCardBody>
                            <div className="color-specs-wrapper">  {this.state.colorChildren} </div>

                            <div className="add-button-wrapper" style={{ marginTop: 10 }}>
                                <CButton
                                    id="add-color-input-btn"
                                    className="add-button-wrapper"
                                    color={'primary'}
                                    active={'active'}
                                    onClick={() => this.updateSpecsInput("color", "add")}
                                >+</CButton>
                                <CButton
                                    id="remove-color-input-btn"
                                    className="add-button-wrapper"
                                    color={'primary'}
                                    active={'active'}
                                    onClick={() => this.updateSpecsInput("color", "remove")}
                                >-</CButton>

                            </div>

                        </CCardBody>

                    </CCard>
                </CCol>
                <CCol md="6">
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Size Specifications</strong> <small>Type in Product  sizes For example 34 for shoes , 5 inch for phones</small>
                        </CCardHeader>
                        <CCardBody>
                            <div className="size-specs-wrapper">{this.state.sizeChildren} </div>

                            <div className="add-button-wrapper" style={{ marginTop: 10 }}>
                                <CButton
                                    id="add-color-input-btn"
                                    className="add-button-wrapper"
                                    color={'primary'}
                                    active={'active'}
                                    onClick={() => this.updateSpecsInput("size", "add")}
                                >+</CButton>
                                <CButton
                                    id="remove-color-input-btn"
                                    className="add-button-wrapper"
                                    color={'primary'}
                                    active={'active'}
                                    onClick={() => this.updateSpecsInput("size", "remove")}
                                >-</CButton>

                            </div>

                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>

        )
    }
}
export default Specification