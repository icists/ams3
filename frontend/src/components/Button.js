import React from "react";
import { Button } from "semantic-ui-react";

const ButtonComponent = (props) => {
    return (
        <Button>
            {props.text}
        </Button>
    );
}

export default ButtonComponent;