import React from 'react';
import PageTitle from "../../../components/PageTitle";
import {Breadcrumb, Button} from "antd";
import "../../../stylesheets/form-elements.css";
import {useNavigate} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";

function Exams() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between">
                <PageTitle title="Exams"/>
                <div className="flex items-center mt-2">
                    <Button className="primary-outlined-btn flex items-center"
                            onClick={() => {
                                navigate("/admin/exams/add")
                            }}>
                        <i className="ri-add-circle-line"></i>
                        Add Exam
                    </Button>
                    <Button className="primary-outlined-btn flex items-center ml-2"
                            onClick={() => {
                                navigate("/exams/quiz")
                            }}>
                        <i className="ri-add-circle-line"></i>
                        Take Exam
                    </Button>
                </div>
            </div>
            <div>
                <Breadcrumb
                    items={[
                        {
                            href: '/dashboard',
                            title: <HomeOutlined/>,
                        },

                        {
                            title: 'Exams',
                        },
                    ]}
                />
            </div>
            <div className="divider"></div>
        </div>
    );
}

export default Exams;
