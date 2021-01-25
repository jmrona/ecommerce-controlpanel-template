import React from 'react'

import { Card } from '../../ui/Cards/Card'
import { CardMenu } from '../../ui/Cards/CardMenu';

export const DashboardScreen = () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Dashboard</h1>
                </div>
            </div>
            <div className="flex-break"></div>
                
            <div className="row">

                <Card color="danger" title="Otro" css="flex-1 m-1" sm="12">
                    <div className="card-header">
                        <div>Users</div>
                        <CardMenu id="1">
                            <a href="/user_add">Add user</a>
                        </CardMenu>
                    </div>
                    <div className="card-body">
                        
                    </div>
                </Card>

                <Card color="default" title="Otro" css="flex-1 m-1" sm="12">
                    <div className="card-header">
                        <div>Categories</div>
                        <CardMenu id="2">
                            <a href="/user_add">
                                <i className="fas fa-plus"></i>
                                Add category
                            </a>
                        </CardMenu>
                    </div>
                    <div className="card-body">
                        
                    </div>
                </Card>

                <Card color="warning" title="Otro" css="flex-1 m-1" sm="12">
                    <div className="card-header">
                        <div>Products</div>
                        <CardMenu id="3">
                            <a href="#home">Home</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </CardMenu>
                    </div>
                    <div className="card-body">
                        
                    </div>
                </Card>

            </div>
        </div>
    )
}
