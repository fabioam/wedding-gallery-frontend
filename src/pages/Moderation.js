import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import Auth, { useAuthActions, useAuthUser, useAuthState } from 'use-eazy-auth'
import {Button} from "antd";
import {CheckOutlined, DeleteOutlined} from "@ant-design/icons";
import {map} from "rxjs/operators";
import axios from 'axios';
import React from "react";

const GalleryState = rj({
    effectCaller: rj.configured(),
    effect: (token) => () =>
        ajax.getJSON(`/gallery/pending/`, {
            Authorization: `Bearer ${token}`,
        }),
})


export default function Moderation(asdas) {
    const { user, token } = useAuthUser()
    const { authenticated } = useAuthState()
    const { logout } = useAuthActions()
    const [{ data: images }] = useRunRj(GalleryState, [], false)

    const onApprove = (id) => {
        console.log(asdas);
        axios.patch(`/gallery/approve/${id}/`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                window.location.reload();  // sorry about that. dont know how to remove an element from a React list
            })
    }
    const onReject = (id) => {
        console.log(token);

        axios.delete(`/gallery/pending/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            window.location.reload();  // sorry about that. dont know how to remove an element from a React list
            })
    }

    return (
        <div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {images &&
                images.map((item, index) => (
                    <div className="col" id={item.id}>
                        <div className="card shadow-sm">
                            <img src={item.image_thumb}
                            />
                            <div className="card-body">
                                <small className="card-text">Enviado em {item.created_at_strftime}</small>
                                <div className="d-flex justify-content-between align-items-center pt-3">
                                    <div className="btn-group">
                                        <Button
                                            key="stop"
                                            icon={<CheckOutlined />}
                                            onClick={() => onApprove(item.id)}
                                            type="button"
                                            title="Aprovar foto"
                                        />

                                    </div>
                                    <div className="btn-group">
                                        <Button
                                            key="stop"
                                            icon={<DeleteOutlined />}
                                            onClick={() => onReject(item.id)}
                                            type="button"
                                            title="Excluir foto"
                                        />
                                    </div>
                                    {/*<input type="button" value="Delete" onClick={() => deleteRow(item)} />*/}
                                    {/*<button onClick={deleteRow.bind(this, image)}>Deletar linha</button>*/}
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            <div className="text-center">
                <button onClick={logout} className="ant-btn ant-btn-light ant-btn-lg mt-5">
                    Logout
                </button>
            </div>
        </div>


    )
}