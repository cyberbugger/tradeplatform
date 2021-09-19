import { Badge, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { MarketPlatformProps } from './types';
import SubscribedProduct from '../SubscribedProduct';

const { Sider, Content } = Layout;
const client = new W3CWebSocket('wss://ws-feed.pro.coinbase.com');

export const MarketPlatform = ({availableProducts} : MarketPlatformProps) => {
    const [product, setProduct] = useState<string | undefined>(undefined)

    const handleProductSelect = (newProduct: string | undefined) => {
        const unsubMsg = {
            type: "unsubscribe",
            product_ids: [product],
            channels: ["level2", "matches"]
        }

        if(client.readyState !== client.OPEN) {
            client.onopen = () => client.send(JSON.stringify(unsubMsg))
        }
        client.send(JSON.stringify(unsubMsg))

        setProduct(newProduct)

        if (!!newProduct) {
            const subMsg = {
                type: "subscribe",
                product_ids: [newProduct],
                channels: ["level2", "matches"]
            }
            
            if(client.readyState !== client.OPEN) {
                client.onopen = () => client.send(JSON.stringify(subMsg))
            }
            client.send(JSON.stringify(subMsg))
        }
    }

    useEffect(() => {
        client.onopen = () => console.log("websocket connection established")
        client.onmessage = (message) => console.log('message received', message.data)

        return () => client.close()
    }, [])

    return (
        <Layout>
            <Sider className="app-sidebar">
                <SystemStatus />
                <SubscribedProduct
                    availableProducts={availableProducts}
                    selectedProduct={product}
                    onSelectProduct={handleProductSelect}
                />
            </Sider>
            <Layout className="site-layour">
                <Content>
                    <PriceView />
                    <MatchView />
                </Content>
            </Layout>
        </Layout>
    );
}

const SystemStatus = () => <p><Badge status="success" /> System is up and running!</p>

const PriceView = () => null

const MatchView = () => null