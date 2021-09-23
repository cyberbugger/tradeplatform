import { Layout, Row } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Socket } from './socket';
import { useLevelUpdateCallback, useMatchCallback, useSnapshotCallback, useSubscriptionsCallback } from './useSocketCallbacks';
import { CHANNELS } from '../../constants';
import { Footer } from '../Common/Footer';
import { MarketHeader } from './MarketHeader';
import { MatchViewWrapper } from './MatchViewWrapper';
import { PriceViewWrapper } from './PriceViewWrapper';
import { Match } from './types';

const { Content } = Layout;

const userStyles = createUseStyles({
    appMainContent: {
        color: 'white',
        minHeight: 'calc(100vh - 155px)'
    }
})

export const MarketPlatform = () => {
    const classes = userStyles();

    const socket = useMemo(() => new Socket("wss://ws-feed.pro.coinbase.com"), [])
    
    const [product, setProduct] = useState<string | undefined>(undefined)
    const [asks, setAsks] = useState<string[][]>([])
    const [bids, setBids] = useState<string[][]>([])
    const [matches, setMatches] = useState<Match[]>([])

    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [update, setUpdate] = useState<string[]>([])
    const [order, setOrder] = useState<Match | undefined>()

    const snapshotCb = useSnapshotCallback(setAsks, setBids)
    const levelCb = useLevelUpdateCallback(setUpdate, socket)
    const matchCb = useMatchCallback(setOrder, socket)
    const subscriptionsCb = useSubscriptionsCallback(setIsDisabled, socket)

    const callbacks = useMemo(() => ({
        snapshot: snapshotCb,
        l2update: levelCb,
        match: matchCb,
        subscriptions: subscriptionsCb,
    }), [snapshotCb, levelCb, matchCb, subscriptionsCb])

    const handleProductSelect = useCallback((newProduct: string | undefined) => {
        setIsDisabled(true)
        setProduct(newProduct)
    }, [])

    const setEmpty = useCallback(() => {
        setAsks([])
        setBids([])
        setMatches([])
    }, [])

    useEffect(() => {
        if (update.length) {
            const [ev, price, qty] = update
            if (ev === "sell") 
                setAsks([[price, qty], ...asks.slice(0, 9)])
            else if (ev === "buy") 
                setBids([[price, qty], ...bids.slice(0, 9)])

            setUpdate([])
        }
    }, [asks, bids, update])

    useEffect(() => {
        if (order) {
            setMatches([order, ...matches.slice(0, 19)])
            setOrder(undefined)
        }
    }, [matches, order])

    useEffect(() => {
        // dropdown cleared
        if (!product && socket.subscribed) {
            socket.send({
                type: "unsubscribe",
                product_ids: [socket.subscribed],
                channels: CHANNELS
            })
            socket.unsetSubscriptions()
            setEmpty()
        }

        // clear to selected in dropdown
        if (product && !socket.subscribed) {
            socket.connection.onmessage = msg => {
                socket.handlemessages(msg, callbacks)
            }
            socket.send({
                type: "subscribe",
                product_ids: [product],
                channels: CHANNELS
            })
            socket.setSubscription(product)
        }

        // when product changed in dropdown
        if (product && socket.subscribed && product !== socket.subscribed) {
            socket.send({
                type: "unsubscribe",
                product_ids: [socket.subscribed],
                channels: CHANNELS
            })
            socket.unsetSubscriptions()
            setEmpty()

            socket.setSubscription(product)
        }
    }, [product, socket, socket.subscribed, callbacks, setEmpty])

    return (
        <Layout>
            <MarketHeader
                product={product}
                onSelectProduct={handleProductSelect}
                isDisabled={isDisabled}
            />
            <Content>
                <Row className={classes.appMainContent} justify="center" align="middle">
                    <PriceViewWrapper bids={bids} asks={asks} product={product} isDisabled={isDisabled} />
                    <MatchViewWrapper product={product} isDisabled={isDisabled} matches={matches} />
                </Row>
                <Footer />
            </Content>
        </Layout>
    );
}
