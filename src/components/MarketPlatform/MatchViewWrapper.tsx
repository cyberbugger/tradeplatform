import { Col } from "antd"
import { useTranslation } from "react-i18next"
import { TableSkeleton } from "../Common/TableSkeleton"
import MatchView from "../MatchView"
import { MatchViewWrapperProps } from "./types"

export const MatchViewWrapper = ({ isDisabled, product, matches }: MatchViewWrapperProps) => {
    const { t } = useTranslation()

    if (!isDisabled && !product) {
        return null
    }

    return (
        <Col span={20}>
            {!isDisabled ? 
                product && <MatchView matches={matches} />
            :  <TableSkeleton 
                    title={t('marketPlatform.loadingText')}
                    rowCount ={15}
                />
            }
        </Col>
    )
}