import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function PagesSidebar({ pagesTitles, setCurrentPageIndex, currentStep, handleDeletePage}: { pagesTitles: string[], setCurrentPageIndex: (index: number) => void, currentStep?: number, handleDeletePage: (pageIndex: number) => void }) {
    const [collapsed, setCollapsed] = useState(false);

    // Function to toggle the collapse state
    const toggleSidebar = () => setCollapsed(!collapsed);

    useEffect(() => {
        if (currentStep === 3){
            setCollapsed(true);
        } else{
            setCollapsed(false);
        }
    }, [currentStep])

    return (
        <Sidebar className="sidebar" collapsed={collapsed} backgroundColor="rgb(242, 242, 242, 1)">
            <Menu>
                <MenuItem
                    onClick={() => toggleSidebar()}
                    icon={<MenuOutlinedIcon />}
                    className="d-flex justify-content-center align-items-center"
                />
                {!collapsed &&
                    pagesTitles.map((pageTitle, index) => {
                        const title = pageTitle || `Page ${index + 1}`;
                        return (
                            <MenuItem key={index} onClick={() => setCurrentPageIndex(index)}>
                                {title}
                                <Button onClick={(e) => { e.stopPropagation(); handleDeletePage(index); }}>Delete</Button>         
                            </MenuItem>
                            
                        );
                    })}
            </Menu>
        </Sidebar>
    )
}

export default PagesSidebar;