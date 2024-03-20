import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";

function PagesSidebar({ pagesData, setCurrentPageIndex }: { pagesData: CreateReviewPage[], setCurrentPageIndex: (index: number) => void }) {
    const [collapsed, setCollapsed] = useState(false);

    // Function to toggle the collapse state
    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <Sidebar className="sidebar" collapsed={collapsed} backgroundColor="rgb(242, 242, 242, 1)">
            <Menu>
                <MenuItem
                    onClick={() => toggleSidebar()}
                    icon={<MenuOutlinedIcon />}
                    className="d-flex justify-content-center align-items-center"
                />
                {!collapsed &&
                    pagesData.map((page, index) => {
                        const title = page.reviewTitle || `Page ${index + 1}`;
                        return (
                            <MenuItem onClick={() => setCurrentPageIndex(index)}>
                                {title}
                            </MenuItem>
                        );
                    })}
            </Menu>
        </Sidebar>
    )
}

export default PagesSidebar;