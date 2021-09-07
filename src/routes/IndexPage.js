import React, {useState,useEffect,useRef,useCallback} from 'react';
import MainPage from "../components/mainPage";
import { createForm } from 'rc-form';


const IndexPage = (props) => {
    return <MainPage {...props} />

}

export default createForm()(IndexPage);