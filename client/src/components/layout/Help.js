import React from 'react'
import StepOne from '../../images/Step1.png';
import StepTwo from '../../images/Step2.png';
import StepThree from '../../images/Step3.png';
import StepFour from '../../images/Step4.png';
import { Typography } from '@material-ui/core';

export default function Help() {
    return (
        <div className="Help">
            <div className="step">
                <img src={StepOne} alt="Step one" />
                <Typography variant="h5">Open Steam and locate your account details in the dropdown menu on the top right of the window.</Typography>
            </div>
            <div className="step">
                <img src={StepTwo} alt="Step Two" />
                <Typography variant="h5">Your Steam ID is located under the title of the page.</Typography>
            </div>
            <div className="step">
                <img src={StepThree} alt="Step Three" />
                <Typography variant="h5">On the top left of the window, locate the friends section and follow the "Add a Friend" section on the dropdown menu.</Typography>
            </div>
            <div className="step">
                <img src={StepFour} alt="Step Four" />
                <Typography variant="h5">Your friend code will be located on the first page.</Typography>
            </div>

        </div>
    )
}
