import { FileTextOutlined } from "@ant-design/icons"
import { Col, Result } from "antd"
import { useTranslation } from "react-i18next"
import PriceView from "../PriceView"
import { PriceViewWrapperProps } from "./types"


export const PriceViewWrapper = ({product, isDisabled, bids, asks}: PriceViewWrapperProps) => {
    const { t } = useTranslation()
    return (
        <Col span={18}>
            {(!product) && !isDisabled && (
                <Result
                    icon={<FileTextOutlined />}
                    title={t('table.empty.title')}
                    subTitle={t('table.empty.subtitle')}
                />
            )}
            {!isDisabled && (
                product ? <PriceView bids={bids} asks={asks} /> : null
            )}
        </Col>
    )
}