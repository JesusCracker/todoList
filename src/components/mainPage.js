import React, {useState, useEffect, useRef, useCallback} from 'react';
import queryString from 'query-string';
import {useSelector, shallowEqual, useDispatch} from 'dva';
import {List, InputItem, WhiteSpace, Button, Flex, NoticeBar, Icon, Toast} from 'antd-mobile';
import styles from './mainPage.less';


const MainPage = (props) => {

    const dispatch = useDispatch();
    const {form: {getFieldProps, getFieldError}, location} = props;
    const queryParams = queryString.parse(location.search);

    const {mainPage: {userInfo}} = useSelector(
        ({
             mainPage,
             loading,
         }) => {
            return {
                mainPage,
                loading: loading.effects['mainPage/fetchUserInfo'],
            };
        },
        shallowEqual);


    /*     if (Object.keys(queryParams).indexOf('phoneNo') === -1 || Object.keys(queryParams).indexOf('userName') === -1 || Object.keys(queryParams).indexOf('address') === -1) {
             Toast.fail('参数不完整', 1);
         } else {*/
    useEffect(() => {
        dispatch({
            type: "mainPage/fetchUserInfo",
            payload: {
                ...queryParams
            }
        });
    }, []);
    // }


    const {account, address, applyDate, giftCode, giftName, phoneNo, serialCode, userName} = userInfo;

    //提交信息
    const handleData = () => {

        const {getFieldsValue} = props.form;
        const {...params} = getFieldsValue(['userName', 'phoneNo', 'address']);

        if (Object.values(params).indexOf(undefined) !== -1) {
            Toast.fail('填写信息不为空', 1);
            return;
        }

        params.phoneNo = params.phoneNo && params.phoneNo.replace(/\s*/g, "")
        const regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if(!regs.test(params.phoneNo)){
            Toast.fail('手机号输入不合法', 1.5);
            return;
        }

        dispatch({
            type: "mainPage/saveUserInfo",
            payload: {
                ...queryParams,
                ...params
            }
        }).then((res) => {
            if (res.data.code === '200') {
                Toast.success('申请成功！');
            }

        });


    };

    //重置
    const reset = () => {
        // props.form.resetFields();
        props.form.setFieldsValue({
            userName: undefined,
            phoneNo: undefined,
            address: undefined,
        })
    };

    return (
        <div className={styles.container}>
            <div className={styles.notices}>
                <NoticeBar marqueeProps={{loop: true, style: {padding: '0 7.5px'}}}>
                    注：工作人员会在活动结束10个工作日内寄出奖品
                </NoticeBar>
            </div>

            <List>
                <div>

                    <InputItem
                        {...getFieldProps('userName', {
                            initialValue: userName || '',
                            rules: [{
                                required: true, message: '请输入姓名'
                            }]
                        })}
                        placeholder="请输入姓名"
                        clear
                    >姓名 :</InputItem>
                </div>

                <WhiteSpace/>
                <InputItem
                    {...getFieldProps('phoneNo', {
                        initialValue: phoneNo || '',
                        rules: [{
                            required: true, message: '请输入手机号码'
                        }]
                    })
                    }
                    clear
                    type="phone"
                    placeholder="请输入手机号码"
                >手机号码 :</InputItem>
                <WhiteSpace/>

                <InputItem
                    {...getFieldProps('address', {
                        initialValue: address || '',
                        rules: [{
                            required: true, message: '请输入地址'
                        }]
                    })}
                    clear
                    placeholder="请输入地址"
                >地址 :</InputItem>

                <InputItem

                    {...getFieldProps('giftTemp', {
                        initialValue: giftName || '',
                    })}
                    editable={false}
                >我的奖品 :</InputItem>

            </List>

            {/*       <Card className={styles.myPrice}>
                <Card.Body>
                    <div>我的奖品:</div>
                </Card.Body>
            </Card>*/}

            <Flex justify="center" align={"center"} className={styles.btns}>
                <Flex.Item justify="center" align={"center"}>
                    <Button icon="check-circle-o" type="primary" style={{width: '50%'}}
                            inline size="small"
                            onClick={() => handleData()}>提交</Button>
                </Flex.Item>
                <Flex.Item justify="center" align={"center"}>
                    <Button type="primary"
                            inline size="small"
                            style={{width: '50%'}}
                            onClick={() => reset()}>重置</Button>
                </Flex.Item>
            </Flex>


        </div>
    );
}

export default MainPage;