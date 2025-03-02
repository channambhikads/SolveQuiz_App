import React, {useState} from 'react';
import {getUserInfo} from "../api/users";
import {useEffect} from "react";
import {message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {SetUser} from "../redux/usersSlice";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import user_default from "../assets/user_default.png";


function ProtectedRoute({children}) {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState([]);
    const [colapsed, setColapsed] = useState(false);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const userMenu = [
        {
            title: "Home",
            paths: ["/dashboard"],
            icon: <i className="ri-home-5-line"></i>,
            onClick: () => navigate("/dashboard")
        },
        {
            title: "Quiz",
            paths: ["/exam"],
            icon: <i className="ri-user-line"></i>,
            onClick: () => navigate("/exam/quiz")
        },
        {
            title: "logout",
            paths: ["/logout"],
            icon: <i className="ri-logout-circle-r-line"></i>,
            onClick: () => {
                localStorage.removeItem("token");
                navigate("/");
            }
        },
    ]
    const getUserData = async () => {
        try {
            const response = await getUserInfo();
            console.log(response)
            if(response.success){
                message.success({
                    content: response.message,
                    style:{
                        fontSize: '16px',
                        padding: '10px',
                    }
                })
                dispatch(SetUser(response.data));
                setMenu(userMenu);
            }else{
                message.error(response.message)
            }
        }catch (e) {
            navigate("/login")
            message.error(e.message );
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUserData();
        } else {
            navigate("/login");
        }
    }, []);

    const isActiveOrNot = (paths)=>{
        if(paths.includes(activeRoute)){
            return true;
        }else{
            return false;
        }
    }

    const activeRoute = window.location.pathname;
    console.log(user?.username)


    return (
        <div className="layout">
            <div className="flex gap-2 w-full h-full h-100">
                <div className="sidebar">
                    <div className="flex flex-col items-center justify-center">
                        <img src={logo} alt="Logo" className="logo"/>
                        <h1 className="text-xl">
                            <div className="menu">
                                {menu.map((item, index) => {

                                    return <div
                                        className={`menu-item ${isActiveOrNot(item.paths) && 'active-menu-item'}`}
                                        key={index} onClick={item.onClick}
                                    >
                                        {item.icon}
                                        {!colapsed && <span className="">{item.title}</span>}
                                    </div>
                                })}
                            </div>
                        </h1>
                    </div>

                </div>
                <div className="body">
                    {/* <div className="header flex justify-between">

                        {!colapsed && <i className="ri-close-large-line" onClick={() => setColapsed(true)}></i>}
                        {colapsed && <i className="ri-menu-line" onClick={() => setColapsed(false)}></i>}
                    </div> */}
                    <div className="header flex items-center justify-center w-full relative">
                       <h1 className="text-2xl text-white text-center w-full">
                         SolveQuiz
                     </h1>
                     </div>
                    <div className="content">
                        {children}
                    </div>
                    <div className="footer flex items-center justify-center w-full relative">
                        <h6 className="text-2xl text-white text-center w-full">
                            1st SEM project
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProtectedRoute;