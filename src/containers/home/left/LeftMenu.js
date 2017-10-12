/**
 * Created by happyu on 2017/10/10.
 */
import React from 'react'
import { Menu, Icon } from 'antd'
import menus from '../../../config/menu'
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class LeftMenu extends React.PureComponent {
    render() {
        return(
            <Menu mode="inline" style={{ height: '100%'}}>
                {menus.map((menu,index) =>
                    <SubMenu
                        key={menu.key}
                        title={<span><Icon type={menu.icon}/><span>{menu.name}</span></span>}
                    >
                        {menu.child.map((subMenu, subIndex) =>
                            <MenuItem key={subMenu.key}><span><span><Icon type={subMenu.icon}/></span>{subMenu.name}</span></MenuItem>
                        )}
                    </SubMenu>
                )}
            </Menu>
        )
    }
}

export default LeftMenu