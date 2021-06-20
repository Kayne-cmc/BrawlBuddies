import React from 'react';
import { Typography } from '@material-ui/core';
import './Footer.css';

import { withStyles } from '@material-ui/core/styles';

const WhiteTypography = withStyles({
    root: {
        color: "rgb(255,255,255)"
    }
})(Typography);

export default function Footer() {
    return (
        <div className="Footer">
            <WhiteTypography variant="h5">Made with ❤️ by <a href="https://kaynechu.me" target="blank" style={{color: "rgb(6,69,173)"}}>Kayne</a></WhiteTypography>
        </div>
    )
}
