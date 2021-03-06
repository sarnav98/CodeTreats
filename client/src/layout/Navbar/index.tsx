import { TeamOutlined, CodeOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import logo from 'assets/img/logo.svg';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const items = [
    { key: '1', label: 'Home', path: '/', icon: <HomeOutlined /> },
    { key: '2', label: 'Snippets', path: '/snippets', icon: <CodeOutlined /> },
    { key: '3', label: 'Collab Editor', path: '/room', icon: <TeamOutlined /> },
];

export const Navbar: React.FC = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [current, setCurrent] = React.useState(items.find((_item) => location.pathname === _item.path)?.key); // stores current path key

    // change page route
    const onMenuClick = (item: any) => {
        const clicked = items.find((_item) => _item.key === item.key);
        history.push(clicked?.path as string);
    };

    React.useEffect(() => {
        setCurrent(items.find((_item) => location.pathname === _item.path)?.key); // change key on location change
    }, [location]);

    // gotcha for single snippet
    React.useEffect(() => {
        if (location.pathname.startsWith('/snippets')) {
            setCurrent('2');
        }
        if (location.pathname.startsWith('/room')) {
            setCurrent('3');
        }
    }, [location]);

    return (
        <div className='mt-1 mx-1'>
            <Menu mode='horizontal' selectedKeys={[current!]} onClick={onMenuClick}>
                {items.map((item) => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        {item.label}
                    </Menu.Item>
                ))}
                <div className='menu_left'>
                    <img src={logo} height='50px' className='pt-1' alt='logo' />
                </div>
            </Menu>
        </div>
    );
};
