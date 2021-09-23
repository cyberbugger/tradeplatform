import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

export type Callbacks = {
    snapshot: (payload: any) => void
    l2update: (payload: any) => void
    match: (payload: any) => void
    subscriptions: (payload: any) => void
}

type CallbackTypes = keyof Callbacks

export class Socket {
    connection: W3CWebSocket
    subscribed: string | undefined

    constructor(url: string) {
        console.log("Socket created")
        this.connection = new W3CWebSocket(url)
        this.subscribed = undefined
    }

    send(msg: object) {
        let { connection } = this

        if (!connection) return

        if (connection.readyState !== connection.OPEN) {
            connection.onopen = () => connection.send(JSON.stringify(msg))
            return
        }
        connection.send(JSON.stringify(msg))
    }

    close() {
        console.log("Socket destroyed")
        this.connection.close()
    }

    handlemessages(message: IMessageEvent, cbs: Callbacks) {
        const payload = JSON.parse(message.data as string)
        switch(payload.type as CallbackTypes) {
            case "snapshot":
            case "l2update":
            case "match":
            case "subscriptions":
                cbs[payload.type as CallbackTypes](payload)
                return
        }
    }

    setSubscription(s: string) {
        this.subscribed = s
    }

    unsetSubscriptions() {
        this.subscribed = undefined
    }
}