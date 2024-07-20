import { useState } from "react";


const TabForm = ({tabs}) => {

    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className="form-content">
                <nav className="menuTab">
                    <ul>
                        {
                            tabs.map((tab, index) => (
                                <li key={index} className={activeTab === index ? 'active' : ''}>
                                    <a href="#" className="tab-label" onClick={() => setActiveTab(index)}>{tab.label}</a>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className="content">
                    {tabs[activeTab].content}
                </div>

                <div className="paginationButton">
                    <button className="btn btn-outline-secondary btn-sm"
                            onClick={() => setActiveTab(activeTab - 1)}
                            disabled={activeTab === 0}>
                        
                        Back
                    </button>
                    <button className="btn btn-outline-secondary btn-sm"
                            onClick={() => setActiveTab(activeTab + 1)}
                            disabled={activeTab === tabs.length - 1}>
                        Next
                        
                    </button>
                </div>
            </div>

        </>
    )
}

export default TabForm;
