import { Col, Row, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { PriceViewProps } from "./types";

const { Title } = Typography;

const useStyles = createUseStyles({
    appTable: {
        "& tr > td": {
            padding: "8px 15px"
        }
    },
})


export const PriceView = ({bids, asks}: PriceViewProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    
    if (!bids.length || !asks.length) {
        return null
    }

    const columns = [
        {title: "Price", dataIndex: "price", key: "price"},
        {title: "Quantity", dataIndex: "quantity", key: "quantity"},
    ]

    const format = ((d: string[], i: number) => ({ key: i, price: d[0], quantity: d[1]}))
    const bidsData = bids.map(format)
    const asksData = asks.map(format)

    return (
        <Row gutter={24}>
            <Col span={12}>
                <Title level={4} className="text-center title-spacing pb-0 ">{t('priceview.bids')}</Title>
                <Table rowKey="key" className={classes.appTable} columns={columns} dataSource={bidsData} pagination={false} />
            </Col>
            <Col span={12}>
                <Title level={4} className="text-center title-spacing pb-0 ">{t('priceview.asks')}</Title>
                <Table rowKey="key" className={classes.appTable} columns={columns} dataSource={asksData} pagination={false} /> 
            </Col>
        </Row>
    )
}
