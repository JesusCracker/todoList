import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'dva';
import {List, InputItem, WhiteSpace, Button, Flex, NoticeBar, Icon} from 'antd-mobile';
import styles from './mainPage.less';


const MainPage = (props) => {
    const dispatch = useDispatch();
    const {form: {getFieldProps, getFieldError}} = props;
    let errors;

    const handleData = () => {
        const {getFieldsValue} = props.form;
        const {...params} = getFieldsValue(['name', 'phone', 'address']);
        console.dir(params);

    };

    return (
        <div className={styles.container}>
            <div  className={styles.notices}>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    注：工作人员会在活动结束10个工作日内寄出奖品
                </NoticeBar>
            </div>

            <List>
                <div>
                    {/*<span style={{color: 'red'}}>{(errors = getFieldError('name')) ? errors.join(',') : null}</span>*/}
                    <InputItem
                        {...getFieldProps('name', {
                            // initialValue: "xxxxxxxx" || '',
                            rules: [{
                                required: true, message: '请输入姓名'
                            }]
                        })}
                        placeholder="请输入姓名"
                        clear
                    >姓名 :</InputItem>
                </div>

                <WhiteSpace/>
                {/*<span style={{color: 'red'}}>{(errors = getFieldError('phone')) ? errors.join(',') : null}</span>*/}
                <InputItem
                    {...getFieldProps('phone', {
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
                        // initialValue: "xxxxxxxx" || '',
                        rules: [{
                            required: true, message: '请输入地址'
                        }]
                    })}
                    clear
                    placeholder="请输入地址"
                >地址 :</InputItem>

            </List>

            <Flex justify="center" align={"center"} className={styles.btns}>
                <Flex.Item justify="center" align={"center"}>
                    <Button type="primary" style={{width: '50%'}} onClick={() => handleData()}>提交</Button>
                </Flex.Item>
                <Flex.Item justify="center" align={"center"}>
                    <Button type="primary" style={{width: '50%'}} onClick={() => {
                    }}>重置</Button>
                </Flex.Item>
            </Flex>




        </div>
    );
}

export default MainPage;