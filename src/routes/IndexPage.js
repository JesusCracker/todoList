import React, {useState,useEffect,useRef,useCallback} from 'react';
import MainPage from "../components/mainPage";
import { createForm } from 'rc-form';
import {withRouter} from "dva/router";

const IndexPage = (props) => {
    return <MainPage {...props} />

}

//props里面其实有router，我这里就是玩儿
export default createForm()(withRouter(IndexPage));