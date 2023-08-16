import { Menu } from "primereact/menu";
import { Link, Outlet, Routes, useLocation, useNavigate } from "react-router-dom";
import Rotas from "../../Routes/routes";
import './Casket.css';
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import SVGLogo from "../img/LogoSVG";

export function Casket({ children }: { children?: any }) {
    const [userName, setUserName] = useState('User');
    const [activeMenuItem, setActiveMenuItem] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        const decoded: any = jwtDecode(sessionStorage.getItem('access_token')!);
        setUserName(`${decoded.given_name} ${decoded.family_name}`);
    }, []);

    const location = useLocation();

    let items = [
        {
            label: 'Balanço', icon: 'pi pi-dollar', command: () => { }, items: [
                {
                    label: 'Total', icon: 'pi pi-dollar', command: () => { navigate('balance') },
                },
                {
                    label: 'Vencidas', icon: 'pi pi-dollar', command: () => { navigate('due_dated') },
                },
                {
                    label: 'A Pagar', icon: 'pi pi-dollar', command: () => { navigate('payable') },
                },
                {
                    label: 'A Receber', icon: 'pi pi-dollar', command: () => { navigate('receivable') },
                }
            ]
        },
        { label: 'Gestão de Carteiras', icon: 'pi pi-wallet', command: () => { navigate('wallet') } },
        { label: 'Gestão de Acessos', icon: 'pi pi-user', command: () => { } }
    ];
    return (
        <div className="casket-container">

            <div className="A">
                <div className="margin"></div>
                <div className="topbar">
                    <ul>
                        <Avatar label={userName.substring(0, 1)} style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} />
                        <li key={userName}>
                            <span>{userName}</span>
                        </li>
                        <li>
                            <span style={{ cursor: "pointer" }} onClick={() => {
                                navigate('login');
                                sessionStorage.removeItem('access_token');
                                sessionStorage.removeItem('refresh_token');
                            }
                            }>Sair</span>
                            {/* <Link to={`/login`}><span>Sair</span></Link> */}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="column-order">

                <div className="menu-container" style={{backgroundColor: '#2b2b2b' }}>
                    <div className="logoBar">
                        <SVGLogo fill="#2B2B2B" width={200} height={200} />
                    </div>
                        {items.map((menuItem, index) => {
                            return <div className="menu-option">
                                <div className="menu-item" key={index} onClick={() => {
                                    setActiveMenuItem(menuItem);
                                    menuItem?.command!()
                                }}>
                                    <div className="menu-item-display" style={{ color: activeMenuItem?.label === menuItem.label ? '#fff' : '#d2d2d2', fontWeight: activeMenuItem?.label === menuItem.label ? 'bolder' : 'normal' }}>
                                        <a className={menuItem.icon} style={{ marginLeft: 15 }}></a>
                                        <span style={{ marginLeft: 10, fontSize: '14px' }}>{menuItem.label}</span>
                                    </div>
                                </div>
                                {menuItem?.items?.map((subItem, index) => {
                                    return <div className="submenu-item" onClick={() => {
                                        setActiveMenuItem(menuItem);
                                        subItem.command!();
                                    }}>
                                        <div className="submenu-item-display">
                                            <a className={subItem.icon} style={{ marginLeft: 15 }}></a>
                                            <span style={{ marginLeft: 10, fontSize: '14px' }}>{subItem.label}</span>
                                        </div>

                                    </div>
                                })}
                            </div>
                        })}
           
                </div>
                <div className="main-content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>

    )
}