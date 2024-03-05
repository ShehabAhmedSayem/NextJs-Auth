"use client"

import { StepperContext } from "@/context/stepper-context";
import { useContext } from "react";


export const useStepperContext = () => {
    return useContext(StepperContext);
};