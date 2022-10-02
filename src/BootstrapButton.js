function BootstrapButton(props) {
    return (
        <button className={"btn " + props.btnColor}>
            {props.children}
        </button>
    )
}

export default BootstrapButton;