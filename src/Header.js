function Header(props) {
    return (
        <div className="container">
            <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><a href="#" className="nav-link">{props.link1}</a></li>
                <li className="nav-item"><a href="#" className="nav-link">{props.link2}</a></li>
                <li className="nav-item"><a href="#" className="nav-link">{props.link3}</a></li>
                <li className="nav-item"><a href="#" className="nav-link">{props.link4}</a></li>
                <li className="nav-item"><a href="#" className="nav-link">{props.link5}</a></li>
            </ul>
            </header>
        </div> 
    )
}

export default Header;