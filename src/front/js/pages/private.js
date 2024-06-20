import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";


export const Private = () => {
    const { store, actions } = useContext(Context); 

    useEffect(() => {
        actions.getInvoices();
    }, [])

    return (
        <>
            Private page

            <button onClick={() => {actions.logout()}}>Logout</button>
        </>
    );
}