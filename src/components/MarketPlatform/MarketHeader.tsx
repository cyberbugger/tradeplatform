import { Col, Layout, Row } from "antd"
import { createUseStyles } from "react-jss";

import { SystemStatus } from "../Common/SystemStatus";
import SubscribedProduct from "../SubscribedProduct";

import { AVAILABLE_PRODUCTS } from "../../constants";
import { useTranslation } from "react-i18next";
import { MarketHeaderProps } from "./types";

const { Header } = Layout;
const useStyles = createUseStyles({
    appHeaderContent: {
        color: 'white',
    },
})

export const MarketHeader = ({product, onSelectProduct, isDisabled}: MarketHeaderProps) => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <Header>
            <Row className={classes.appHeaderContent} justify="center" align="middle">
                <Col span={20}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <SubscribedProduct
                                availableProducts={AVAILABLE_PRODUCTS}
                                selectedProduct={product}
                                onSelectProduct={onSelectProduct}
                                isDisabled={isDisabled}
                            />
                        </Col>
                        <Col>
                            <SystemStatus 
                                status={product ? 'success':'error'} 
                                message={product ? t('status.subscribed'):t('status.notsubscribed')}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Header>
    )
}