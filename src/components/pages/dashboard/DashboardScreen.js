import React from 'react'
import { Btn } from '../../ui/Buttons/Btn';

import { Card } from '../../ui/Cards/Card'
import { CardMenu } from '../../ui/Cards/CardMenu';
import { DateComponent } from '../../shared/DateComponent';
import { Banner } from '../../ui/Banners/Banner';

export const DashboardScreen = () => {
    
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Dashboard</h1>
                    <DateComponent/>
                </div>
            </div>
            <div className="flex-break"></div>
                
            <div className="row">
                <Banner color="blue" md="3" sm="12" css="m-1" icon="fas fa-tags">
                    <p>8</p>
                    <small>Actives</small>
                </Banner>

                <Banner color="success" md="3" sm="12" css="m-1" icon="fas fa-check" type="circle">
                    <p>8</p>
                    <small>Actives</small>
                </Banner>

                <Banner color="warning" md="3" sm="12" css="m-1" icon="fas fa-pen" type="square">
                    <p>8</p>
                    <small>Actives</small>
                </Banner>

                <Banner color="default" md="3" sm="12" css="m-1" icon="fas fa-pen" type="square">
                    <p>8</p>
                    <small>Actives</small>
                </Banner>
            </div>

            <div className="row">

                <Card color="danger" title="Otro" css="flex-1 m-1" sm="12">
                    <div className="card-header">
                        <div>Users</div>
                        <CardMenu id="1">
                            <a href="/user_add">
                                Add user
                            </a>
                        </CardMenu>
                    </div>
                    <div className="card-body">
                        <p>Texto de prueba</p>
                    </div>
                </Card>

                <Card color="default" title="Otro" css="flex-1 m-1" sm="12">
                    <div className="card-header">
                        <div>Categories</div>
                        <CardMenu id="2">
                            <a href="/user_add">
                                Add category
                            </a>
                        </CardMenu>
                    </div>
                    <div className="card-body">
                        <p>Texto de prueba</p>
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
                        <p>Texto de prueba</p>
                    </div>
                </Card>

            </div>

            <div className="row">
                <Card color="success" title="Otro" css="flex-1 m-1" sm="12">
                    <div className="card-header">
                        <div>Categories</div>
                        <CardMenu id="4">
                            <a href="/user_add">
                                Add category
                            </a>
                        </CardMenu>
                    </div>
                    <div className="card-body">
                        <p>Texto de prueba</p>
                    </div>
                </Card>
            </div>

            <div className="row">
                <Btn 
                    href="add_user" 
                    outline 
                    color="blue"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    color="blue"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    outline 
                    color="default"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    color="default"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    outline 
                    color="warning"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    color="warning"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    outline 
                    color="danger"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    color="danger"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    outline 
                    color="success"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
                <Btn 
                    href="add_user" 
                    color="success"
                    sm="12"
                    md="3"
                    css="m-1"
                >
                    Add user
                </Btn>
            </div>

            <div className="row">
                
            </div>

        </div>
    )
}
