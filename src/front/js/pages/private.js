import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import '../../styles/private.css'


export const Private = () => {
    const { store, actions } = useContext(Context);
    const [authStatus, setAuthStatus] = useState("Pending");
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            let result = await actions.getInvoices();
            if (result) {
                setAuthStatus("granted")
            } else { setAuthStatus("denied") }
        }
        authenticate()
    }, [actions])

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    }

    return (
        <div className="private-page">
            <h1>Private Page</h1>
            {authStatus === "Pending" ? (
                <p>Loading...</p>
            ) : authStatus === "denied" ? (
                <p>Access Denied</p>
            ) : authStatus === "granted" ? (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Invoice #</th>
                                <th scope="col">Invoice Amount</th>
                                <th scope="col">Invoice Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.invoices.map((invoice, index) => (
                                <tr key={index}>
                                    <th scope="row">{invoice.invoice_number}</th>
                                    <td>{invoice.invoice_amount}</td>
                                    <td>{invoice.invoice_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>An error occurred, please try again later.</p>
            )}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );

}
