    import { Menu, MenuItem, Sidebar, sidebarClasses } from "react-pro-sidebar";
    import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
    import { useEffect, useState } from "react";
    import { Col, Image, Row } from "react-bootstrap";
    import deleteBlack from "../images/deleteBlack.svg";
    import deleteWhite from "../images/deleteWhite.svg";

    type PagesSidebarProps = {
        pagesTitles: string[];
        currentPageIndex: number;
        setCurrentPageIndex: (index: number) => void;
        isDarkMode?: boolean;
        currentStep?: number;
        handleDeletePage?: (pageIndex: number) => void;
    };

    function PagesSidebar({ pagesTitles, currentPageIndex, setCurrentPageIndex, isDarkMode, currentStep, handleDeletePage}: PagesSidebarProps) {
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
            <Sidebar className="sidebar" collapsed={collapsed} style={{borderWidth: 0}}
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'var(--bs-body-bg)'
                    },
                }}
            >
                <Menu menuItemStyles={{
                    button: {
                        [`&:hover`]: {
                        backgroundColor: 'var(--bs-secondary-bg)',
                        },
                    },
                    }}
                >
                    <MenuItem
                        onClick={() => toggleSidebar()}
                        icon={<MenuOutlinedIcon />}
                        className="d-flex justify-content-center align-items-center"
                    />
                    {!collapsed &&
                        pagesTitles.map((pageTitle, index) => {
                            const title = pageTitle || `Page ${index + 1}`;
                            return (
                                <MenuItem 
                                    key={index} 
                                    onClick={() => setCurrentPageIndex(index)} 
                                    style={currentPageIndex === index ? { backgroundColor: "var(--active-color)" } : {}}
                                    >
                                    <Row className="d-flex justify-content-center align-items-center">
                                        <Col></Col>
                                        <Col style={{ fontSize: "20px" }}>{title}</Col>
                                  
                                        <Col>
                                            {handleDeletePage &&                         
                                                <Image 
                                                className="justify-content-end" 
                                                onClick={(e) => { e.stopPropagation(); handleDeletePage(index); }} 
                                                src={isDarkMode ? deleteWhite : deleteBlack} width={30}/>
                                            }
                                        </Col>
                                    </Row>
                                </MenuItem>
                            );
                        })}
                </Menu>
            </Sidebar>
        )
    }

    export default PagesSidebar;