import { useCallback } from "react";
import { CHANNELS, UNSUB_RESET_COUNTER } from "../../constants";
import { Match } from "./types";

let timer = +new Date()
let intervalInMs = 50;

export const useSnapshotCallback = (
    setAsks: React.Dispatch<React.SetStateAction<string[][]>>,
    setBids: React.Dispatch<React.SetStateAction<string[][]>>,
) => {
    return useCallback((payload: any) => {
        setAsks(payload.asks.slice(0, 10))
        setBids(payload.bids.slice(0, 10))
    }, [setAsks, setBids])
}

export const useLevelUpdateCallback = (
    setUpdate: React.Dispatch<React.SetStateAction<string[]>>,
    socket: any,
) => {
    return useCallback((payload: any) => {
        if (!socket.subscribed) return
        if (socket.subscribed !== payload.product_id) return 
        if (+new Date() - timer < intervalInMs) return 
        
        const [[ev, price, qty]] = payload.changes
        if (!Math.ceil(qty)) return
        setUpdate([ev, price, qty])

        timer = +new Date()
    }, [socket.subscribed, setUpdate])
}

export const useMatchCallback = (
    setOrder: React.Dispatch<React.SetStateAction<Match | undefined>>,
    socket: any
) => {
    return useCallback((payload: any) => {
        if (!socket.subscribed) return

        const { product_id, time, size, side, price } = payload
        if (socket.subscribed !== product_id) return
        
        const match = { key: product_id+time+size+price+side, product_id, price, side, size, timestamp: new Date(time).toUTCString() }
        setOrder(match)
    }, [socket.subscribed, setOrder])
}

let resetCounter = UNSUB_RESET_COUNTER;
export const useSubscriptionsCallback = (
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    socket: any
) => {
    return useCallback((payload: any) => {
        setIsDisabled(false)
        
        if (!payload.channels.length) {
            resetCounter--
            if (socket.subscribed) {
                socket.send({
                    type: "subscribe",
                    product_ids: [socket.subscribed],
                    channels: CHANNELS
                })
                if (resetCounter === 0) {
                    alert(`Cannot find updates for ${socket.subscribed}. Please select another product from list.`)
                    socket.unsetSubscriptions()
                    resetCounter = UNSUB_RESET_COUNTER
                }
            }
        } else {
            resetCounter = UNSUB_RESET_COUNTER
        }
    }, [setIsDisabled, socket])
}