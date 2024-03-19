import { Menu } from "primereact/menu";
import { Link, Outlet, Routes, useLocation, useNavigate } from "react-router-dom";
import Rotas from "../../Routes/routes";
import './Casket.css';
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import { Button } from "primereact/button";
import { Sidebar } from 'primereact/sidebar';
import SVGLogo from '../img/LogoSVG'
export function Casket({ children }: { children?: any }) {
    const [userName, setUserName] = useState('User');
    const [activeMenuItem, setActiveMenuItem] = useState<any>();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const navigateMenu = (url: string) => {
        navigate(url);
        setShowMenu(false);
    }
    useEffect(() => {
        if (sessionStorage.getItem('access_token')!) {
            const decoded: any = jwtDecode(sessionStorage.getItem('access_token')!);
            setUserName(`${decoded.given_name} ${decoded.family_name}`);
        } else {
            navigate('login')
        }

    }, []);

    const location = useLocation();

    let items = [
        { label: 'Dashboard', icon: 'pi pi-user', command: () => { navigateMenu('dashboard') }, navigable: true },
        {

            label: 'Balanço', icon: 'pi pi-dollar', command: () => { }, navigable: false, items: [
                {
                    label: 'Total', icon: 'pi pi-dollar', command: () => { navigateMenu('balance') }, navigable: true
                },
                {
                    label: 'Vencidas', icon: 'pi pi-dollar', command: () => { navigateMenu('due_dated') }, navigable: true
                },
                {
                    label: 'A Pagar', icon: 'pi pi-dollar', command: () => { navigateMenu('payable') }, navigable: true
                },
                {
                    label: 'A Receber', icon: 'pi pi-dollar', command: () => { navigateMenu('receivable') }, navigable: true
                }
            ]
        },
        { label: 'Gestão de Carteiras', icon: 'pi pi-wallet', command: () => { navigateMenu('wallet') }, navigable: true },
        { label: 'Loja', icon: 'pi pi-user', command: () => { navigateMenu('store') }, navigable: true }
    ];
    return (
        <div className="casket-container">

            <div className="A">
                <div className="topbar">
                    <div className="grid" style={{ width: '100%'}}>
                        <div className="col-6 md:col-11">
                            <div style={{ width: '10%', marginLeft: 20 }}>
                                <Button icon="pi pi-bars" outlined onClick={() => setShowMenu(!showMenu)}></Button>
                            </div>
                        </div>

                        <div className="col-5 md:col-1" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <SVGLogo style={{ width: '45px', height: '45px' }} />
                        </div>
                    </div>
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

                <Sidebar visible={showMenu} onHide={() => { setShowMenu(false) }} style={{ backgroundColor: '#2b2b2b' }}>
                    <div style={{ width: '100%', backgroundColor: '#2b2b2b' }}>
                        <div style={{ height: '100px' }}></div>
                        {items.map((menuItem, index) => {
                            return <div key={index}>
                                <div className="menu-item" key={index} style={{ cursor: menuItem.navigable ? 'pointer' : 'auto' }} onClick={() => {
                                    setActiveMenuItem(menuItem);
                                    menuItem?.command!()
                                }}>
                                    <div className="menu-item-display" style={{ color: activeMenuItem?.label === menuItem.label ? '#fff' : '#d2d2d2', fontWeight: activeMenuItem?.label === menuItem.label ? 'bolder' : 'normal' }}>
                                        <a className={menuItem.icon} style={{ marginLeft: 15 }}></a>
                                        <span style={{ marginLeft: 10, fontSize: '14px' }}>{menuItem.label}</span>
                                    </div>
                                </div>
                                {menuItem?.items?.map((subItem, index) => {
                                    return <div key={index} className="submenu-item" onClick={() => {
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
                </Sidebar>

                <div className="main-content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>

    )
}