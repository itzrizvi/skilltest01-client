import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    Form,
    Input,
    Button,
    TreeSelect,
    Checkbox,
    Row,
    Col,
    message
} from 'antd';
import { Link } from 'react-router-dom';
import './Home.css';

const baseURL = "https://skilltest01.onrender.com/sectors/api/getallsectors";
const baseURLPOST = "https://skilltest01.onrender.com/userdata/api/createuserdata";

export default function Home() {
    const [recordID, setRecordID] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'User Data Recoded Successfully!',
        });
    };
    const update = () => {
        messageApi.open({
            type: 'success',
            content: 'User Data Updated Successfully!',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'User Data Recode Failed!',
        });
    };

    const [sectors, setSectors] = useState([]);
    const [defaultValues, setDefaultValues] = useState({
        name: "",
        sector: "",
        termsagree: false
    })

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setSectors(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    const handleSubmit = values => {

        if (!recordID) {

            axios.post(baseURLPOST, values)
                .then((response) => {
                    setRecordID(response.data._id)
                    setDefaultValues(response.data);
                    success()
                }).catch(err => {
                    error()
                    console.log(err)
                });

        } else {
            axios.put(`http://localhost:8000/userdata/api/updateuserdata/${recordID}`, values)
                .then((response) => {
                    update();
                }).catch(err => {
                    error();
                    console.log(err);
                });
        }
    };


    return (
        <>
            {contextHolder}
            <Row style={{ marginTop: "50px" }}>
                <Col className="gutter-row" md={24} xs={24} sm={24}>
                    <Form
                        layout="horizontal"
                        onFinish={handleSubmit}
                        onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                        style={{
                            width: "60%", margin: "auto",
                            border: "1px solid #000",
                            padding: "20px 25px 25px 20px",
                            boxShadow: "2px 2px 12px -3px #000000"
                        }}
                    >
                        <h3 style={{ textAlign: "left" }}>* Name</h3>
                        <Form.Item name="name" rules={[{ required: true, message: 'Please Input Your Name!' }]}>

                            <Input style={{ height: "40px" }} defaultValue={defaultValues.name} name='name' />
                        </Form.Item>
                        <h3 style={{ textAlign: "left" }}>* Sectors</h3>
                        <Form.Item name="sector" rules={[{ required: true, message: 'Please Select a Sector!' }]}>
                            <TreeSelect
                                defaultValue={defaultValues.sector}
                                showSearch
                                allowClear
                                treeData={sectors}
                            />
                        </Form.Item>
                        <Form.Item name="termsagree" valuePropName='checked' rules={[{
                            required: true, transform: value => (value || undefined),
                            type: 'boolean', message: 'Please Accept the Terms!'
                        }]}>
                            <Checkbox defaultChecked={defaultValues.termsagree} name='termsagree' style={{ fontSize: "15px" }}>Agree to terms</Checkbox>
                        </Form.Item>

                        <Form.Item >
                            <Button htmlType='submit' style={{ width: "150px", fontSize: "16px", height: "40px" }}>{
                                recordID ? "Update" : "Save"
                            }</Button>
                        </Form.Item>

                        <Button style={{ fontSize: "16px", marginBottom: "20px" }}>
                            <Link to="/listview">See All List</Link>
                        </Button>
                    </Form>

                </Col>
            </Row>

        </>
    )
}
