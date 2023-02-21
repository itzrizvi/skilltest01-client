import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    Row,
    Col,
    Card,
    Button,
    Spin
} from 'antd';
import { Link } from 'react-router-dom';
import './ListView.css';

const baseURL = "https://skilltest01.onrender.com/userdata/api/getalluserdata";

export default function ListView() {


    const [userDataList, setUserDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setUserDataList(response.data);
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <>
            <Row style={{ margin: 0, paddingTop: "50px" }} gutter={16}>
                <Col className="gutter-row" span={8}>
                    <h2>All User Data</h2>
                </Col>
                <Col className="gutter-row" offset={8} span={8}>
                    <Button style={{
                        fontSize: "16px", height: "36px",
                        border: " 1px solid #000000"
                    }}>
                        <Link to="/">Go For Another Entry</Link>
                    </Button>
                </Col>
            </Row>
            <Row style={{ margin: 0, paddingTop: "50px" }} gutter={{ lg: 16, md: 16, sm: 8, xs: 8 }} >
                {isLoading && <Spin size="large" style={{ textAlign: "center", width: "200px", margin: "auto", display: "block" }} />}
                {
                    userDataList.map(item => <Col xs={12} sm={12} md={8} lg={8} key={item._id} style={{ marginBottom: "10px" }}>
                        <Card title={item.name} bordered={false} style={{
                            backgroundColor: "darkslategray",
                            color: "#ffffff",
                            boxShadow: "2px 2px 3px 0px #000000",
                            fontSize: "15px"
                        }}>
                            <p><span style={{ fontWeight: "700" }}>Sector Name</span>: {item.sector}</p>
                            {item.termsagree === true ? <p><span style={{ fontWeight: "700" }}>Term</span>: Agreed On Terms</p> : <p>Not Agreed On Terms</p>}
                        </Card>
                    </Col>
                    )
                }

            </Row>
        </>
    )
}
