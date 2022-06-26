import {useLocation}from "react-router-dom";

export default function QueryParams() {
    return new URLSearchParams(useLocation().search);
   
}
